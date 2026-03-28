import { useState } from 'react'
import type { MBTIAnswers, Concern, Reason } from '@/lib/prescriptions'

export interface QuizState {
  step: 1 | 2 | 3
  mbti: MBTIAnswers
  concern: Concern | ''
  reason: Reason | ''
  freeText: string
}

export function useQuiz() {
  const [state, setState] = useState<QuizState>({
    step: 1,
    mbti: { EI: '', SN: '', TF: '', JP: '' },
    concern: '',
    reason: '',
    freeText: '',
  })

  const setMBTI = (axis: keyof MBTIAnswers, value: string) => {
    setState(prev => ({
      ...prev,
      mbti: { ...prev.mbti, [axis]: value },
    }))
  }

  const setConcern = (concern: Concern) => {
    setState(prev => ({ ...prev, concern }))
  }

  const setReason = (reason: Reason) => {
    setState(prev => ({ ...prev, reason }))
  }

  const setFreeText = (text: string) => {
    setState(prev => ({ ...prev, freeText: text }))
  }

  const nextStep = () => {
    setState(prev => ({ ...prev, step: Math.min(prev.step + 1, 3) as 1 | 2 | 3 }))
  }

  const prevStep = () => {
    setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) as 1 | 2 | 3 }))
  }

  // MBTI 4축 모두 선택했는지
  const isMBTIComplete = Object.values(state.mbti).every(v => v !== '')

  // 현재 스텝 완료 여부
  const canProceed = () => {
    if (state.step === 1) return isMBTIComplete
    if (state.step === 2) return state.concern !== ''
    if (state.step === 3) return state.reason !== ''
    return false
  }

  return {
    state,
    setMBTI,
    setConcern,
    setReason,
    setFreeText,
    nextStep,
    prevStep,
    canProceed: canProceed(),
    isMBTIComplete,
  }
}
