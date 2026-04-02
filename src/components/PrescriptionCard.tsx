import React from 'react';
import { Prescription } from '../lib/prescriptions';

interface PrescriptionCardProps {
  prescription?: Prescription;
  mbtiStr?: string;
  code?: string;
  visitorCount?: number;
  mode?: 'mobile' | 'print';
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  mbtiStr = '',
  code = '',
  visitorCount = 1,
  mode = 'mobile'
}) => {
  // 안전한 데이터 처리
  const safeMbti = String(mbtiStr || '').toUpperCase();
  const safeTypeName = String(prescription?.typeName || '').toUpperCase();
  const safeCode = String(code || 'MAUM-RX').toUpperCase();
  
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).replace(/\. /g, '.').replace(/\.$/, '');

  if (mode === 'mobile') {
    // ─── [MOBILE MODE] ───
    // 기존 /result 페이지용 유연한 레이아웃 (반응형 최적화)
    return (
      <div className="w-full max-w-[400px] mx-auto bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 p-[24px]">
        {/* 상단 결과 박스 */}
        <div className="bg-[var(--primary-green)] rounded-[20px] p-[24px] text-center mb-[24px]">
          <div className="inline-block px-3 py-1 bg-white rounded-full text-[var(--primary-green)] text-[11px] font-bold mb-3">PATIENT RESULT</div>
          <h2 className="text-white text-[28px] font-bold serif mb-2 leading-tight">{safeTypeName}</h2>
          <div className="text-[20px] font-black text-white/70 tracking-[4px] font-mono">{safeMbti}</div>
        </div>

        {/* 중단 처방전 타이틀 */}
        <div className="text-center mb-[20px]">
          <div className="inline-block px-3 py-1 border border-[var(--primary-green)] text-[var(--primary-green)] rounded-full text-[10px] font-bold mb-2">PRESCRIPTION</div>
          <h3 className="text-[var(--primary-green)] text-[22px] font-bold serif">마음 처방전</h3>
        </div>

        {/* 처방 내용 */}
        <div className="space-y-[20px] mb-[24px]">
          <div className="border-l-2 border-[var(--primary-green)] pl-[16px]">
            <div className="text-[13px] font-bold text-[var(--primary-green)]/60 mb-1">명상 처방</div>
            <div className="text-[16px] font-bold text-[var(--dark)] mb-1">{prescription?.meditation.title}</div>
            <div className="text-[14px] text-gray-500 leading-relaxed font-serif">{prescription?.meditation.desc}</div>
          </div>
          <div className="border-l-2 border-[var(--primary-green)] pl-[16px]">
            <div className="text-[13px] font-bold text-[var(--primary-green)]/60 mb-1">오늘의 차</div>
            <div className="text-[16px] font-bold text-[var(--dark)] mb-1">{prescription?.tea.title}</div>
            <div className="text-[14px] text-gray-500 leading-relaxed font-serif">{prescription?.tea.desc}</div>
          </div>
          <div className="border-l-2 border-[var(--primary-green)] pl-[16px]">
            <div className="text-[13px] font-bold text-[var(--primary-green)]/60 mb-1">추천 향</div>
            <div className="text-[16px] font-bold text-[var(--dark)] mb-1">{prescription?.incense.title}</div>
            <div className="text-[14px] text-gray-500 leading-relaxed font-serif">{prescription?.incense.desc}</div>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="pt-[20px] border-t border-dashed border-gray-200 flex justify-between items-end">
          <div className="text-left">
            <div className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Issue Date</div>
            <div className="text-[13px] font-bold text-[var(--dark)]">{today}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider">RX Code</div>
            <div className="text-[13px] font-black text-[var(--primary-green)] tracking-wider">#{safeCode}</div>
          </div>
        </div>
      </div>
    );
  }

  // ─── [PRINT MODE] ───
  // 키오스크/인쇄용 픽셀 퍼펙트 SVG 레이아웃 (ViewBox 842x595)
  return (
    <div className="flex items-center justify-center bg-white p-0 m-0 overflow-hidden" style={{ width: '297mm', height: '210mm' }}>
      <svg 
        width="842" 
        height="595" 
        viewBox="0 0 842 595" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 1. 배경 및 데코레이션 */}
        <rect width="842" height="595" fill="white"/>
        <g clipPath="url(#clip0_149_2)">
          <rect width="595" height="842" transform="matrix(0 1 -1 0 842 0)" fill="white"/>
          
          {/* 상단 구분선 */}
          <line x1="41" y1="205" x2="801" y2="205" stroke="#006938" strokeWidth="2"/>

          {/* ── 좌측 상단: 결과물 영역 ── */}
          <rect x="41" y="30" width="275" height="157" rx="20" fill="#006938"/>
          <rect x="107" y="46" width="140" height="24" rx="12" fill="white"/>
          <text x="177" y="63" textAnchor="middle" fill="#006938" style={{ fontSize: '11px', fontWeight: 'bold' }}>PATIENT RESULT</text>
          
          <text x="178" y="115" textAnchor="middle" fill="white" style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'serif' }}>
            {safeTypeName}
          </text>
          <text x="178" y="155" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: '22px', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '4px' }}>
            {safeMbti}
          </text>

          {/* ── 좌측 하단: 체험 확인 스탬프 공간 (디자인 필수 요소) ── */}
          <g transform="translate(41, 440)">
            <rect width="120" height="120" rx="60" stroke="#006938" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.15"/>
            <text x="60" y="65" textAnchor="middle" fill="#006938" opacity="0.3" style={{ fontSize: '11px', fontWeight: '900' }}>STAMP HERE</text>
            <text x="60" y="78" textAnchor="middle" fill="#006938" opacity="0.2" style={{ fontSize: '8px', fontWeight: '700' }}>CHECK-IN OFFICE</text>
          </g>

          {/* ── 우측: 질문과 응답 (처방 내용, 이모지 제거됨) ── */}
          <rect x="330.5" y="30.5" width="274" height="156" rx="19.5" stroke="#006938"/>
          <rect x="420" y="51" width="96" height="24" rx="12" fill="#006938"/>
          <text x="468" y="68" textAnchor="middle" fill="white" style={{ fontSize: '11px', fontWeight: 'bold' }}>PRESCRIPTION</text>
          <text x="467" y="125" textAnchor="middle" fill="#006938" style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'serif' }}>마음 처방전</text>

          <g transform="translate(350, 230)">
            {/* 명상 */}
            <g transform="translate(0, 0)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>명상 처방</text>
              <text x="75" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.meditation.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>
                  {prescription?.meditation.desc}
                </div>
              </foreignObject>
            </g>

            {/* 차 */}
            <g transform="translate(0, 95)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>오늘의 차</text>
              <text x="75" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.tea.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>
                  {prescription?.tea.desc}
                </div>
              </foreignObject>
            </g>

            {/* 향 */}
            <g transform="translate(0, 190)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>추천 향</text>
              <text x="58" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.incense.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>
                  {prescription?.incense.desc}
                </div>
              </foreignObject>
            </g>
          </g>

          {/* 우측 하단 메타데이터 표 */}
          <g transform="translate(583, 481)">
            <line x1="0" y1="0" x2="234" y2="0" stroke="#006938" strokeWidth="2"/>
            <line x1="0" y1="24.7" x2="234" y2="24.7" stroke="#006938"/>
            <line x1="0" y1="48.9" x2="234" y2="48.9" stroke="#006938"/>
            <line x1="0" y1="73.2" x2="234" y2="73.2" stroke="#006938"/>
            <line x1="118.5" y1="1" x2="118.5" y2="74" stroke="#006938"/>

            <text x="10" y="17" fill="#006938" style={{ fontSize: '10px', fontWeight: 'bold' }}>ISSUE DATE</text>
            <text x="128" y="17" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>{today}</text>

            <text x="10" y="41" fill="#006938" style={{ fontSize: '10px', fontWeight: 'bold' }}>VISITOR NO.</text>
            <text x="128" y="41" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>#{String(visitorCount).padStart(4, '0')}</text>

            <text x="10" y="65" fill="#006938" style={{ fontSize: '10px', fontWeight: 'bold' }}>RX CODE</text>
            <text x="128" y="65" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>{safeCode}</text>
          </g>

          {/* 하단 정보 */}
          <text x="801" y="580" textAnchor="end" fill="#006938" style={{ fontSize: '9px', fontWeight: 'bold', opacity: 0.5 }}>
            2026 SEOUL INT&apos;L BUDDHISM EXPO | MAUM-RX SYSTEM
          </text>
        </g>

        <defs>
          <clipPath id="clip0_149_2">
            <rect width="595" height="842" fill="white" transform="matrix(0 1 -1 0 842 0)"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default PrescriptionCard;
