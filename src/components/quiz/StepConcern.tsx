import { useState, type ReactNode } from 'react'
import type { QuizState } from '@/hooks/useQuiz'
import type { Concern } from '@/lib/prescriptions'
import { CONCERN_LABELS } from '@/lib/prescriptions'
import { BatteryIcon, PeopleIcon, EyeIcon, UmbrellaIcon, LightningIcon, SadFaceIcon } from './ConcernIcons'

interface StepConcernProps {
  state: QuizState
  onNext: (concern: Concern) => void
  onBack: () => void
}

const CONCERNS: { key: Concern; icon: (color: string) => ReactNode }[] = [
  { key: '번아웃', icon: (c) => <BatteryIcon color={c} /> },
  { key: '인간관계', icon: (c) => <PeopleIcon color={c} /> },
  { key: '자존감', icon: (c) => <EyeIcon color={c} /> },
  { key: '외로움', icon: (c) => <UmbrellaIcon color={c} /> },
  { key: '진로', icon: (c) => <LightningIcon color={c} /> },
  { key: '막연한불안', icon: (c) => <SadFaceIcon color={c} /> },
]

export default function StepConcern({ state, onNext, onBack }: StepConcernProps) {
  const [selected, setSelected] = useState<Concern | null>(state.concern || null)

  return (
    <div className="flex flex-col h-[100dvh] bg-white px-[20px] pt-[44px] pb-[24px] animate-fade-in relative z-10 w-full" style={{ maxWidth: '375px', margin: '0 auto' }}>
      
      {/* Back Button */}
      <button onClick={onBack} className="self-start mb-[8px] text-[var(--primary-green)] text-[14px] font-medium flex items-center gap-1 shrink-0 hover:opacity-70 transition-opacity">
        <span className="text-[18px]">←</span> 뒤로가기
      </button>

      {/* Top Progress Bar - Step 2 of 3 */}
      <div className="flex gap-[12px] mb-[20px] w-full shrink-0">
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--border)]" />
      </div>

      <h2 className="text-[24px] font-bold text-[var(--primary-green)] mb-1 leading-tight tracking-tight font-scdream shrink-0">요즘 나의 고민</h2>
      <p className="text-[14px] text-[var(--primary-green)] mb-4 tracking-tight opacity-90 shrink-0">지금 가장 마음에 걸리는 것은 무엇인가요?</p>

      {/* 6 Cards Grid (Dynamically fills vertical space) */}
      <div className="grid grid-cols-2 grid-rows-3 gap-4 flex-1 min-h-0 w-full mb-[12px]">
        {CONCERNS.map(({ key, icon }) => {
          const isSelected = selected === key
          const iconColor = isSelected ? '#ffffff' : '#006838'
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`h-full w-full rounded-[12px] border-[1.5px] border-[var(--primary-green)] flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected 
                  ? 'bg-[var(--primary-green)] text-white shadow-md transform scale-[1.02]' 
                  : 'bg-white text-[var(--primary-green)] hover:bg-[#F0F5F2]'
              }`}
            >
              <div className="mb-2 transition-transform duration-200" style={{ filter: isSelected ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none' }}>
                {icon(iconColor)}
              </div>
              <div className={`text-[15px] font-bold tracking-tight ${isSelected ? 'text-white' : 'text-[var(--primary-green)]'}`}>{CONCERN_LABELS[key]}</div>
            </button>
          )
        })}
      </div>

      {/* Bottom Next Button */}
      <button
        onClick={() => {
          if (selected) onNext(selected)
        }}
        disabled={!selected}
        className={`mt-4 w-full h-[52px] shrink-0 rounded-[26px] text-[16px] font-bold font-scdream transition-all duration-300 ${
          selected 
            ? 'bg-[var(--primary-green)] text-white shadow-lg'
            : 'bg-[var(--border)] text-[#999999]'
        }`}
      >
        다음으로
      </button>
    </div>
  )
}
