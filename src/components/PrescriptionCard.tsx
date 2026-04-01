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
      // --- ROBUST A4 LANDSCAPE PRINT LAYOUT ---
      return (
        <div ref={ref} className="w-full h-full bg-[#FCFAF5] p-6 font-pretendard flex flex-col box-border">
          {/* Inner Frame */}
          <div className="w-full h-full border-[3px] border-[#006838] p-6 relative flex flex-col bg-white box-border shadow-sm">
            {/* Subtle Inner Border */}
            <div className="absolute inset-2 border border-[#006838] opacity-30 pointer-events-none"></div>
            
            {/* Header section */}
            <div className="flex justify-between items-start mb-6 z-10 px-2">
              <div className="flex flex-col">
                <span className="text-sm font-black text-[#006838] tracking-[0.2em] mb-1 opacity-90">MIND PRESCRIPTION</span>
                <h1 className="text-5xl font-black font-scdream text-gray-900 leading-none tracking-tight">마음처방전</h1>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500 font-bold mb-2">2026 서울국제불교박람회 선명상축제</span>
                <div className="bg-[#006838] text-white px-6 py-2 rounded-full font-bold text-xl shadow-md border-2 border-[#004d2a]">
                  Code: {code}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-[#006838] opacity-20 mb-6"></div>

            {/* Content Grid */}
            <div className="flex-1 grid grid-cols-12 gap-6 z-10">
              
              {/* Left Column (5/12) */}
              <div className="col-span-5 flex flex-col gap-6 h-full">
                
                {/* 1. Analysis Box */}
                <div className="bg-[#F4F7F5] border border-[#D5E5DA] rounded-2xl p-6 shadow-inner">
                  <div className="inline-block bg-[#006838] text-white text-sm font-bold px-4 py-1.5 rounded-full mb-4">마음 상태 분석</div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end border-b border-[#D5E5DA] pb-2">
                      <span className="text-sm font-bold text-gray-500">나의 MBTI</span>
                      <span className="text-lg font-black text-gray-800">{mbtiStr}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-[#D5E5DA] pb-2">
                      <span className="text-sm font-bold text-gray-500">요즘 가장 큰 고민</span>
                      <span className="text-lg font-black text-gray-800">{concernLabel}</span>
                    </div>
                    <div className="flex justify-between items-end pt-1">
                      <span className="text-sm font-bold text-gray-500">중요한 이유</span>
                      <span className="text-lg font-black text-gray-800">{reasonLabel}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Hero Quote Box */}
                <div className="flex-1 border-2 border-[#006838] rounded-2xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden bg-white shadow-md">
                  <div className="absolute top-0 right-0 p-4 text-7xl opacity-[0.03] select-none">✨</div>
                  <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 text-sm font-black text-[#006838] border-x-2 border-b-2 border-[#006838] rounded-b-lg">
                    나만을 위한 한 줄 처방
                  </div>
                  
                  <h2 className="text-2xl font-black font-scdream text-[#006838] mb-6 mt-4 break-keep leading-snug">
                    {prescription.typeName}
                  </h2>
                  <div className="text-5xl text-[#006838] opacity-20 leading-none mb-2 font-serif">&quot;</div>
                  <p className="text-xl font-bold text-gray-800 leading-[1.6] break-keep px-4">
                    {aiLine}
                  </p>
                  <div className="text-5xl text-[#006838] opacity-20 leading-none mt-4 font-serif">&quot;</div>
                </div>
              </div>

              {/* Right Column (7/12) */}
              <div className="col-span-7 flex flex-col gap-6 h-full">
                
                {/* 3. Meditation Box */}
                <div className="flex-1 border border-gray-200 rounded-2xl flex overflow-hidden shadow-md bg-white">
                  <div className="w-16 bg-[#006838] flex items-center justify-center">
                    <span className="text-white font-black text-lg [writing-mode:vertical-rl] rotate-180 tracking-[0.3em] font-scdream">명상 처방</span>
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-center relative">
                    <div className="absolute top-4 right-6 text-5xl opacity-5 select-none">🧘</div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">{prescription.meditation.title}</h3>
                    <p className="text-lg font-medium text-gray-700 leading-relaxed mb-6 break-keep pr-8">
                      {prescription.meditation.desc}
                    </p>
                    <div className="bg-[#F4F7F5] border-l-4 border-[#006838] p-4 text-sm font-bold text-[#006838] rounded-r-lg">
                      💡 {mbtiStr} 맞춤 가이드 : {MBTI_MODIFIERS.meditation[eI]} {MBTI_MODIFIERS.practice[jP]}
                    </div>
                  </div>
                </div>

                {/* 4. Tea & Incense Split Box */}
                <div className="flex-1 grid grid-cols-2 gap-6">
                  {/* Tea */}
                  <div className="bg-[#FAFBF9] border border-gray-200 rounded-2xl p-6 relative flex flex-col justify-center shadow-sm">
                    <div className="absolute top-4 right-4 text-4xl opacity-10 select-none">🍵</div>
                    <div className="inline-block text-xs font-black text-[#006838] mb-3 border-b-2 border-[#006838] pb-1 w-max">허브차 처방</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{prescription.tea.title}</h3>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed break-keep pr-4">
                      {prescription.tea.desc}
                    </p>
                  </div>
                  {/* Incense */}
                  <div className="bg-[#FAFBF9] border border-gray-200 rounded-2xl p-6 relative flex flex-col justify-center shadow-sm">
                    <div className="absolute top-4 right-4 text-4xl opacity-10 select-none">🌿</div>
                    <div className="inline-block text-xs font-black text-[#006838] mb-3 border-b-2 border-[#006838] pb-1 w-max">인센스 처방</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{prescription.incense.title}</h3>
                    <p className="text-sm font-medium text-gray-600 leading-relaxed break-keep pr-4">
                      {prescription.incense.desc}
                    </p>
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
