import { useState } from 'react'
import type { Reason } from '@/lib/prescriptions'
import { REASON_LABELS } from '@/lib/prescriptions'

interface StepReasonProps {
  setReason: (reason: Reason) => void
  setFreeText: (text: string) => void
  onSubmit: (reason: string) => void
  onBack: () => void
}

const REASONS: Reason[] = [
  '편안해지고싶어서',
  '소중한사람때문에',
  '나답게살고싶어서',
  '성장하고싶어서'
]

export default function StepReason({ setReason, setFreeText, onSubmit, onBack }: StepReasonProps) {
  const [selected, setSelected] = useState<Reason | null>(null)

  return (
    <div className="flex flex-col h-[100dvh] bg-white px-[20px] pt-[44px] pb-[24px] animate-fade-in relative z-10 w-full" style={{ maxWidth: '375px', margin: '0 auto' }}>
      
      {/* Back Button */}
      <button onClick={onBack} className="self-start mb-[8px] text-[var(--primary-green)] text-[14px] font-medium flex items-center gap-1 shrink-0 hover:opacity-70 transition-opacity">
        <span className="text-[18px]">←</span> 뒤로가기
      </button>

      {/* Top Progress Bar - Step 3 of 3 */}
      <div className="flex gap-[12px] mb-[20px] w-full shrink-0">
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
      </div>

      <h2 className="text-[24px] font-bold text-[var(--primary-green)] mb-1 leading-tight tracking-tight font-scdream shrink-0">
        이 고민이<br/>내게 중요한 이유
      </h2>
      <p className="text-[14px] text-[var(--primary-green)] mb-[24px] tracking-tight opacity-90 shrink-0">
        가장 가까운 것을 선택해주세요.
      </p>

      {/* 4 Reasons vertical list */}
      <div className="flex flex-col gap-[9px] mb-auto overflow-y-auto w-full">
        {REASONS.map(key => {
          const isSelected = selected === key
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`w-full h-[68px] shrink-0 rounded-[10px] border-[1.5px] border-[var(--primary-green)] text-[16px] font-bold transition-all duration-200 ${
                isSelected 
                  ? 'bg-[var(--primary-green)] text-white shadow-md transform scale-[1.01]' 
                  : 'bg-white text-[var(--primary-green)] hover:bg-[#F0F5F2]'
              }`}
            >
              {REASON_LABELS[key]}
            </button>
          )
        })}
      </div>

      {/* Bottom Next Button */}
      <button
        onClick={() => {
          if (selected) {
            setReason(selected)
            setFreeText("")
            onSubmit(selected)
          }
        }}
        disabled={!selected}
        className={`mt-4 w-full h-[52px] shrink-0 rounded-[26px] text-[16px] font-bold font-scdream transition-all duration-300 ${
          selected 
            ? 'bg-[var(--primary-green)] text-white shadow-lg'
            : 'bg-[var(--border)] text-[#999999]'
        }`}
      >
        처방전 발급받기
      </button>
    </div>
  )
}
