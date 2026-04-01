import { forwardRef } from 'react'
import type { Prescription } from '@/lib/prescriptions'
import { MBTI_MODIFIERS } from '@/lib/prescriptions'

interface PrescriptionCardProps {
  code: string
  mbtiStr: string
  concern: string
  reason: string
  aiLine: string
  prescription: Prescription
  isPrintMode?: boolean
}

export const PrescriptionCard = forwardRef<HTMLDivElement, PrescriptionCardProps>(
  ({ code, mbtiStr, concern, reason, aiLine, prescription, isPrintMode = false }, ref) => {
    
    const concernLabel = concern === '막연한불안' ? '막연한 불안' : concern === '번아웃' ? '번아웃·피로' : concern
    const reasonLabel = reason === '편안해지고싶어서' ? '그냥 편안해지고 싶어서' : 
                        reason === '소중한사람때문에' ? '소중한 사람이 있어서' : 
                        reason === '나답게살고싶어서' ? '나답게 살고 싶어서' : '더 성장하고 싶어서'

    const safeMbti = (mbtiStr || 'INTJ').toUpperCase()
    const eI = (safeMbti[0] === 'E' ? 'E' : 'I') as 'E' | 'I'
    const jP = (safeMbti[3] === 'P' ? 'P' : 'J') as 'J' | 'P'

    if (isPrintMode) {
      // --- PRINT LAYOUT (Mobile Design Elements mapped to A4 Landscape) ---
      return (
        <div 
          ref={ref}
          className="w-full h-full bg-white font-pretendard flex flex-col overflow-hidden box-border"
        >
          {/* Header Graphic Box - Same vibe as Mobile */}
          <div className="w-full bg-[var(--primary-green)] pt-[30px] pb-[20px] text-center text-white shadow-sm relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
            <div className="text-[14px] font-bold opacity-80 tracking-widest mb-1 relative z-10">MIND PRESCRIPTION</div>
            <h1 className="text-[36px] font-black font-scdream tracking-tight leading-none relative z-10">마음처방전</h1>
            <div className="mt-3 inline-flex items-center justify-center px-5 py-1.5 bg-white bg-opacity-20 rounded-full border border-white border-opacity-40 backdrop-blur-sm relative z-10">
              <span className="text-[18px] font-bold tracking-widest">{code}</span>
            </div>
          </div>

          <div className="p-[30px] w-full flex flex-1 gap-[30px] overflow-hidden">
            {/* LEFT COLUMN: 40% Width */}
            <div className="w-[40%] flex flex-col gap-[20px] h-full">
              
              {/* Section 1: 마음 상태 분석 */}
              <div className="flex flex-col bg-white overflow-hidden shadow-sm border border-gray-100 rounded-[16px] shrink-0">
                <div className="bg-[var(--primary-green)] text-white text-center py-2.5 rounded-[12px] font-bold text-[16px] tracking-wide font-scdream mb-4 mx-2 mt-2">
                  마음 상태 분석
                </div>
                <div className="flex flex-col gap-4 text-[16px] px-6 pb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-bold text-[var(--primary-green)] opacity-90">나의 MBTI</span>
                    <span className="font-bold text-gray-800 bg-[#F0F5F2] px-3 py-1 rounded-full">{mbtiStr}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="font-bold text-[var(--primary-green)] opacity-90">요즘 가장 큰 고민</span>
                    <span className="font-bold text-gray-800">{concernLabel}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-[var(--primary-green)] opacity-90">중요한 이유</span>
                    <span className="font-bold text-gray-800">{reasonLabel}</span>
                  </div>
                </div>
              </div>

              {/* Section 2: 나만을 위한 한 줄 처방 */}
              <div className="flex flex-col flex-1 border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-[#F0F5F2] overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)] min-h-0">
                 <div className="bg-[var(--primary-green)] text-white text-center py-2.5 font-bold text-[16px] tracking-wide font-scdream shrink-0">
                  나만을 위한 한 줄 처방
                </div>
                <div className="p-6 text-center flex flex-col items-center justify-center flex-1 overflow-y-auto">
                  <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-sm text-[24px] mb-4 shrink-0">
                    ✨
                  </div>
                  <h2 className="text-[24px] font-black font-scdream text-[var(--primary-green)] mb-4 leading-snug break-keep">
                    {prescription.typeName}
                  </h2>
                  <p className="text-[18px] leading-[1.6] font-bold text-gray-800 break-keep">
                    &quot;{aiLine}&quot;
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: 60% Width */}
            <div className="w-[60%] flex flex-col h-full">
              {/* Section 3: 상세 처방전 */}
              <div className="flex flex-col h-full border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)]">
                 <div className="bg-[var(--primary-green)] text-white text-center py-2.5 font-bold text-[16px] tracking-wide font-scdream shrink-0">
                  상세 처방
                </div>
                
                <div className="p-6 flex flex-col gap-[24px] flex-1 min-h-0">
                  {/* Meditation Area */}
                  <div className="shrink-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[22px]">🧘‍♀️</span>
                      <h3 className="font-bold text-[18px] text-[var(--primary-green)]">명상 처방</h3>
                    </div>
                    <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-5">
                      <h4 className="font-bold text-[18px] mb-3">{prescription.meditation.title}</h4>
                      <p className="text-[16px] text-gray-600 leading-relaxed mb-4">{prescription.meditation.desc}</p>
                      
                      <div className="bg-[#E8F0EA] text-[var(--primary-green)] text-[15px] font-bold p-4 rounded-[8px] leading-snug">
                        💡 {MBTI_MODIFIERS.meditation[eI]}<br/>
                        {MBTI_MODIFIERS.practice[jP]}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-[20px] flex-1 min-h-0">
                    {/* Tea Area */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 shrink-0">
                        <span className="text-[22px]">🍵</span>
                        <h3 className="font-bold text-[18px] text-[var(--primary-green)]">허브차 처방</h3>
                      </div>
                      <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-5 flex-1 overflow-y-auto">
                        <h4 className="font-bold text-[17px] mb-2">{prescription.tea.title}</h4>
                        <p className="text-[16px] text-gray-600 leading-relaxed">{prescription.tea.desc}</p>
                      </div>
                    </div>

                    {/* Incense Area */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3 shrink-0">
                        <span className="text-[22px]">🌿</span>
                        <h3 className="font-bold text-[18px] text-[var(--primary-green)]">인센스 처방</h3>
                      </div>
                      <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-5 flex-1 overflow-y-auto">
                        <h4 className="font-bold text-[17px] mb-2">{prescription.incense.title}</h4>
                        <p className="text-[16px] text-gray-600 leading-relaxed">{prescription.incense.desc}</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </div>
      )
    }

    // --- MOBILE SCREEN LAYOUT (Default) ---
    // Visually matches the specific UI aesthetic of `처방전 출력 1안.svg`
    return (
      <div 
        ref={ref}
        className="w-full bg-white font-pretendard flex flex-col items-center pb-[20px] overflow-hidden"
      >
        {/* Mobile Header Graphic Box */}
        <div className="w-full bg-[var(--primary-green)] pt-[40px] pb-[30px] rounded-b-[24px] text-center text-white mb-[24px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
          <div className="text-[12px] font-bold opacity-80 tracking-widest mb-2 relative z-10">MIND PRESCRIPTION</div>
          <h1 className="text-[32px] font-black font-scdream tracking-tight leading-none relative z-10">마음처방전</h1>
          <div className="mt-4 inline-flex items-center justify-center px-4 py-1.5 bg-white bg-opacity-20 rounded-full border border-white border-opacity-40 backdrop-blur-sm relative z-10">
            <span className="text-[14px] font-bold tracking-widest">{code}</span>
          </div>
        </div>

        <div className="px-[20px] w-full flex flex-col gap-[24px]">
          
          {/* Section 1: 마음 상태 분석 */}
          <div className="flex flex-col bg-white overflow-hidden">
            <div className="bg-[var(--primary-green)] text-white text-center py-2 rounded-[12px] font-bold text-[14px] tracking-wide font-scdream mb-3">
              마음 상태 분석
            </div>
            <div className="flex flex-col gap-3 text-[15px]">
              <div className="flex justify-between items-center pb-2">
                <span className="font-bold text-[var(--primary-green)] opacity-90">나의 MBTI</span>
                <span className="font-bold text-gray-800 bg-[#F0F5F2] px-3 py-1 rounded-full">{mbtiStr}</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="font-bold text-[var(--primary-green)] opacity-90">요즘 가장 큰 고민</span>
                <span className="font-bold text-gray-800">{concernLabel}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-[var(--primary-green)] opacity-90">중요한 이유</span>
                <span className="font-bold text-gray-800">{reasonLabel}</span>
              </div>
            </div>
          </div>

          {/* Section 2: 나만을 위한 한 줄 처방 */}
          <div className="flex flex-col border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-[#F0F5F2] overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)]">
             <div className="bg-[var(--primary-green)] text-white text-center py-2 font-bold text-[14px] tracking-wide font-scdream">
              나만을 위한 한 줄 처방
            </div>
            <div className="p-6 text-center flex flex-col items-center">
              <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-sm text-[20px] mb-3">
                ✨
              </div>
              <h2 className="text-[22px] font-black font-scdream text-[var(--primary-green)] mb-3 leading-snug break-keep">
                {prescription.typeName}
              </h2>
              <p className="text-[15px] leading-relaxed font-medium text-gray-800 break-keep">
                &quot;{aiLine}&quot;
              </p>
            </div>
          </div>

          {/* Section 3: 상세 처방전 */}
          <div className="flex flex-col border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)]">
             <div className="bg-[var(--primary-green)] text-white text-center py-2 font-bold text-[14px] tracking-wide font-scdream">
              상세 처방
            </div>
            
            <div className="p-5 flex flex-col gap-[20px]">
              {/* Meditation Area */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[18px]">🧘‍♀️</span>
                  <h3 className="font-bold text-[16px] text-[var(--primary-green)]">명상 처방</h3>
                </div>
                <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-4">
                  <h4 className="font-bold text-[15px] mb-2">{prescription.meditation.title}</h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed mb-3">{prescription.meditation.desc}</p>
                  
                  <div className="bg-[#E8F0EA] text-[var(--primary-green)] text-[13px] font-bold p-3 rounded-[8px] leading-snug">
                    💡 {MBTI_MODIFIERS.meditation[eI]}<br/>
                    {MBTI_MODIFIERS.practice[jP]}
                  </div>
                </div>
              </div>

              {/* Tea Area */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[18px]">🍵</span>
                  <h3 className="font-bold text-[16px] text-[var(--primary-green)]">허브차 처방</h3>
                </div>
                <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-4">
                  <h4 className="font-bold text-[15px] mb-1.5">{prescription.tea.title}</h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{prescription.tea.desc}</p>
                </div>
              </div>

              {/* Incense Area */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[18px]">🌿</span>
                  <h3 className="font-bold text-[16px] text-[var(--primary-green)]">인센스 처방</h3>
                </div>
                <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-4">
                  <h4 className="font-bold text-[15px] mb-1.5">{prescription.incense.title}</h4>
                  <p className="text-[14px] text-gray-600 leading-relaxed">{prescription.incense.desc}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
)

PrescriptionCard.displayName = 'PrescriptionCard'
