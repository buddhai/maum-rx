import React from 'react';
import { Prescription } from '../lib/prescriptions';

interface PrescriptionCardProps {
  prescription?: Prescription;
  mbtiStr?: string;
  code?: string;
  visitorCount?: number;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  mbtiStr = '',
  code = '',
  visitorCount = 1
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
        {/* 1. 배경 및 데코레이션 (원본 SVG의 핵심 경로 그대로 유지) */}
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

          {/* ── 좌측 하단: 체험 확인 스탬프 공간 (디자인 유지하며 비워둠) ── */}
          <g transform="translate(41, 440)">
            <rect width="120" height="120" rx="60" stroke="#006938" strokeDasharray="4 4" fill="none" opacity="0.2"/>
            <text x="60" y="65" textAnchor="middle" fill="#006938" opacity="0.3" style={{ fontSize: '12px' }}>STAMP HERE</text>
          </g>

          {/* ── 우측: 질문과 응답 (처방 내용) ── */}
          {/* 우측 상단 처방전 타이틀 */}
          <rect x="330.5" y="30.5" width="274" height="156" rx="19.5" stroke="#006938"/>
          <rect x="420" y="51" width="96" height="24" rx="12" fill="#006938"/>
          <text x="468" y="68" textAnchor="middle" fill="white" style={{ fontSize: '11px', fontWeight: 'bold' }}>PRESCRIPTION</text>
          <text x="467" y="125" textAnchor="middle" fill="#006938" style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'serif' }}>마음 처방전</text>

          {/* 우측 하단 질문 및 응답 섹션 (좌표 x=450 부근으로 재배치) */}
          <g transform="translate(350, 230)">
            <g transform="translate(0, 0)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>🧘 명상 처방</text>
              <text x="100" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.meditation.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>
                  {prescription?.meditation.desc}
                </div>
              </foreignObject>
            </g>

            <g transform="translate(0, 95)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>🍵 오늘의 차</text>
              <text x="110" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.tea.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>
                  {prescription?.tea.desc}
                </div>
              </foreignObject>
            </g>

            <g transform="translate(0, 190)">
              <text x="0" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>🪵 추천 향</text>
              <text x="90" y="20" fill="#006938" style={{ fontSize: '16px', fontWeight: 'bold' }}>: {prescription?.incense.title}</text>
              <foreignObject x="0" y="35" width="430" height="60">
                <div style={{ color: '#006938', fontSize: '14px', lineHeight: '1.4', fontFamily: 'serif', paddingRight: '10px' }}>
                  {prescription?.incense.desc}
                </div>
              </foreignObject>
            </g>
          </g>

          {/* 우측 하단 메타데이터 표 (원본 위치 유지) */}
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

          {/* 하단 엑스포 정보 */}
          <text x="801" y="580" textAnchor="end" fill="#006938" style={{ fontSize: '9px', fontWeight: 'bold', opacity: 0.5 }}>
            2026 SEOUL INT&apos;L BUDDHISM EXPO | MAUM-RX SYSTEM V4
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
