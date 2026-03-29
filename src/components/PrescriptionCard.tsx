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

    const eI = mbtiStr[0] as 'E' | 'I'
    const jP = mbtiStr[3] as 'J' | 'P'

    if (isPrintMode) {
      // --- A5 LANDSCAPE PRINT LAYOUT ---
      // A5 dimensions: 210mm x 148mm
      return (
        <div ref={ref} className="bg-white text-[var(--dark)] w-[210mm] h-[148mm] p-[10mm] flex flex-col border-[2px] border-[var(--dark)] overflow-hidden box-border font-pretendard relative">
          {/* Print Header */}
          <div className="flex justify-between items-end border-b-[2px] border-[var(--dark)] pb-[4mm] mb-[6mm]">
            <div>
              <div className="text-[12px] font-bold text-[var(--primary-green)] tracking-widest mb-1">MIND PRESCRIPTION</div>
              <h1 className="text-[28px] font-black font-scdream tracking-tight leading-none">마음처방전</h1>
            </div>
            <div className="text-right">
              <div className="text-[18px] font-bold bg-[var(--primary-green)] text-white px-3 py-1 rounded-full mb-1">Code: {code}</div>
              <div className="text-[10px] text-gray-500">2026 서울국제불교박람회 선명상축제</div>
            </div>
          </div>

          <div className="flex flex-1 gap-[6mm]">
            {/* Left Column: Analysis & AI Line */}
            <div className="w-[85mm] flex flex-col gap-[4mm]">
              <div className="bg-[#F0F5F2] rounded-[8px] p-[4mm] border border-[var(--primary-green)]">
                <div className="inline-flex bg-[var(--primary-green)] text-white text-[11px] font-bold px-2 py-0.5 rounded-[12px] mb-2">마음 상태 분석</div>
                <div className="text-[13px] font-bold mb-1 flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">나의 MBTI</span> <span>{mbtiStr}</span>
                </div>
                <div className="text-[13px] font-bold mb-1 flex justify-between border-b border-gray-200 pb-1">
                  <span className="text-gray-600 font-medium">요즘 고민</span> <span>{concernLabel}</span>
                </div>
                <div className="text-[13px] font-bold flex justify-between pt-0.5">
                  <span className="text-gray-600 font-medium">중요한 이유</span> <span>{reasonLabel}</span>
                </div>
              </div>

              <div className="flex-1 border-[2px] border-[var(--dark)] rounded-[8px] p-[5mm] flex flex-col justify-center relative bg-white shadow-sm">
                <div className="absolute top-[-10px] left-[10px] bg-white px-2 text-[12px] font-bold text-[var(--primary-green)]">나만을 위한 한 줄 처방</div>
                <h2 className="text-[18px] font-black font-scdream text-[var(--dark)] mb-3 leading-snug">{prescription.typeName}</h2>
                <p className="text-[14px] leading-relaxed font-medium text-gray-800">
                  &quot;{aiLine}&quot;
                </p>
              </div>
            </div>

            {/* Right Column: The 3 Prescriptions Grid */}
            <div className="flex-1 flex flex-col gap-[3mm]">
               {/* Meditation */}
               <div className="flex-1 border-[1.5px] border-[var(--primary-green)] rounded-[8px] overflow-hidden flex flex-row">
                 <div className="w-[24mm] bg-[var(--primary-green)] text-[#F0F5F2] flex items-center justify-center font-bold text-[12px] [writing-mode:vertical-rl] rotate-180 tracking-widest font-scdream">
                    명상 처방
                 </div>
                 <div className="flex-1 p-[4mm] flex flex-col justify-center bg-white">
                   <h3 className="text-[16px] font-bold mb-1.5">{prescription.meditation.title}</h3>
                   <p className="text-[12px] leading-snug text-gray-700 mb-2">{prescription.meditation.desc}</p>
                   <div className="bg-[#F0F5F2] text-[var(--primary-green)] text-[10px] font-bold p-1.5 rounded-[4px] leading-tight">
                     💡 {MBTI_MODIFIERS.meditation[eI]} {MBTI_MODIFIERS.practice[jP]}
                   </div>
                 </div>
               </div>

               {/* Dual Box for Tea & Incense */}
               <div className="flex-1 flex gap-[3mm]">
                 <div className="flex-1 border border-gray-300 bg-[#FAFBF9] rounded-[8px] p-[3mm] flex flex-col">
                   <div className="text-[11px] font-black text-[var(--primary-green)] mb-1 uppercase tracking-wider border-b border-gray-200 pb-1">허브차 처방 🍵</div>
                   <h3 className="text-[14px] font-bold mt-1 mb-1">{prescription.tea.title}</h3>
                   <p className="text-[11px] leading-snug text-gray-600">{prescription.tea.desc}</p>
                 </div>
                 <div className="flex-1 border border-gray-300 bg-[#FAFBF9] rounded-[8px] p-[3mm] flex flex-col">
                   <div className="text-[11px] font-black text-[var(--primary-green)] mb-1 uppercase tracking-wider border-b border-gray-200 pb-1">인센스 처방 🌿</div>
                   <h3 className="text-[14px] font-bold mt-1 mb-1">{prescription.incense.title}</h3>
                   <p className="text-[11px] leading-snug text-gray-600">{prescription.incense.desc}</p>
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
          
          {/* Section 1: 마음 상태 분석 (Green Banner Header) */}
          <div className="flex flex-col border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)]">
            <div className="bg-[var(--primary-green)] text-white text-center py-2 font-bold text-[14px] tracking-wide font-scdream">
              마음 상태 분석
            </div>
            <div className="p-4 flex flex-col gap-3 text-[15px]">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="font-bold text-[var(--primary-green)] opacity-90">나의 MBTI</span>
                <span className="font-bold text-gray-800 bg-[#F0F5F2] px-3 py-1 rounded-full">{mbtiStr}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
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
