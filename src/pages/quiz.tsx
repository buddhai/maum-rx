import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuiz } from '@/hooks/useQuiz'
import StepMBTI from '@/components/quiz/StepMBTI'
import StepConcern from '@/components/quiz/StepConcern'
import StepReason from '@/components/quiz/StepReason'
import LoadingScreen from '@/components/quiz/LoadingScreen'

export default function QuizPage() {
  const router = useRouter()
  const { 
    state, 
    setMBTI, 
    setConcern, 
    setReason, 
    setFreeText, 
    nextStep,
  } = useQuiz()
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Auto-advance Step 1 when 4 items are selected
  useEffect(() => {
    const isComplete = Object.values(state.mbti).every(v => v !== '')
    if (state.step === 1 && isComplete) {
      const t = setTimeout(() => nextStep(), 500)
      return () => clearTimeout(t)
    }
  }, [state.step, state.mbti, nextStep])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Option: If Kakao login is required BEFORE seeing the result:
    const quizData = {
      m: state.mbti.EI + state.mbti.SN + state.mbti.TF + state.mbti.JP,
      c: state.concern,
      r: state.reason
    }
    const stateStr = encodeURIComponent(JSON.stringify(quizData))
    
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    
    // If no Kakao ID is configured, immediately go to saving page
    if (!clientId) {
      router.push(`/saving?state=${stateStr}`)
      return
    }

    const redirectUri = `${window.location.origin}/api/auth/kakao/callback`
    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${stateStr}`
    
    // Redirect to Kakao Login
    window.location.href = authUrl
  }

  if (isSubmitting) {
    return <LoadingScreen />
  }

  return (
    <div className="bg-white min-h-[100dvh]">
      {state.step === 1 && <StepMBTI state={state} setMBTI={setMBTI} onNext={nextStep} />}
      {state.step === 2 && <StepConcern state={state} onNext={(concern) => { setConcern(concern); nextStep(); }} />}
      {state.step === 3 && <StepReason setReason={setReason} setFreeText={setFreeText} onSubmit={handleSubmit} />}
    </div>
  )
}
