import React, { forwardRef } from 'react'
import type { Prescription, Concern, Reason } from '@/lib/prescriptions'

interface PrescriptionCardProps {
  code: string
  mbtiStr: string
  concern: Concern
  reason: Reason
  aiLine?: string
  prescription: Prescription
  isPrintMode?: boolean
}

export const PrescriptionCard = forwardRef<HTMLDivElement, PrescriptionCardProps>(
  ({ code, mbtiStr, concern, reason, prescription }, ref) => {
    
    const concernLabel = concern === '막연한불안' ? '막연한 불안' : concern === '번아웃' ? '번아웃·피로' : concern
    const reasonLabel = reason === '편안해지고싶어서' ? '그냥 편안해지고 싶어서' : 
                        reason === '소중한사람때문에' ? '소중한 사람이 있어서' : 
                        reason === '나답게살고싶어서' ? '나답게 살고 싶어서' : '더 성장하고 싶어서'

    // Safety check: If prescription is missing, handle it gracefully
    if (!prescription) {
      return (
        <div ref={ref} className="w-[842px] h-[595px] bg-white flex items-center justify-center text-[#006938] font-bold">
          처방 정보를 불러오는 중입니다...
        </div>
      )
    }

    // ALWAYS return the high-fidelity SVG layout for this project
    return (
      <div 
        ref={ref}
        id="prescription-print"
        className="w-[842px] h-[595px] bg-white relative overflow-hidden"
        style={{ fontFamily: "sans-serif" }}
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
            <div style={{ color: 'white', fontSize: '20px', fontWeight: '900', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', lineHeight: '1.4', wordBreak: 'keep-all' }}>
              {prescription?.typeName || '...'}
            </div>
          </foreignObject>

          {/* TOP RIGHT BOX: MEDITATION */}
          <rect x="330.5" y="30.5" width="274" height="156" rx="19.5" stroke="#006938" strokeWidth="1"/>
          <rect x="420" y="51" width="96" height="24" rx="12" fill="#006938"/>
          <text x="468" y="66" fill="white" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 'bold' }}>🧘 명상 처방</text>
          
          <text x="467.5" y="98" fill="#006938" textAnchor="middle" style={{ fontSize: '16px', fontWeight: '900' }}>{prescription?.meditation?.title || '명상 처방'}</text>
          <foreignObject x="350" y="112" width="235" height="65">
            <div style={{ color: '#006938', fontSize: '11px', textAlign: 'center', lineHeight: '1.5', fontWeight: '600', padding: '0 10px', wordBreak: 'keep-all' }}>
              {prescription?.meditation?.desc || ''}
            </div>
          </foreignObject>

          {/* MIDDLE RIGHT BOX: TEA & INCENSE */}
          <rect x="330.5" y="202.5" width="274" height="156" rx="19.5" stroke="#006938" strokeWidth="1"/>
          <rect x="420" y="223" width="96" height="24" rx="12" fill="#006938"/>
          <text x="468" y="239" fill="white" textAnchor="middle" style={{ fontSize: '11px', fontWeight: 'bold' }}>🕯️ 생활 처방</text>
          
          <g transform="translate(350, 265)">
            <text x="0" y="0" fill="#006938" style={{ fontSize: '13px', fontWeight: '900' }}>🍵 {prescription?.tea?.title || ''}</text>
            <foreignObject x="0" y="5" width="235" height="40">
              <div style={{ color: '#444', fontSize: '10.5px', lineHeight: '1.4', fontWeight: '600', wordBreak: 'keep-all' }}>{prescription?.tea?.desc || ''}</div>
            </foreignObject>

            <text x="0" y="58" fill="#006938" style={{ fontSize: '13px', fontWeight: '900' }}>🌿 {prescription?.incense?.title || ''}</text>
            <foreignObject x="0" y="63" width="235" height="40">
              <div style={{ color: '#444', fontSize: '10.5px', lineHeight: '1.4', fontWeight: '600', wordBreak: 'keep-all' }}>{prescription?.incense?.desc || ''}</div>
            </foreignObject>
          </g>

          {/* BOTTOM INFO AREA */}
          <line x1="583" y1="481" x2="817" y2="481" stroke="#006938" strokeWidth="2"/>
          <line x1="583" y1="505.7" x2="817" y2="505.7" stroke="#006938" strokeOpacity="0.3"/>
          <line x1="583" y1="530" x2="817" y2="530" stroke="#006938" strokeOpacity="0.3"/>
          <line x1="583" y1="554.2" x2="817" y2="554.2" stroke="#006938" strokeOpacity="0.3"/>
          
          <text x="590" y="497" fill="#006938" style={{ fontSize: '10px', fontWeight: '900' }}>PRESCRIPTION CODE: {code || '----'}</text>
          <text x="590" y="521" fill="#666" style={{ fontSize: '9px', fontWeight: '600' }}>사용자 고민: {concernLabel || ''}</text>
          <text x="590" y="545" fill="#666" style={{ fontSize: '9px', fontWeight: '600' }}>이유: {reasonLabel || ''}</text>
          
          <text x="41" y="215" fill="#006938" opacity="0.6" style={{ fontSize: '14px', fontWeight: '900' }}>PATIENT MBTI: {mbtiStr?.toUpperCase() || ''}</text>
          
          <g transform="translate(41, 460)">
            <circle cx="55" cy="55" r="50" stroke="#006938" strokeWidth="1" strokeDasharray="4 2" opacity="0.2"/>
            <text x="55" y="58" fill="#006938" textAnchor="middle" opacity="0.4" style={{ fontSize: '8px', fontWeight: '900' }}>MAUM-RX<br/>CERTIFIED</text>
          </g>
          <g transform="translate(164, 460)">
            <circle cx="55" cy="55" r="50" stroke="#006938" strokeWidth="1" strokeDasharray="4 2" opacity="0.2"/>
            <text x="55" y="58" fill="#006938" textAnchor="middle" opacity="0.4" style={{ fontSize: '8px', fontWeight: '900' }}>BEXPO 2026<br/>APPROVED</text>
          </g>
          
          <text x="421" y="580" fill="#999" textAnchor="middle" style={{ fontSize: '9px' }}>2026 SEOUL INTERNATIONAL BUDDHISM EXPO - MIND PRESCRIPTION PROJECT</text>
        </svg>

        <style jsx global>{`
          @media print {
            @page { size: A4 landscape; margin: 0; }
            body { margin: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            #prescription-print { width: 297mm !important; height: 210mm !important; display: block !important; margin: 0 !important; }
          }
        `}</style>
      </div>
    )
  }
)

PrescriptionCard.displayName = 'PrescriptionCard'
