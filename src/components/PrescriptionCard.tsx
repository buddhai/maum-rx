import React, { forwardRef } from 'react';
import { Prescription, MBTI_MODIFIERS } from '../lib/prescriptions';

interface PrescriptionCardProps {
  prescription?: Prescription;
  mbtiStr?: string;
  code?: string;
  visitorCount?: number;
  mode?: 'mobile' | 'print';
}

const PrescriptionCard = forwardRef<HTMLDivElement, PrescriptionCardProps>(({
  prescription,
  mbtiStr = '',
  code = '',
  visitorCount = 1,
  mode = 'mobile'
}, ref) => {
  // 안전한 데이터 처리
  const safeMbti = String(mbtiStr || 'INTJ').toUpperCase();
  const safeTypeName = String(prescription?.typeName || '').toUpperCase();
  const safeCode = String(code || 'MAUM-RX').toUpperCase();
  
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
  // 키오스크/인쇄용 픽셀 퍼펙트 SVG 레이아웃 (이모지 제거된 정갈한 스타일)
  return (
    <div ref={ref} className="flex items-center justify-center bg-white p-0 m-0 overflow-hidden" style={{ width: '297mm', height: '210mm' }}>
      <svg 
        width="842" 
        height="595" 
        viewBox="0 0 842 595" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <rect width="842" height="595" fill="white"/>
        <g clipPath="url(#clip0_149_2)">
          <rect width="595" height="842" transform="matrix(0 1 -1 0 842 0)" fill="white"/>
          <line x1="41" y1="205" x2="801" y2="205" stroke="#006938" strokeWidth="2"/>

          {/* 좌측 상단: 결과물 영역 */}
          <rect x="41" y="30" width="275" height="157" rx="20" fill="#006938"/>
          <rect x="107" y="46" width="140" height="24" rx="12" fill="white"/>
          <text x="177" y="63" textAnchor="middle" fill="#006938" style={{ fontSize: '11px', fontWeight: 'bold' }}>PATIENT RESULT</text>
          <text x="178" y="115" textAnchor="middle" fill="white" style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'serif' }}>{safeTypeName}</text>
          <text x="178" y="155" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: '22px', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '4px' }}>{safeMbti}</text>

          {/* 좌측 하단: 체험 확인 스탬프 공간 */}
          <g transform="translate(41, 440)">
            <rect width="120" height="120" rx="60" stroke="#006938" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.15"/>
            <text x="60" y="65" textAnchor="middle" fill="#006938" opacity="0.3" style={{ fontSize: '11px', fontWeight: '900' }}>STAMP HERE</text>
            <text x="60" y="78" textAnchor="middle" fill="#006938" opacity="0.2" style={{ fontSize: '8px', fontWeight: '700' }}>CHECK-IN OFFICE</text>
          </g>

          {/* 우측: 질문과 응답 (이모지 없는 고정형 명조체) */}
          <rect x="330.5" y="30.5" width="274" height="156" rx="19.5" stroke="#006938"/>
          <rect x="420" y="51" width="96" height="24" rx="12" fill="#006938"/>
          <text x="468" y="68" textAnchor="middle" fill="white" style={{ fontSize: '11px', fontWeight: 'bold' }}>PRESCRIPTION</text>
          <text x="467" y="125" textAnchor="middle" fill="#006938" style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'serif' }}>마음 처방전</text>

          <g transform="translate(350, 230)">
            <g transform="translate(0, 0)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>명상 처방</text>
              <text x="75" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.meditation.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>{prescription?.meditation.desc}</div>
              </foreignObject>
            </g>
            <g transform="translate(0, 95)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>오늘의 차</text>
              <text x="75" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.tea.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>{prescription?.tea.desc}</div>
              </foreignObject>
            </g>
            <g transform="translate(0, 190)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>추천 향</text>
              <text x="58" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.incense.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>{prescription?.incense.desc}</div>
              </foreignObject>
            </g>
          </g>

          {/* 우측 하단 메타데이터 */}
          <g transform="translate(583, 481)">
            <line x1="0" y1="0" x2="234" y2="0" stroke="#006938" strokeWidth="2"/>
            <line x1="0" y1="24.7" x2="234" y2="24.7" stroke="#006938"/><line x1="0" y1="48.9" x2="234" y2="48.9" stroke="#006938"/><line x1="0" y1="73.2" x2="234" y2="73.2" stroke="#006938"/><line x1="118.5" y1="1" x2="118.5" y2="74" stroke="#006938"/>
            <text x="10" y="17" fill="#006938" style={{ fontSize: '10px', fontWeight: 'bold' }}>ISSUE DATE</text>
            <text x="128" y="17" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>{today}</text>
            <text x="10" y="41" fill="#006938" style={{ fontSize: '10px', fontWeight: 'bold' }}>VISITOR NO.</text>
            <text x="128" y="41" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>#{String(visitorCount).padStart(4, '0')}</text>
            <text x="10" y="65" fill="#006938" style={{ fontSize: '10px', fontWeight: 'bold' }}>RX CODE</text>
            <text x="128" y="65" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>{safeCode}</text>
          </g>

          <text x="801" y="580" textAnchor="end" fill="#006938" style={{ fontSize: '9px', fontWeight: 'bold', opacity: 0.5 }}>2026 SEOUL INT&apos;L BUDDHISM EXPO | MAUM-RX</text>
        </g>
        <defs><clipPath id="clip0_149_2"><rect width="595" height="842" fill="white" transform="matrix(0 1 -1 0 842 0)"/></clipPath></defs>
      </svg>
    </div>
  );
});

PrescriptionCard.displayName = 'PrescriptionCard';
export default PrescriptionCard;
