import type { QuizState } from '@/hooks/useQuiz'
import type { MBTIAnswers } from '@/lib/prescriptions'

interface StepMBTIProps {
  state: QuizState
  setMBTI: (axis: keyof MBTIAnswers, value: string) => void
}

const AXISES = [
  { key: 'EI' as const, left: { val: 'E', label: '외향' }, right: { val: 'I', label: '내향' } },
  { key: 'SN' as const, left: { val: 'S', label: '직관' }, right: { val: 'N', label: '감각' } },
  { key: 'TF' as const, left: { val: 'T', label: '사고' }, right: { val: 'F', label: '감정' } },
  { key: 'JP' as const, left: { val: 'J', label: '계획' }, right: { val: 'P', label: '즉흥' } },
]

export default function StepMBTI({ state, setMBTI, onNext, onBack }: StepMBTIProps & { onNext: () => void; onBack: () => void }) {
  // Find first unanswered axis
  const currentAxisIndex = AXISES.findIndex(a => !state.mbti[a.key])
  
  // If all answered, we should have already triggered onNext, but just in case:
  const activeIndex = currentAxisIndex === -1 ? 3 : currentAxisIndex
  const activeAxis = AXISES[activeIndex]

  const handleSelect = (val: string) => {
    setMBTI(activeAxis.key, val)
    // If this was the last axis, it will be caught in useEffect or next render
  }

  // To allow user to change previous ones, we use the bottom indicators as buttons
  return (
    <div className="flex flex-col h-[100dvh] bg-white px-[20px] pt-[59px] pb-[70px] animate-fade-in relative w-full" style={{ maxWidth: '375px', margin: '0 auto' }}>
      
      {/* Back Button - arrow only within MBTI, text when going to landing */}
      {activeIndex === 0 ? (
        <button onClick={onBack} className="self-start mb-[16px] text-[var(--primary-green)] text-[15px] font-medium flex items-center gap-1 shrink-0 hover:opacity-70 transition-opacity">
          <span className="text-[18px]">←</span> 뒤로가기
        </button>
      ) : (
        <button
          onClick={() => setMBTI(AXISES[activeIndex - 1].key, '')}
          className="self-start mb-[16px] w-[36px] h-[36px] rounded-full flex items-center justify-center text-[var(--primary-green)] text-[20px] hover:bg-[#F0F5F2] transition-all shrink-0"
        >
          ←
        </button>
      )}

      {/* Top Progress Bar - Step 1 of 3 */}
      <div className="flex gap-[12px] mb-[40px] w-full shrink-0">
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--primary-green)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--border)]" />
        <div className="h-[6px] flex-1 rounded-[3px] bg-[var(--border)]" />
      </div>

      {/* Main Title & Subtitle */}
      <h2 className="text-[28px] font-bold text-[var(--primary-green)] mb-2 leading-tight tracking-tight font-scdream shrink-0">나를 알려주세요</h2>
      <p className="text-[15px] text-[var(--primary-green)] mb-auto tracking-tight opacity-90 shrink-0">나와 가장 가까운 성향을 선택해주세요.</p>

      {/* Axis Selection Cards */}
      <div className="flex gap-[9px] mb-auto mt-auto w-full">
        {[activeAxis.left, activeAxis.right].map((option) => {
          const isSelected = state.mbti[activeAxis.key] === option.val
          return (
            <button
              key={option.val}
              onClick={() => handleSelect(option.val)}
              className={`flex-1 h-[149px] rounded-[10px] border-[1.5px] border-[var(--primary-green)] flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected 
                  ? 'bg-[var(--primary-green)] text-white shadow-lg transform scale-[1.02]' 
                  : 'bg-white text-[var(--primary-green)] hover:bg-[#F0F5F2]'
              }`}
            >
              <div className="text-[56px] font-bold leading-none mb-1 font-scdream tracking-tighter">{option.val}</div>
              <div className={`text-[16px] font-medium tracking-tight ${isSelected ? 'text-white' : 'text-[var(--primary-green)]'}`}>{option.label}</div>
            </button>
          )
        })}
      </div>

      {/* Bottom Indicators (The 4 small boxes) */}
      <div className="flex justify-center gap-[12px] mt-auto mb-[20px]">
        {AXISES.map((axis, i) => {
          const selectedVal = state.mbti[axis.key]
          const isActive = i === activeIndex
          
          return (
            <button 
              key={axis.key}
              onClick={() => setMBTI(axis.key, '')} // Resetting allows going back
              className={`w-[40.5px] h-[44px] rounded-[3.5px] border-[1.5px] border-[var(--primary-green)] flex items-center justify-center text-[20px] font-bold transition-all duration-300 ${
                selectedVal 
                  ? 'bg-[var(--primary-green)] text-white' 
                  : isActive
                    ? 'bg-[#E8F3EE] text-[var(--primary-green)]'
                    : 'bg-white text-[var(--primary-green)] opacity-50'
              }`}
              style={{ fontFamily: 'var(--font-scdream)' }}
            >
              {selectedVal || ''}
            </button>
          )
        })}
      </div>
      
      {/* Auto-proceed logic button hidden or small for manual fallback if UI hangs */}
      {currentAxisIndex === -1 && (
        <button 
          onClick={onNext}
          className="mt-6 w-full h-[60px] shrink-0 rounded-[30px] bg-[var(--primary-green)] text-white font-bold animate-fade-in"
        >
          다음으로 (성향 선택 완료)
        </button>
      )}
    </div>
  )
}
