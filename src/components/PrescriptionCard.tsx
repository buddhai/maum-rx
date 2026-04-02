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

    if (isPrintMode) {
      return (
        <div 
          ref={ref}
          id="prescription-print"
          className="w-[297mm] h-[210mm] bg-white flex flex-col items-center justify-center overflow-hidden relative"
          style={{ fontFamily: "'SCDream', sans-serif" }}
        >
          <svg 
            width="842" 
            height="595" 
            viewBox="0 0 842 595" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Background */}
            <rect width="842" height="595" fill="white"/>
            
            {/* TOP LEFT BOX: PATIENT TYPE */}
            <rect x="41" y="30" width="275" height="157" rx="20" fill="#006938"/>
            <rect x="107" y="46" width="140" height="24" rx="12" fill="white"/>
            <text x="177" y="62" fill="#006938" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 'bold' }}>마음 처방 유형</text>
            
            <foreignObject x="61" y="85" width="235" height="85">
              <div style={{ color: 'white', fontSize: '20px', fontWeight: '800', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', lineHeight: '1.4', wordBreak: 'keep-all', fontFamily: 'SCDream, sans-serif' }}>
                {prescription.typeName}
              </div>
            </foreignObject>

            {/* TOP RIGHT BOX: MEDITATION */}
            <rect x="330.5" y="30.5" width="274" height="156" rx="19.5" stroke="#006938" strokeWidth="1"/>
            <rect x="420" y="51" width="96" height="24" rx="12" fill="#006938"/>
            <text x="468" y="67" fill="white" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 'bold' }}>🧘 명상 처방</text>
            
            <text x="467.5" y="100" fill="#006938" textAnchor="middle" style={{ fontSize: '16px', fontWeight: '800', fontFamily: 'SCDream, sans-serif' }}>{prescription.meditation.title}</text>
            <foreignObject x="350" y="112" width="235" height="65">
              <div style={{ color: '#006938', fontSize: '11px', textAlign: 'center', lineHeight: '1.5', fontWeight: '500', padding: '0 10px', wordBreak: 'keep-all', fontFamily: 'SCDream, sans-serif' }}>
                {prescription.meditation.desc}
              </div>
            </foreignObject>

            {/* MIDDLE RIGHT BOX: TEA & INCENSE */}
            <rect x="330.5" y="202.5" width="274" height="156" rx="19.5" stroke="#006938" strokeWidth="1"/>
            <rect x="420" y="223" width="96" height="24" rx="12" fill="#006938"/>
            <text x="468" y="239" fill="white" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 'bold' }}>🕯️ 생활 처방</text>
            
            <g transform="translate(350, 265)">
              <text x="0" y="0" fill="#006938" style={{ fontSize: '13px', fontWeight: '800', fontFamily: 'SCDream, sans-serif' }}>🍵 {prescription.tea.title}</text>
              <foreignObject x="0" y="5" width="235" height="35">
                <div style={{ color: '#444', fontSize: '10.5px', lineHeight: '1.4', fontWeight: '500', wordBreak: 'keep-all', fontFamily: 'SCDream, sans-serif' }}>{prescription.tea.desc}</div>
              </foreignObject>

              <text x="0" y="55" fill="#006938" style={{ fontSize: '13px', fontWeight: '800', fontFamily: 'SCDream, sans-serif' }}>🌿 {prescription.incense.title}</text>
              <foreignObject x="0" y="60" width="235" height="35">
                <div style={{ color: '#444', fontSize: '10.5px', lineHeight: '1.4', fontWeight: '500', wordBreak: 'keep-all', fontFamily: 'SCDream, sans-serif' }}>{prescription.incense.desc}</div>
              </foreignObject>
            </g>

            {/* BOTTOM INFO AREA */}
            <line x1="583" y1="481" x2="817" y2="481" stroke="#006938" strokeWidth="2"/>
            <line x1="583" y1="505.7" x2="817" y2="505.7" stroke="#006938" strokeOpacity="0.3"/>
            <line x1="583" y1="530" x2="817" y2="530" stroke="#006938" strokeOpacity="0.3"/>
            <line x1="583" y1="554.2" x2="817" y2="554.2" stroke="#006938" strokeOpacity="0.3"/>
            
            <text x="590" y="498" fill="#006938" style={{ fontSize: '10px', fontWeight: '800' }}>PRESCRIPTION CODE: {code}</text>
            <text x="590" y="522" fill="#666" style={{ fontSize: '9px', fontWeight: '500' }}>사용자 고민: {concernLabel}</text>
            <text x="590" y="546" fill="#666" style={{ fontSize: '9px', fontWeight: '500' }}>이유: {reasonLabel}</text>
            
            <text x="41" y="215" fill="#006938" opacity="0.6" style={{ fontSize: '14px', fontWeight: '800' }}>PATIENT MBTI: {mbtiStr.toUpperCase()}</text>
            
            {/* Branding / Stamp Seals (Restored to design coords x=41, 164) */}
            <g transform="translate(41, 460)">
              <circle cx="55" cy="55" r="50" stroke="#006938" strokeWidth="1" strokeDasharray="4 2" opacity="0.2"/>
              <text x="55" y="58" fill="#006938" textAnchor="middle" opacity="0.4" style={{ fontSize: '9px', fontWeight: '800' }}>MAUM-RX<br/>CERTIFIED</text>
            </g>
            <g transform="translate(164, 460)">
              <circle cx="55" cy="55" r="50" stroke="#006938" strokeWidth="1" strokeDasharray="4 2" opacity="0.2"/>
              <text x="55" y="58" fill="#006938" textAnchor="middle" opacity="0.4" style={{ fontSize: '9px', fontWeight: '800' }}>BEXPO 2026<br/>APPROVED</text>
            </g>
            
            <text x="421" y="580" fill="#999" textAnchor="middle" style={{ fontSize: '9px' }}>2026 SEOUL INTERNATIONAL BUDDHISM EXPO - MIND PRESCRIPTION PROJECT</text>
          </svg>

          <style jsx global>{`
            @media print {
              @page { size: A4 landscape; margin: 0; }
              body { margin: 0; -webkit-print-color-adjust: exact; }
              #prescription-print { width: 297mm; height: 210mm; display: block !important; }
            }
          `}</style>
        </div>
      )
    }

    return (
      <div 
        ref={ref}
        className="w-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl font-sans"
      >
        <div className="bg-[#006938] p-8 text-white text-center relative">
          <div className="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded text-[10px] uppercase font-mono tracking-tighter">
            {code}
          </div>
          <div className="inline-block bg-white text-[#006938] px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
            Mind prescription
          </div>
          <h2 className="text-2xl font-bold mb-2 break-keep tracking-tight">
            {prescription.typeName}
          </h2>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm italic">
            <span>{mbtiStr.toUpperCase()}</span>
            <span>•</span>
            <span>{concernLabel}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-5 rounded-2xl border border-[#006938]/10 bg-[#006938]/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧘‍♀️</span>
              <h3 className="font-bold text-[#006938]">명상 처방: {prescription.meditation.title}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed break-keep">
              {prescription.meditation.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-3">
              <span className="text-xl">🍵</span>
              <div>
                <div className="font-bold text-gray-800 text-sm">{prescription.tea.title}</div>
                <div className="text-xs text-gray-500 leading-tight mt-1">{prescription.tea.desc}</div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-3">
              <span className="text-xl">🌿</span>
              <div>
                <div className="font-bold text-gray-800 text-sm">{prescription.incense.title}</div>
                <div className="text-xs text-gray-500 leading-tight mt-1">{prescription.incense.desc}</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">
              2026 Seoul International Buddhism Expo
            </p>
          </div>
        </div>
      </div>
    )
  }
)

PrescriptionCard.displayName = 'PrescriptionCard'
