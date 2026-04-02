import React, { forwardRef } from 'react';
import { Prescription, MBTI_MODIFIERS } from '../lib/prescriptions';

interface PrescriptionCardProps {
  prescription?: Prescription;
  mbtiStr?: string;
  code?: string;
  visitorCount?: number;
  concern?: string;
  reason?: string;
  aiLine?: string;
  mode?: 'mobile' | 'print';
}

const PrescriptionCard = forwardRef<HTMLDivElement, PrescriptionCardProps>(({
  prescription,
  mbtiStr = '',
  code = '',
  visitorCount = 1,
  concern = '',
  reason = '',
  aiLine = '',
  mode = 'mobile'
}, ref) => {
  // 안전한 데이터 처리
  const safeMbti = String(mbtiStr || 'INTJ').toUpperCase();
  const safeTypeName = String(prescription?.typeName || '').toUpperCase();
  const safeCode = String(code || 'MAUM-RX').toUpperCase();
  
  // 걱정과 고민 데이터 처리
  const safeConcern = concern || '나를 알려주세요'; // 기본값
  const safeReason = reason || '요즘 나의 고민'; 
  const safeAiLine = aiLine || '평온을 위한 첫걸음';
  
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).replace(/\. /g, '.').replace(/\.$/, '');

  // MBTI 기반 모디파이어 추출 (5209a3e 로직 복원)
  const eI = (safeMbti[0] === 'E' ? 'E' : 'I') as 'E' | 'I';
  const jP = (safeMbti[3] === 'P' ? 'P' : 'J') as 'J' | 'P';

  if (mode === 'mobile') {
    // ─── [MOBILE MODE] ───
    // 커밋 5209a3e의 아름다운 모바일 전용 디자인 완벽 복원
    return (
      <div 
        ref={ref}
        className="w-full bg-white font-pretendard flex flex-col items-center pb-[20px] overflow-hidden"
      >
        {/* Mobile Header Graphic Box (5209a3e 정체성) */}
        <div className="w-full bg-[var(--primary-green)] pt-[40px] pb-[30px] rounded-b-[24px] text-center text-white mb-[24px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
          <div className="text-[12px] font-bold opacity-80 tracking-widest mb-2 relative z-10">MIND PRESCRIPTION</div>
          <h1 className="text-[32px] font-black font-scdream tracking-tight leading-none relative z-10">마음처방전</h1>
          <div className="mt-4 inline-flex items-center justify-center px-4 py-1.5 bg-white bg-opacity-20 rounded-full border border-white border-opacity-40 backdrop-blur-sm relative z-10">
            <span className="text-[14px] font-bold tracking-widest">{safeCode}</span>
          </div>
        </div>

        <div className="px-[20px] w-full flex flex-col gap-[24px]">
          {/* Section 1: 마음 상태 분석 */}
          <div className="flex flex-col bg-white overflow-hidden">
            <div className="bg-[var(--primary-green)] text-white text-center py-2 rounded-[12px] font-bold text-[14px] tracking-wide font-scdream mb-3">
              마음 상태 분석
            </div>
            <div className="flex flex-col gap-3 text-[15px]">
              <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                <span className="font-bold text-[var(--primary-green)] opacity-90">나의 MBTI</span>
                <span className="font-bold text-gray-800 bg-[#F0F5F2] px-3 py-1 rounded-full">{safeMbti}</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="font-bold text-[var(--primary-green)] opacity-90">처방 일자</span>
                <span className="font-bold text-gray-800">{today}</span>
              </div>
            </div>
          </div>

          {/* Section 2: 나만을 위한 마음 처방 */}
          {prescription && (
            <div className="flex flex-col border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-[#F0F5F2] overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)]">
              <div className="bg-[var(--primary-green)] text-white text-center py-2 font-bold text-[14px] tracking-wide font-scdream">
                나만을 위한 맞춤 처방
              </div>
              <div className="p-6 text-center flex flex-col items-center">
                <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center shadow-sm text-[20px] mb-3">
                  ✨
                </div>
                <h2 className="text-[22px] font-black font-scdream text-[var(--primary-green)] mb-3 leading-snug break-keep">
                  {prescription.typeName}
                </h2>
                <div className="w-[30px] h-[2px] bg-[var(--primary-green)] opacity-20 mb-3"></div>
                <p className="text-[15px] leading-relaxed font-medium text-gray-800 break-keep">
                   가장 깊은 내면의 소리에 귀를 기울이면<br/>당신만의 평온을 찾을 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {/* Section 3: 상세 처방 */}
          {prescription && (
            <div className="flex flex-col border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)]">
              <div className="bg-[var(--primary-green)] text-white text-center py-2 font-bold text-[14px] tracking-wide font-scdream">
                상세 처방전
              </div>
              
              <div className="p-5 flex flex-col gap-[20px]">
                {/* Meditation Area */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[18px]">🧘</span>
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[16px]">🍵</span>
                      <h3 className="font-bold text-[14px] text-[var(--primary-green)]">오늘의 차</h3>
                    </div>
                    <h4 className="font-bold text-[14px] mb-1">{prescription.tea.title}</h4>
                    <p className="text-[12px] text-gray-500 leading-snug line-clamp-3">{prescription.tea.desc}</p>
                  </div>
                  <div className="bg-[#FAFBF9] border border-gray-100 rounded-[12px] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[16px]">🪵</span>
                      <h3 className="font-bold text-[14px] text-[var(--primary-green)]">추천 향</h3>
                    </div>
                    <h4 className="font-bold text-[14px] mb-1">{prescription.incense.title}</h4>
                    <p className="text-[12px] text-gray-500 leading-snug line-clamp-3">{prescription.incense.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── [PRINT MODE] ───
  // 피그마(842x595) 데이터를 기반으로 한 좌표 정밀 배치 SVG 레이아웃 (V4.0 - 최종 정규화)
  return (
    <div 
      ref={ref} 
      className="bg-white overflow-hidden shadow-lg p-0 m-0" 
      style={{ width: '842px', height: '595px', position: 'relative' }}
    >
      <svg 
        width="842" 
        height="595" 
        viewBox="0 0 842 595" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        {/* 전체 배경 및 클리핑 (Figma 정석 구조) */}
        <rect width="842" height="595" fill="white"/>
        <g clipPath="url(#clip_main)">
          {/* 가로 용지 배경 */}
          <rect width="595" height="842" transform="matrix(0 1 -1 0 842 0)" fill="white"/>
          
          {/* [섹션 1] 좌측 상단: 결과 분석 박스 (x:41, y:30) */}
          <rect x="41" y="30" width="275" height="157" rx="20" fill="#006938"/>
          <rect x="108" y="46" width="140" height="24" rx="12" fill="white"/>
          <text x="178" y="62" textAnchor="middle" fill="#006938" style={{ fontSize: '11px', fontWeight: '900', fontFamily: 'S-Core Dream' }}>PATIENT RESULT</text>
          
          <text x="178" y="115" textAnchor="middle" fill="white" style={{ fontSize: '26px', fontWeight: '900', fontFamily: 'S-Core Dream' }}>{safeTypeName}</text>
          <text x="178" y="152" textAnchor="middle" fill="white" fillOpacity="0.7" style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '4px' }}>{safeMbti}</text>

          {/* [섹션 2] 좌측 하단: 스탬프 영역 (x:41, y:420) */}
          <rect x="41" y="420" width="140" height="140" rx="70" stroke="#006938" strokeWidth="1" strokeDasharray="4 4" opacity="0.2"/>
          <text x="111" y="482" textAnchor="middle" fill="#006938" opacity="0.3" style={{ fontSize: '10px', fontWeight: '900' }}>STAMP HERE</text>
          <text x="111" y="497" textAnchor="middle" fill="#006938" opacity="0.2" style={{ fontSize: '8px', fontWeight: '700' }}>MAUM-RX OFFICE</text>

          {/* [섹션 3] 중앙 상단: 타이틀 박스 (x:330.5, y:30.5) */}
          <rect x="330.5" y="30.5" width="274" height="156" rx="20" stroke="#006938" strokeWidth="1"/>
          <rect x="419" y="52" width="97" height="24" rx="12" fill="#006938"/>
          <text x="467.5" y="68" textAnchor="middle" fill="white" style={{ fontSize: '11px', fontWeight: '900', fontFamily: 'S-Core Dream' }}>PRESCRIPTION</text>
          <text x="467.5" y="125" textAnchor="middle" fill="#006938" style={{ fontSize: '32px', fontWeight: '900', fontFamily: 'S-Core Dream' }}>마음 처방전</text>

          {/* [섹션 4] 우측 상단: Q&A 박스 (x:618, y:30.5) */}
          <rect x="618" y="30.5" width="183" height="156" rx="20" stroke="#006938" strokeWidth="1" strokeDasharray="2 2"/>
          <g transform="translate(635, 60)">
             <text y="0" fill="#006938" opacity="0.5" style={{ fontSize: '8px', fontWeight: '900' }}>Q. 나를 알려주세요</text>
             <text y="15" fill="#006938" style={{ fontSize: '11px', fontWeight: '900' }}>{safeConcern}</text>
             <text y="45" fill="#006938" opacity="0.5" style={{ fontSize: '8px', fontWeight: '900' }}>Q. 요즘 나의 고민</text>
             <text y="60" fill="#006938" style={{ fontSize: '11px', fontWeight: '900' }}>{safeReason}</text>
             <text y="90" fill="#006938" opacity="0.5" style={{ fontSize: '8px', fontWeight: '900' }}>Q. 한줄 처방</text>
             <text y="105" fill="#006938" style={{ fontSize: '11px', fontWeight: '900' }}>{safeAiLine}</text>
          </g>

          {/* [섹션 5] 상세 처방 내용 (중앙 영역) */}
          <g transform="translate(330, 230)">
            {/* 명상 처방 */}
            <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: '900' }}>명상 처방</text>
            <text x="80" y="19" fill="#006938" style={{ fontSize: '16px', fontWeight: '800' }}>: {prescription?.meditation.title}</text>
            <foreignObject x="0" y="32" width="480" height="90">
              <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#006938', fontWeight: '500', fontFamily: 'S-Core Dream', wordBreak: 'keep-all' }}>
                {prescription?.meditation.desc}
              </div>
            </foreignObject>

            {/* 오늘의 차 & 추천 향 (Row) */}
            <g transform="translate(0, 130)">
               <line x1="0" y1="0" x2="0" y2="60" stroke="#006938" strokeWidth="2"/>
               <text x="10" y="15" fill="#006938" style={{ fontSize: '14px', fontWeight: '900' }}>오늘의 차</text>
               <text x="80" y="15" fill="#006938" style={{ fontSize: '13px', fontWeight: '700' }}>{prescription?.tea.title}</text>
               <foreignObject x="10" y="22" width="220" height="40">
                 <div style={{ fontSize: '11px', lineHeight: '1.3', color: '#006938', opacity: 0.8, fontWeight: '500' }}>
                   {prescription?.tea.desc}
                 </div>
               </foreignObject>

               <g transform="translate(250, 0)">
                  <line x1="0" y1="0" x2="0" y2="60" stroke="#006938" strokeWidth="2"/>
                  <text x="10" y="15" fill="#006938" style={{ fontSize: '14px', fontWeight: '900' }}>추천 향</text>
                  <text x="65" y="15" fill="#006938" style={{ fontSize: '13px', fontWeight: '700' }}>{prescription?.incense.title}</text>
                  <foreignObject x="10" y="22" width="220" height="40">
                    <div style={{ fontSize: '11px', lineHeight: '1.3', color: '#006938', opacity: 0.8, fontWeight: '500' }}>
                      {prescription?.incense.desc}
                    </div>
                  </foreignObject>
               </g>
            </g>
          </g>

          {/* [섹션 6] 메타데이터 및 로고 (우측 하단) */}
          <g transform="translate(583, 481)">
            <line x1="0" y1="0" x2="234" y2="0" stroke="#006938" strokeWidth="2"/>
            <line x1="0" y1="24" x2="234" y2="24" stroke="#006938"/>
            <line x1="0" y1="48" x2="234" y2="48" stroke="#006938"/>
            <line x1="0" y1="73" x2="234" y2="73" stroke="#006938"/>
            <line x1="100" y1="0" x2="100" y2="73" stroke="#006938"/>
            
            <text x="10" y="16" fill="#006938" style={{ fontSize: '9px', fontWeight: '900' }}>ISSUE DATE</text>
            <text x="110" y="16" fill="#006938" style={{ fontSize: '11px', fontWeight: '900' }}>{today}</text>
            
            <text x="10" y="40" fill="#006938" style={{ fontSize: '9px', fontWeight: '900' }}>VISITOR NO.</text>
            <text x="110" y="40" fill="#006938" style={{ fontSize: '11px', fontWeight: '900' }}>#{String(visitorCount).padStart(4, '0')}</text>
            
            <text x="10" y="65" fill="#006938" style={{ fontSize: '9px', fontWeight: '900' }}>RX CODE</text>
            <text x="110" y="65" fill="#006938" style={{ fontSize: '11px', fontWeight: '900' }}>{safeCode}</text>
          </g>

          {/* 푸터 텍스트 */}
          <text x="41" y="580" fill="#006938" opacity="0.3" style={{ fontSize: '8px', fontWeight: '700' }}>2026 SEOUL INTERNATIONAL BUDDHISM EXPO | MIND PRESCRIPTION SERVICE</text>
        </g>
        <defs>
          <clipPath id="clip_main">
            <rect width="842" height="595" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
});

PrescriptionCard.displayName = 'PrescriptionCard';
export default PrescriptionCard;
