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
  const safeConcern = concern || '나를 알려주세요'; 
  const safeReason = reason || '요즘 나의 고민'; 
  const safeAiLine = aiLine || '평온을 위한 첫걸음';
  
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).replace(/\. /g, '.').replace(/\.$/, '');

  // MBTI 기반 모디파이어 추출
  const eI = (safeMbti[0] === 'E' ? 'E' : 'I') as 'E' | 'I';
  const jP = (safeMbti[3] === 'P' ? 'P' : 'J') as 'J' | 'P';

  if (mode === 'mobile') {
    return (
      <div 
        ref={ref}
        className="w-full bg-white font-pretendard flex flex-col items-center pb-[20px] overflow-hidden"
      >
        <div className="w-full bg-[var(--primary-green)] pt-[40px] pb-[30px] rounded-b-[24px] text-center text-white mb-[24px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
          <div className="text-[12px] font-bold opacity-80 tracking-widest mb-2 relative z-10">MIND PRESCRIPTION</div>
          <h1 className="text-[32px] font-black font-scdream tracking-tight leading-none relative z-10">마음처방전</h1>
          <div className="mt-4 inline-flex items-center justify-center px-4 py-1.5 bg-white bg-opacity-20 rounded-full border border-white border-opacity-40 backdrop-blur-sm relative z-10">
            <span className="text-[14px] font-bold tracking-widest">{safeCode}</span>
          </div>
        </div>

        <div className="px-[20px] w-full flex flex-col gap-[24px]">
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

          {prescription && (
            <div className="flex flex-col border-[1.5px] border-[var(--primary-green)] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(0,104,55,0.06)]">
              <div className="bg-[var(--primary-green)] text-white text-center py-2 font-bold text-[14px] tracking-wide font-scdream">
                상세 처방전
              </div>
              
              <div className="p-5 flex flex-col gap-[20px]">
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
  // 피그마(Figma-to-Code '마음처방전 code') 데이터를 기반으로 구현한 최종 고화질 인쇄 레이아웃
  return (
    <div 
      ref={ref} 
      className="w-[297mm] h-[210mm] relative bg-white overflow-hidden flex flex-col items-start py-[30px] pl-[41px] pr-[25px] box-border leading-[normal] tracking-[normal] font-scdream text-[#006938]"
      style={{ backgroundColor: 'white' }}
    >
      <div className="absolute inset-[10mm] border-[1px] border-[#006938] border-opacity-20 rounded-lg pointer-events-none" />

      <section className="w-full flex items-start pt-0 px-0 pb-[9px] box-border gap-3.5 text-center text-[10px] text-white">
        <div className="w-[275px] h-[157px] rounded-[20px] bg-[#006938] shrink-0 flex flex-col items-center pt-4 px-[18px] pb-[9px] box-border gap-2.5">
          <div className="rounded-[20px] bg-white flex items-center justify-center py-1.5 px-6 text-[#006938]">
            <div className="font-black">PATIENT RESULT</div>
          </div>
          <div className="flex-1 flex items-center justify-center text-[22px] font-black leading-[1.2] px-2 break-keep uppercase">
            {safeTypeName}
          </div>
          <div className="text-[18px] font-black tracking-[4px] opacity-70 font-mono">
            {safeMbti}
          </div>
        </div>

        {/* 중앙: 메인 로고 (PRESCRIPTION / 마음 처방전) */}
        <div className="flex-1 h-[157px] rounded-[20px] border-[1px] border-[#006938] flex flex-col items-center pt-[22px] box-border relative overflow-hidden">
          <img src="/figma-group.svg" className="absolute top-2 right-4 w-8 h-8 opacity-20" alt="" />
          <div className="rounded-[20px] bg-[#006938] flex items-center justify-center py-1.5 px-6 text-white mb-[25px] z-10">
            <div className="font-black text-[11px]">PRESCRIPTION</div>
          </div>
          <div className="text-[36px] font-black text-[#006938] tracking-tight z-10">
            마음 처방전
          </div>
        </div>

        <div className="w-[200px] h-[157px] rounded-[20px] border-[1px] border-[#006938] border-dashed flex flex-col items-start p-5 box-border gap-3 text-left text-[9px]">
           <div className="flex flex-col gap-1">
             <div className="opacity-50 font-black uppercase">Q. 나를 알려주세요</div>
             <div className="font-black border-l-2 border-[#006938] pl-2 leading-tight">{safeConcern}</div>
           </div>
           <div className="flex flex-col gap-1">
             <div className="opacity-50 font-black uppercase">Q. 요즘 나의 고민</div>
             <div className="font-black border-l-2 border-[#006938] pl-2 leading-tight">{safeReason}</div>
           </div>
           <div className="flex flex-col gap-1">
             <div className="opacity-50 font-black uppercase">Q. 한줄 처방</div>
             <div className="font-black border-l-2 border-[#006938] pl-2 leading-tight italic">{safeAiLine}</div>
           </div>
        </div>
      </section>

      <section className="w-full flex-1 flex flex-col pt-8 px-2">
        <div className="flex items-baseline gap-3 mb-4 border-b-[0.5px] border-[#006938] border-opacity-30 pb-2">
          <span className="text-[20px] font-black">명상 처방 :</span>
          <span className="text-[18px] font-extrabold">{prescription?.meditation.title}</span>
        </div>
        <div className="text-[14px] leading-relaxed font-medium mb-10 text-[#333] break-keep">
          {prescription?.meditation.desc}
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="border-l-[3px] border-[#006938] pl-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[15px] font-black">오늘의 차</span>
              <span className="text-[13px] font-bold text-[#444]">{prescription?.tea.title}</span>
            </div>
            <div className="text-[12px] opacity-80 leading-snug">{prescription?.tea.desc}</div>
          </div>
          <div className="border-l-[3px] border-[#006938] pl-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[15px] font-black">추천 향</span>
              <span className="text-[13px] font-bold text-[#444]">{prescription?.incense.title}</span>
            </div>
            <div className="text-[12px] opacity-80 leading-snug">{prescription?.incense.desc}</div>
          </div>
        </div>
      </section>

      <section className="w-full h-[80px] flex items-end justify-between px-2">
        <div className="w-[60px] h-[60px] rounded-full border-[1px] border-[#006938] border-dashed border-opacity-30 flex items-center justify-center text-[8px] opacity-40 font-black text-center box-border pt-1">
          STAMP<br/>HERE
        </div>

        <div className="w-[280px] bg-[#F0F5F2] border-t-[2px] border-[#006938] flex flex-col font-black text-[9px] shadow-sm">
           <div className="flex border-b-[0.5px] border-[#006938] border-opacity-10 py-1.5 px-3 uppercase">
             <div className="w-[100px] opacity-70">ISSUE DATE</div>
             <div>{today}</div>
           </div>
           <div className="flex border-b-[0.5px] border-[#006938] border-opacity-10 py-1.5 px-3 uppercase">
             <div className="w-[100px] opacity-70">VISITOR NO.</div>
             <div className="text-[11px]">#{String(visitorCount).padStart(4, '0')}</div>
           </div>
           <div className="flex py-1.5 px-3 bg-[#E8F3EE]">
             <div className="w-[100px] text-[#006938] uppercase">마음처방전 code</div>
             <div className="text-[13px] tracking-tight">{safeCode}</div>
           </div>
        </div>
      </section>

      <footer className="w-full mt-4 flex justify-between text-[8px] font-bold opacity-30 px-2">
        <div>2026 SEOUL INTERNATIONAL BUDDHISM EXPO | SEON MEDITATION FESTIVAL</div>
        <div>MAUM-RX OFFICE</div>
      </footer>
    </div>
  );
});

PrescriptionCard.displayName = 'PrescriptionCard';
export default PrescriptionCard;
