import { useState } from 'react'
import { ReactNode } from 'react'
import type { QuizState } from '@/hooks/useQuiz'
import type { Concern } from '@/lib/prescriptions'

interface StepConcernProps {
  state: QuizState
  onNext: (concern: Concern) => void
  onBack: () => void
}

const CONCERNS: { key: Concern; label: string; icon: ReactNode }[] = [
  { key: '번아웃', label: '번아웃·피로', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M4 7h14a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2zm0 2v6h14V9H4zm18 3h1v2h-1v-2z"/></svg> }, 
  { key: '인간관계', label: '인간관계', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17 7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
  { key: '자존감', label: '자존감', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg> },
  { key: '외로움', label: '외로움', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12h20c0-5.52-4.48-10-10-10zm2 17c0 1.1-.9 2-2 2s-2-.9-2-2v-7h4v7z"/></svg> },
  { key: '진로', label: '진로·미래', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg> },
  { key: '막연한불안', label: '막연한 불안', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 8c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-7 0c.83 0 1.5.67 1.5 1.5S9.33 13 8.5 13 7 12.33 7 11.5 7.67 10 8.5 10zm3.5 9.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/></svg> },
]

export default function StepConcern({ state, onNext, onBack }: StepConcernProps) {
  const [selected, setSelected] = useState<Concern | null>(state.concern || null)

  return (
    <div className="flex flex-col h-[100dvh] bg-white px-[20px] pt-[59px] pb-[40px] animate-fade-in relative z-10 w-full" style={{ maxWidth: '375px', margin: '0 auto' }}>
      
      {/* Back Button */}
      <button onClick={onBack} className="self-start mb-[16px] h-[34px] px-[14px] rounded-full bg-[#F0F5F2] text-[var(--primary-green)] text-[14px] font-bold flex items-center gap-1 shrink-0 transition-transform active:scale-95">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        이전 단계
      </button>

      {/* Top Progress Bar - Step 2 of 3 */}
      <div className="flex gap-[12px] mb-[40px] w-full shrink-0">
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--border)]" />
      </div>

      <h2 className="text-[28px] font-bold text-[var(--primary-green)] mb-2 leading-tight tracking-tight font-scdream shrink-0">요즘 나의 고민</h2>
      <p className="text-[15px] text-[var(--primary-green)] mb-6 tracking-tight opacity-90 shrink-0">지금 가장 마음에 걸리는 것은 무엇인가요?</p>

      {/* 6 Cards Grid - Exact SVG spacing */}
      <div className="grid grid-cols-2 gap-[12px] mb-auto overflow-y-auto w-full px-[2px]">
        {CONCERNS.map(({ key, label, icon }) => {
          const isSelected = selected === key
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`h-[156px] rounded-[10px] border-[1.5px] border-[var(--primary-green)] flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected 
                  ? 'bg-[var(--primary-green)] text-white shadow-md' 
                  : 'bg-white text-[var(--primary-green)] hover:bg-[#F0F5F2]'
              }`}
            >
              <div className="mb-[14px]">
                {icon}
              </div>
              <div className={`text-[15px] font-bold tracking-tight ${isSelected ? 'text-white' : 'text-[var(--primary-green)]'}`}>{label}</div>
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
        className={`mt-6 w-full h-[60px] shrink-0 rounded-[30px] text-[18px] font-bold font-scdream transition-all duration-300 ${
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
