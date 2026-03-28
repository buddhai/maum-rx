import type { Reason } from '@/lib/prescriptions'
import { REASON_LABELS } from '@/lib/prescriptions'

interface StepReasonProps {
  setReason: (reason: Reason) => void
  setFreeText: (text: string) => void
  onSubmit: (reason: string) => void
}

const REASONS: Reason[] = [
  '편안해지고싶어서',
  '소중한사람때문에',
  '나답게살고싶어서',
  '성장하고싶어서'
]

export default function StepReason({ setReason, setFreeText, onSubmit }: StepReasonProps) {
  return (
    <div className="flex flex-col h-[100dvh] bg-white px-[20px] pt-[59px] pb-[40px] animate-fade-in relative z-10 w-full" style={{ maxWidth: '375px', margin: '0 auto' }}>
      
      {/* Top Progress Bar - Step 3 of 3 */}
      <div className="flex gap-[12px] mb-[40px] w-full shrink-0">
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
      </div>

      <h2 className="text-[28px] font-bold text-[var(--primary-green)] mb-2 leading-tight tracking-tight font-scdream shrink-0">
        이 고민이<br/>내게 중요한 이유
      </h2>
      <p className="text-[15px] text-[var(--primary-green)] mb-[40px] tracking-tight opacity-90 shrink-0">
        가장 가까운 것을 선택해주세요.
      </p>

      {/* 4 Reasons vertical list */}
      <div className="flex flex-col gap-[11px] mb-auto">
        {REASONS.map(key => {
          return (
            <button
              key={key}
              onClick={() => {
                setReason(key)
                setFreeText("")
                // Pass reason directly to avoid React state batching race condition
                onSubmit(key)
              }}
              className="w-full h-[79px] shrink-0 rounded-[10px] border-[1.5px] border-[var(--primary-green)] bg-white text-[16px] font-bold text-[var(--primary-green)] transition-all duration-200 hover:bg-[#F0F5F2] hover:scale-[1.01]"
            >
              {REASON_LABELS[key]}
            </button>
          )
        })}
      </div>
    </div>
  )
}
