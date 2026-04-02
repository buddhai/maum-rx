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
  const safeTypeName = String(prescription?.typeName || '지혜로운 수행자').toUpperCase();
  const safeCode = String(code || 'MAUM-V4').toUpperCase();
  
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
        {/* 원본 디자인의 느낌을 주기 위해 기하학적 요소 직접 구현 */}
        <rect width="842" height="595" fill="white"/>
        
        {/* 상단 장식용 선 */}
        <line x1="41" y1="205" x2="801" y2="205" stroke="#006938" strokeWidth="2"/>

        {/* 좌측 상단 유형 정보 박스 */}
        <rect x="41" y="30" width="275" height="157" rx="20" fill="#006938"/>
        <rect x="107" y="46" width="140" height="24" rx="12" fill="white"/>
        <text x="177" y="63" textAnchor="middle" fill="#006938" style={{ fontSize: '14px', fontWeight: 'bold' }}>PATIENT INFO</text>
        
        <text x="178" y="115" textAnchor="middle" fill="white" style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'serif' }}>
          {safeTypeName}
        </text>
        <text x="178" y="155" textAnchor="middle" fill="rgba(255,255,255,0.7)" style={{ fontSize: '22px', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '4px' }}>
          {safeMbti}
        </text>

        {/* 중앙 상단 처방전 타이틀 박스 */}
        <rect x="330.5" y="30.5" width="274" height="156" rx="19.5" stroke="#006938"/>
        <rect x="420" y="51" width="96" height="24" rx="12" fill="#006938"/>
        <text x="468" y="68" textAnchor="middle" fill="white" style={{ fontSize: '14px', fontWeight: 'bold' }}>PRESCRIPTION</text>
        
        <text x="467" y="125" textAnchor="middle" fill="#006938" style={{ fontSize: '36px', fontWeight: 'bold', fontFamily: 'serif' }}>
          마음 처방전
        </text>

        {/* 메인 처방 섹션 (명상, 차, 향) */}
        <g transform="translate(60, 230)">
          {/* 명상 섹션 */}
          <g>
            <text x="0" y="20" fill="#006938" style={{ fontSize: '20px', fontWeight: 'bold' }}>🧘 명상</text>
            <text x="90" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>: {prescription?.meditation.title}</text>
            <foreignObject x="0" y="35" width="720" height="60">
              <div style={{ color: '#006938', fontSize: '15px', lineHeight: '1.5', fontFamily: 'serif', paddingRight: '20px' }}>
                {prescription?.meditation.desc}
              </div>
            </foreignObject>
          </g>

          {/* 차 섹션 */}
          <g transform="translate(0, 100)">
            <text x="0" y="20" fill="#006938" style={{ fontSize: '20px', fontWeight: 'bold' }}>🍵 오늘의 차</text>
            <text x="130" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>: {prescription?.tea.title}</text>
            <foreignObject x="0" y="35" width="720" height="60">
              <div style={{ color: '#006938', fontSize: '15px', lineHeight: '1.5', fontFamily: 'serif', paddingRight: '20px' }}>
                {prescription?.tea.desc}
              </div>
            </foreignObject>
          </g>

          {/* 향 섹션 */}
          <g transform="translate(0, 200)">
            <text x="0" y="20" fill="#006938" style={{ fontSize: '20px', fontWeight: 'bold' }}>🪵 추천 향</text>
            <text x="105" y="20" fill="#006938" style={{ fontSize: '18px', fontWeight: 'bold' }}>: {prescription?.incense.title}</text>
            <foreignObject x="0" y="35" width="720" height="60">
              <div style={{ color: '#006938', fontSize: '15px', lineHeight: '1.5', fontFamily: 'serif', paddingRight: '20px' }}>
                {prescription?.incense.desc}
              </div>
            </foreignObject>
          </g>
        </g>

        {/* 하단 우측 메타데이터 영역 */}
        <g transform="translate(583, 481)">
          {/* 가로선들 */}
          <line x1="0" y1="0" x2="234" y2="0" stroke="#006938" strokeWidth="2"/>
          <line x1="0" y1="24.7" x2="234" y2="24.7" stroke="#006938"/>
          <line x1="0" y1="48.9" x2="234" y2="48.9" stroke="#006938"/>
          <line x1="0" y1="73.2" x2="234" y2="73.2" stroke="#006938"/>
          
          {/* 세로선 */}
          <line x1="118.5" y1="1" x2="118.5" y2="74" stroke="#006938"/>

          {/* 라벨들 */}
          <text x="10" y="17" fill="#006938" style={{ fontSize: '11px', fontWeight: 'bold' }}>ISSUE DATE</text>
          <text x="128" y="17" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>{today}</text>

          <text x="10" y="41" fill="#006938" style={{ fontSize: '11px', fontWeight: 'bold' }}>VISITOR NO.</text>
          <text x="128" y="41" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>#{String(visitorCount).padStart(4, '0')}</text>

          <text x="10" y="65" fill="#006938" style={{ fontSize: '11px', fontWeight: 'bold' }}>RX CODE</text>
          <text x="128" y="65" fill="#006938" style={{ fontSize: '12px', fontWeight: '900' }}>{safeCode}</text>
        </g>

        {/* 하단 하단 엑스포 정보 */}
        <text x="801" y="580" textAnchor="end" fill="#006938" style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.6 }}>
          2026 SEOUL INT&apos;L BUDDHISM EXPO | MAUM-RX SYSTEM V4
        </text>
      </svg>
    </div>
  );
};

export default PrescriptionCard;
