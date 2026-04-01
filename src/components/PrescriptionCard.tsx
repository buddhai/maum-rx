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
      // --- PREMIUM PRINT LAYOUT (Adapts to parent w/h, designed for A4 landscape) ---
      return (
        <div ref={ref} className="w-full h-full bg-[#fdfbf7] p-[8mm] box-border font-pretendard flex flex-col">
          {/* Outer elegant frame */}
          <div className="w-full h-full border-[1.2mm] border-[var(--primary-green)] p-[8mm] relative flex flex-col bg-white">
            {/* Inner thin decorative border */}
            <div className="absolute inset-[3mm] border-[0.4mm] border-solid border-[var(--primary-green)] opacity-30 pointer-events-none"></div>
            
            {/* Header */}
            <div className="flex justify-between items-start mb-[6mm] z-10 pl-[2mm] pr-[2mm]">
              <div>
                <div className="text-[14px] font-black text-[var(--primary-green)] tracking-[0.3em] mb-1 opacity-90 uppercase">Mind Prescription</div>
                <h1 className="text-[44px] font-black font-scdream tracking-tighter text-[var(--dark)] leading-none">마음처방전</h1>
              </div>
              <div className="text-right flex flex-col items-end">
                 <div className="text-[13px] text-gray-500 font-medium tracking-wide mb-2 uppercase">2026 Seoul International Buddhism Expo</div>
                 <div className="text-[20px] font-black bg-[var(--primary-green)] text-white px-5 py-1.5 rounded-full inline-block shadow-sm">
                   Code: {code}
                 </div>
              </div>
            </div>

            <div className="border-t-[1px] border-dashed border-[var(--primary-green)] opacity-40 w-full mb-[8mm]"></div>

            {/* Main Content Split */}
            <div className="flex flex-1 gap-[8mm] z-10 h-full overflow-hidden">
              
              {/* Left Column: Analysis & The One Word */}
              <div className="w-[38%] flex flex-col gap-[6mm]">
                {/* User Data Box */}
                <div className="bg-[#f2f6f4] rounded-[10px] p-[6mm] border border-[#d6ebd9]">
                  <div className="inline-block bg-[var(--primary-green)] text-white text-[12px] font-bold px-3 py-1 rounded-full mb-4 shadow-sm">마음 상태 분석</div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end border-b border-[#d6ebd9] pb-1.5">
                      <span className="text-[15px] font-bold text-gray-500">나의 MBTI</span> 
                      <span className="text-[17px] font-black text-[var(--dark)]">{mbtiStr}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-[#d6ebd9] pb-1.5">
                      <span className="text-[15px] font-bold text-gray-500">요즘 내 마음은</span> 
                      <span className="text-[17px] font-black text-[var(--dark)]">{concernLabel}</span>
                    </div>
                    <div className="flex justify-between items-end pt-0.5">
                      <span className="text-[15px] font-bold text-gray-500">그 이유는</span> 
                      <span className="text-[17px] font-black text-[var(--dark)]">{reasonLabel}</span>
                    </div>
                  </div>
                </div>

                {/* AI Line Box (The Star) */}
                <div className="flex-1 border-[2px] border-[var(--primary-green)] rounded-[10px] p-[6mm] flex flex-col items-center justify-center text-center relative bg-white overflow-hidden">
                  {/* Watermark logo or decoration */}
                  <div className="absolute top-[-20px] left-[-20px] text-[120px] opacity-5 select-none leading-none">✨</div>
                  <div className="absolute bottom-[-20px] right-[-20px] text-[120px] opacity-5 select-none leading-none">🧘</div>
                  
                  <div className="absolute top-[-1px] left-1/2 transform -translate-x-1/2 bg-white px-4 text-[13px] font-bold text-[var(--primary-green)] uppercase tracking-widest pt-1">나만을 위한 한 줄</div>
                  
                  <h2 className="text-[22px] font-black font-scdream text-[var(--primary-green)] mb-6 z-10 leading-snug break-keep">{prescription.typeName}</h2>
                  <div className="text-[40px] text-[#006838] opacity-20 leading-none mb-2 font-serif z-10">&quot;</div>
                  <p className="text-[19px] leading-[1.6] font-bold text-gray-800 z-10 break-keep">
                    {aiLine}
                  </p>
                  <div className="text-[40px] text-[#006838] opacity-20 leading-none mt-2 font-serif z-10">&quot;</div>
                </div>
              </div>

              {/* Right Column: 3 Remedies */}
              <div className="flex-1 flex flex-col gap-[5mm]">
                 {/* Meditation Box (Hero) */}
                 <div className="flex-[4] border-[1px] border-gray-300 rounded-[10px] flex overflow-hidden shadow-sm bg-white">
                   <div className="w-[35px] bg-[var(--primary-green)] text-white flex items-center justify-center">
                     <span className="font-black text-[15px] [writing-mode:vertical-rl] rotate-180 tracking-[0.4em] font-scdream">명상 처방</span>
                   </div>
                   <div className="flex-1 p-[6mm] flex flex-col justify-center">
                     <div className="text-[30px] opacity-20 mb-[-15px]">🧘‍♀️</div>
                     <h3 className="text-[22px] font-black text-[var(--dark)] mb-3 z-10">{prescription.meditation.title}</h3>
                     <p className="text-[15px] leading-relaxed text-gray-700 mb-4 font-medium z-10">{prescription.meditation.desc}</p>
                     
                     <div className="bg-[#f2f6f4] border border-[#d6ebd9] text-[var(--primary-green)] text-[13px] font-bold p-3 rounded-[6px] tracking-tight leading-relaxed">
                       💡 {mbtiStr} 맞춤 추천: {MBTI_MODIFIERS.meditation[eI]} {MBTI_MODIFIERS.practice[jP]}
                     </div>
                   </div>
                 </div>

                 {/* Dual Box: Tea & Incense */}
                 <div className="flex-[3] flex gap-[5mm]">
                   <div className="flex-1 border-[1px] border-gray-300 rounded-[10px] p-[5mm] bg-[#fafbfc] flex flex-col relative overflow-hidden">
                     <div className="absolute top-2 right-2 text-[40px] opacity-[0.03]">🍵</div>
                     <div className="inline-block text-[12px] font-black text-[var(--primary-green)] mb-2 uppercase tracking-widest border-b-[2px] border-[#006838] w-max pb-0.5">허브차 처방</div>
                     <h3 className="text-[19px] font-bold text-[var(--dark)] mb-2 mt-1 z-10">{prescription.tea.title}</h3>
                     <p className="text-[13px] leading-relaxed text-gray-600 font-medium z-10">{prescription.tea.desc}</p>
                   </div>
                   
                   <div className="flex-1 border-[1px] border-gray-300 rounded-[10px] p-[5mm] bg-[#fafbfc] flex flex-col relative overflow-hidden">
                      <div className="absolute top-2 right-2 text-[40px] opacity-[0.03]">🌿</div>
                     <div className="inline-block text-[12px] font-black text-[var(--primary-green)] mb-2 uppercase tracking-widest border-b-[2px] border-[#006838] w-max pb-0.5">인센스 처방</div>
                     <h3 className="text-[19px] font-bold text-[var(--dark)] mb-2 mt-1 z-10">{prescription.incense.title}</h3>
                     <p className="text-[13px] leading-relaxed text-gray-600 font-medium z-10">{prescription.incense.desc}</p>
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
