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
                  가장 깊은 내면의 소리에 귀를 기울이면<br />당신만의 평온을 찾을 수 있습니다.
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
                      💡 {MBTI_MODIFIERS.meditation[eI]}<br />
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

  // ─── [PRINT MODE: PREMIUM FIGMA FINAL - PIXEL PERFECT] ───
  return (
    <div 
      ref={ref} 
      className="print-card"
      style={{
        width: '842px',
        height: '595px',
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'S-Core Dream', sans-serif",
        color: '#006938'
      }}
    >
      {/* 1. 처방 유형 박스 (TOP LEFT) - x:41, y:30 */}
      <div style={{
        position: 'absolute', left: '41px', top: '30px', width: '275px', height: '157px',
        borderRadius: '20px', backgroundColor: '#006938', color: 'white',
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 18px', boxSizing: 'border-box'
      }}>
        <div style={{ borderRadius: '20px', backgroundColor: 'white', color: '#006938', padding: '5px 12px', fontSize: '10px', fontWeight: '900', marginBottom: '14px' }}>마음 처방 유형</div>
        <div style={{ fontSize: '18px', fontWeight: '900', textAlign: 'center', lineHeight: '1.4', wordBreak: 'keep-all', marginBottom: '8px' }}>{safeTypeName}</div>
        <div style={{ fontSize: '10px', textAlign: 'center', opacity: 0.9, lineHeight: '1.5', padding: '0 10px' }}>{safeAiLine}</div>
      </div>

      {/* 2. 명상법 처방 (TOP RIGHT) - x:330, y:30 */}
      <div style={{
        position: 'absolute', left: '330px', top: '30px', width: '274px', height: '156px',
        borderRadius: '20px', border: '1.5px solid #006938', backgroundColor: 'white',
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 18px', boxSizing: 'border-box'
      }}>
        <div style={{ borderRadius: '20px', backgroundColor: '#006938', color: 'white', padding: '5px 12px', fontSize: '10px', fontWeight: '900', marginBottom: '14px' }}>명상법 처방</div>
        <div style={{ fontSize: '18px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>{prescription?.meditation.title}</div>
        <div style={{ fontSize: '10px', textAlign: 'center', lineHeight: '1.5', wordBreak: 'keep-all' }}>{prescription?.meditation.desc}</div>
      </div>

      {/* 3. 인센스 처방 (MID LEFT) - x:41, y:202 */}
      <div style={{
        position: 'absolute', left: '41px', top: '202px', width: '275px', height: '157px',
        borderRadius: '20px', border: '1.5px solid #006938', backgroundColor: 'white',
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 18px', boxSizing: 'border-box'
      }}>
        <div style={{ borderRadius: '20px', backgroundColor: '#006938', color: 'white', padding: '5px 12px', fontSize: '10px', fontWeight: '900', marginBottom: '14px' }}>인센스 처방</div>
        <div style={{ fontSize: '18px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>{prescription?.incense.title}</div>
        <div style={{ fontSize: '10px', textAlign: 'center', lineHeight: '1.5', wordBreak: 'keep-all' }}>{prescription?.incense.desc}</div>
      </div>

      {/* 4. 허브차 처방 (MID RIGHT) - x:330, y:202 */}
      <div style={{
        position: 'absolute', left: '330px', top: '202px', width: '274px', height: '156px',
        borderRadius: '20px', border: '1.5px solid #006938', backgroundColor: 'white',
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 18px', boxSizing: 'border-box'
      }}>
        <div style={{ borderRadius: '20px', backgroundColor: '#006938', color: 'white', padding: '5px 12px', fontSize: '10px', fontWeight: '900', marginBottom: '14px' }}>허브차 처방</div>
        <div style={{ fontSize: '18px', fontWeight: '900', textAlign: 'center', marginBottom: '8px' }}>{prescription?.tea.title}</div>
        <div style={{ fontSize: '10px', textAlign: 'center', lineHeight: '1.5', wordBreak: 'keep-all' }}>{prescription?.tea.desc}</div>
      </div>

      {/* 5. 체험 확인 (STAMP SECTION) - BOTTOM LEFT Side */}
      <div style={{ position: 'absolute', left: '41px', top: '385px', width: '420px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '20px' }}>
          <span style={{ fontSize: '32px', fontWeight: '900' }}>체험 확인</span>
          <span style={{ fontSize: '11px', fontWeight: '500', opacity: 0.8, lineHeight: '1.5' }}>선명상대회에서 나에게 맞는<br/>마음처방을 체험해보세요</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: '명상 체험소', bg: '#E6EFEA' },
            { label: '허브차 명상', bg: '#E6EFEA' },
            { label: '인센스 처방', bg: '#E6EFEA' }
          ].map((item, idx) => (
            <div key={idx} style={{ 
              width: '105px', height: '105px', borderRadius: '50%', 
              border: '2px dashed #006938', backgroundColor: item.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '900', textAlign: 'center', padding: '0 10px', boxSizing: 'border-box'
            }}>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* 6. Logo & Footer (BOTTOM RIGHT) */}
      <div style={{ position: 'absolute', right: '41px', bottom: '35px', width: '310px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        {/* Heart Logo */}
        <img src="/Group.svg" style={{ width: '130px', height: 'auto', marginBottom: '5px' }} alt="MIND RX" />
        
        {/* Q&A Table */}
        <div style={{ width: '100%', borderTop: '2px solid #006938' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginTop: '10px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E6EFEA' }}>
                <td style={{ padding: '7px 0', fontWeight: '900' }}>Q. 나를 알려주세요</td>
                <td style={{ padding: '7px 0', fontWeight: '500', textAlign: 'right' }}>{safeMbti}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E6EFEA' }}>
                <td style={{ padding: '7px 0', fontWeight: '900' }}>Q. 요즘 나의 고민</td>
                <td style={{ padding: '7px 0', fontWeight: '500', textAlign: 'right' }}>{safeConcern}</td>
              </tr>
              <tr>
                <td style={{ padding: '7px 0', fontWeight: '900' }}>Q. 이 고민이 내게 중요한 이유</td>
                <td style={{ padding: '7px 0', fontWeight: '500', textAlign: 'right' }}>{safeReason}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Issue Date & Visitor */}
        <div style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '8px', fontWeight: '700', opacity: 0.4, marginTop: '2px' }}>
          <span>ISSUE DATE: {today}</span>
          <span>|</span>
          <span>VISITOR: #{String(visitorCount).padStart(4, '0')}</span>
        </div>
      </div>

      {/* Decorative Lines */}
      <div style={{ position: 'absolute', left: '0', top: '0', pointerEvents: 'none', width: '100%', height: '100%', opacity: 0.05 }}>
        <div style={{ position: 'absolute', left: '41px', top: '202px', width: '564px', height: '1px', backgroundColor: '#006938' }} />
        <div style={{ position: 'absolute', left: '330px', top: '30px', width: '1px', height: '328px', backgroundColor: '#006938' }} />
      </div>
    </div>
  );
});

PrescriptionCard.displayName = 'PrescriptionCard';
export default PrescriptionCard;
