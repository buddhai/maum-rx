import { useState } from 'react'
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
    prevStep,
  } = useQuiz()
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (reason?: string) => {
    setIsSubmitting(true)

    // Build quiz data, using the passed reason to avoid state race condition
    const quizData = {
      m: state.mbti.EI + state.mbti.SN + state.mbti.TF + state.mbti.JP,
      c: state.concern,
      r: reason || state.reason
    }
    const stateStr = encodeURIComponent(JSON.stringify(quizData))
    
    // Go directly to saving page (Kakao auth can be done later from result page)
    router.push(`/saving?state=${stateStr}`)
  }

  if (isSubmitting) {
    return <LoadingScreen />
  }

  return (
    <div className="bg-white min-h-[100dvh]">
      {state.step === 1 && <StepMBTI state={state} setMBTI={setMBTI} onNext={nextStep} onBack={() => router.push('/')} />}
      {state.step === 2 && <StepConcern state={state} onNext={(concern) => { setConcern(concern); nextStep(); }} onBack={prevStep} />}
      {state.step === 3 && <StepReason setReason={setReason} setFreeText={setFreeText} onSubmit={(reason) => handleSubmit(reason)} onBack={prevStep} />}
    </div>
  )
}
