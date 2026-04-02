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
  // 피그마(842x595) 데이터를 기반으로 한 좌표 정밀 배치 레이아웃 (V2.1 - Q&A 및 스탬프 추가)
  return (
    <div 
      ref={ref} 
      className="bg-white text-[#006938] overflow-hidden relative" 
      style={{ 
        width: '842px', 
        height: '595px',
        fontFamily: "'S-Core Dream', 'Pretendard', sans-serif"
      }}
    >
      {/* 1. 좌측 상단 초록색 결과 박스 (x:41, y:30, w:275, h:157) */}
      <div 
        className="absolute left-[41px] top-[30px] w-[275px] h-[157px] bg-[#006938] rounded-[20px] flex flex-col items-center pt-[16px]"
      >
        <div className="bg-white rounded-full px-6 py-1 mb-6 text-[11px] font-extrabold tracking-tight">
          PATIENT RESULT
        </div>
        <div className="text-white text-center">
          <div className="text-[26px] font-black leading-tight tracking-tighter mb-1">
            {safeTypeName}
          </div>
          <div className="text-[20px] font-black opacity-70 tracking-[4px]">
            {safeMbti}
          </div>
        </div>
      </div>

      {/* 2. 중앙 상단 타이틀 박스 (x:330.5, y:30.5, w:274, h:156) */}
      <div 
        className="absolute left-[330.5px] top-[30.5px] w-[274px] h-[156px] border border-[#006938] rounded-[20px] flex flex-col items-center pt-[20px]"
      >
        <div className="bg-[#006938] text-white rounded-full px-6 py-1 mb-8 text-[11px] font-extrabold tracking-wider">
          PRESCRIPTION
        </div>
        <div className="text-[32px] font-black">마음 처방전</div>
      </div>

      {/* 3. 우측 상단 Q&A 영역 (x:618, y:30) */}
      <div className="absolute left-[618px] top-[40px] w-[200px] flex flex-col gap-6">
        {[
          { q: 'Q. 나를 알려주세요', a: safeConcern },
          { q: 'Q. 요즘 나의 고민', a: safeReason },
          { q: 'Q. 평온을 위한 한줄', a: safeAiLine }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <div className="text-[9px] font-black opacity-60 italic">{item.q}</div>
            <div className="text-[11px] font-extrabold leading-tight border-l-2 border-[#006938] pl-2">
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* 4. 상세 처방 내용 (x:330 ~ 800 영역으로 조정) */}
      <div className="absolute left-[330.5px] top-[215px] w-[480px] flex flex-col gap-8">
        {/* 명상 처방 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-black">명상 처방</span>
            <span className="text-[16px] font-bold">: {prescription?.meditation.title}</span>
          </div>
          <p className="text-[14px] leading-relaxed text-opacity-90 font-medium whitespace-pre-wrap">
            {prescription?.meditation.desc}
          </p>
        </div>

        {/* 오늘의 차 & 추천 향 (Row형 배치) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 border-l-2 border-[#006938] pl-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[14px] font-black">오늘의 차</span>
              <span className="text-[13px] font-extrabold">{prescription?.tea.title}</span>
            </div>
            <p className="text-[11px] leading-snug opacity-80">{prescription?.tea.desc}</p>
          </div>
          <div className="flex flex-col gap-2 border-l-2 border-[#006938] pl-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[14px] font-black">추천 향</span>
              <span className="text-[13px] font-extrabold">{prescription?.incense.title}</span>
            </div>
            <p className="text-[11px] leading-snug opacity-80">{prescription?.incense.desc}</p>
          </div>
        </div>
      </div>

      {/* 5. 좌측 하단 스탬프 구역 (x:41, y:440) */}
      <div className="absolute left-[41px] top-[410px] w-[140px] h-[140px] flex items-center justify-center">
        <div className="w-full h-full border-2 border-dashed border-[#006938] opacity-20 rounded-full flex flex-col items-center justify-center">
          <div className="text-[10px] font-black opacity-40">STAMP HERE</div>
          <div className="text-[8px] font-bold opacity-30">MAUM-RX OFFICE</div>
        </div>
      </div>

      {/* 6. 우측 하단 로고 (SVG) */}
      <div className="absolute left-[330.5px] bottom-[20px] w-[181px] h-[106px] opacity-80">
        <svg width="181" height="106" viewBox="0 0 181 106" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip_logo_f)">
            <path d="M2.44527 48.0548L0 50.4927V81.6803L2.44527 84.1182H30.7945L33.2398 81.6803V50.4927L30.7945 48.0548H2.44527ZM31.3313 80.8875L29.9993 82.2154H3.23055L1.89857 80.8875V51.2756L3.23055 49.9477H30.0093L31.3413 51.2756V80.8875H31.3313Z" fill="#006838"/>
            <path d="M39.3828 48.0549L36.9375 50.4928V81.6803L39.3828 84.1183H67.732L70.1773 81.6803V50.4928L67.732 48.0549H39.3828ZM68.2788 80.8875L66.9468 82.2155H40.168L38.8361 80.8875V51.2757L40.168 49.9477H66.9468L68.2788 51.2757V80.8875Z" fill="#006838"/>
            <path d="M76.3203 48.0549L73.875 50.4928V81.6803L76.3203 84.1183H104.67L107.115 81.6803V50.4928L104.67 48.0549H76.3203ZM105.216 80.8875L103.884 82.2155H77.1055L75.7736 80.8875V51.2757L77.1055 49.9477H103.884L105.216 51.2757V80.8875Z" fill="#006838"/>
            <path d="M113.259 48.0549L110.813 50.4928V81.6803L113.259 84.1183H141.608L144.053 81.6803V50.4928L141.608 48.0549H113.259ZM142.155 80.8875L140.823 82.2155H114.044L112.712 80.8875V51.2757L114.044 49.9477H140.823L142.155 51.2757V80.8875Z" fill="#006838"/>
            <path d="M178.555 48.0549H150.206L147.761 50.4928V81.6803L150.206 84.1183H178.555L181.001 81.6803V50.4928L178.555 48.0549ZM179.092 80.8875L177.76 82.2155H150.981L149.649 80.8875V51.2757L150.981 49.9477H177.76L179.092 51.2757V80.8875H31.3313Z" fill="#006838"/>
          </g>
          <defs><clipPath id="clip_logo_f"><rect width="181" height="106" fill="white"/></clipPath></defs>
        </svg>
      </div>

      {/* 7. 우측 하단 메타데이터 표 (x:583, y:481, w:234, h:73) */}
      <div 
        className="absolute left-[583px] top-[481px] w-[234px] h-[73px] border-t-2 border-[#006938]"
      >
        {[
          { label: 'ISSUE DATE', value: today },
          { label: 'VISITOR NO.', value: `#${String(visitorCount).padStart(4, '0')}` },
          { label: 'RX CODE', value: safeCode }
        ].map((item, idx) => (
          <div key={idx} className="flex h-[24.2px] border-b border-[#006938] leading-none items-center">
            <div className="w-[100px] pl-3 text-[9px] font-black border-r border-[#006938] h-full flex items-center">{item.label}</div>
            <div className="flex-1 pl-3 text-[11px] font-black h-full flex items-center tracking-tighter">{item.value}</div>
          </div>
        ))}
      </div>

      {/* 8. 하단 푸터 텍스트 */}
      <div className="absolute left-[41px] bottom-[20px] text-[8px] font-bold opacity-30 tracking-widest uppercase">
        2026 Seoul International Buddhism Expo | Mind Prescription Service
      </div>
    </div>
  );
});

PrescriptionCard.displayName = 'PrescriptionCard';
export default PrescriptionCard;
