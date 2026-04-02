import React from 'react';
import { Prescription, Concern, Reason } from '../lib/prescriptions';

interface PrescriptionCardProps {
  prescription?: Prescription;
  mbtiStr?: string;
  concern?: Concern;
  reason?: Reason;
  code?: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  mbtiStr = '',
  concern,
  reason,
  code = ''
}) => {
  // Use robust string conversion to prevent toUpperCase() on undefined/null
  const safeMbti = String(mbtiStr || '').toUpperCase();
  const safeName = String(prescription?.name || '').toUpperCase();
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
        <rect width="595" height="842" transform="matrix(0 1 -1 0 842 0)" fill="white"/>
        
        <g clipPath="url(#clip0_149_2)">
          {/* Top Left Box (Patient Information) */}
          <rect x="41" y="30" width="275" height="157" rx="20" fill="#006938"/>
          <rect x="107" y="46" width="140" height="24" rx="12" fill="white"/>
          {/* Label: "마음 처방 유형" - Exact Path from Original */}
          <path d="M145.96 61.04V52.63H150.47V61.04H145.96ZM149.12 53.82H147.32V59.85H149.12V53.82ZM153.17 56.11H154.55V57.29H153.17V61.65H151.8V52.47H153.17V56.11ZM155.69 54.28C155.69 53.75 155.9 53.37 156.26 53.1C156.93 52.61 158.08 52.47 159.41 52.47C160.74 52.47 161.89 52.61 162.56 53.1C162.92 53.37 163.13 53.75 163.13 54.28C163.13 54.8 162.92 55.19 162.56 55.45C161.89 55.95 160.74 56.09 159.41 56.09C158.08 56.09 156.93 55.95 156.26 55.45C155.9 55.19 155.69 54.8 155.69 54.28ZM157.06 54.28C157.06 54.42 157.12 54.53 157.25 54.62C157.6 54.87 158.39 54.93 159.41 54.93C160.43 54.93 161.22 54.87 161.57 54.62C161.7 54.53 161.76 54.42 161.76 54.28C161.76 54.14 161.7 54.02 161.57 53.94C161.22 53.69 160.43 53.62 159.41 53.62C158.39 53.62 157.6 53.69 157.25 53.94C157.12 54.02 157.06 54.14 157.06 54.28ZM155.27 56.56H163.53V57.72H155.27V56.56ZM155.85 61.75V58.41H162.95V61.75H155.85ZM161.58 59.56H157.22V60.59H161.58V59.56ZM173.069 53.54V54.73H171.229V55.88C171.229 58.46 172.109 59.3 173.149 59.78V61.04C172.049 60.72 171.049 59.95 170.549 59.09C170.049 59.95 169.049 60.72 167.949 61.04V59.78C168.989 59.3 169.859 58.46 169.859 55.88V54.73H168.049V53.54H169.859V52.2H171.229V53.54H173.069ZM175.539 61.65H174.169V57.42H172.269V56.24H174.169V52.47H175.539V61.65Z" fill="white"/>
          
          {/* Top Right Box (Prescription Title Frame) */}
          <rect x="330.5" y="30.5" width="274" height="156" rx="19.5" stroke="#006938"/>
          <rect x="420" y="51" width="96" height="24" rx="12" fill="#006938"/>
          {/* Label: "마음 처방전" - Exact Path from Original */}
          <path d="M436.96 66.04V57.63H441.47V66.04H436.96ZM440.12 58.82H438.32V64.85H440.12V58.82ZM444.17 61.11H445.55V62.29H444.17V66.65H442.8V57.47H444.17V61.11ZM446.69 59.28C446.69 58.75 446.9 58.37 447.26 58.1C447.93 57.61 449.08 57.47 450.41 57.47C451.74 57.47 452.89 57.61 453.56 58.1ZM448.06 59.28C448.06 59.42 448.12 59.53 448.25 59.62ZM446.27 61.56H454.53V62.72H446.27V61.56ZM446.85 66.75V63.41H453.95V66.75H446.85ZM452.58 64.56H448.22V65.59H452.58V64.56ZM464.069 58.54V59.73H462.229V60.88C462.229 63.46 463.109 64.3 464.149 64.78V66.04C463.049 65.72 462.049 64.95 461.549 64.09ZM466.539 66.65H465.169V62.42H463.269V61.24H465.169V57.47H466.539V66.65Z" fill="white"/>
          
          {/* Main Divider Line */}
          <line x1="41" y1="205" x2="801" y2="205" stroke="#006938" strokeWidth="2"/>

          {/* Dynamic Data Placement */}
          <text 
            x="178" 
            y="115" 
            textAnchor="middle" 
            fill="white" 
            style={{ fontSize: '24px', fontWeight: 'bold' }}
          >
            {safeName || '처방 로딩 중...'}
          </text>
          <text 
            x="178" 
            y="160" 
            textAnchor="middle" 
            fill="rgba(255,255,255,0.7)" 
            style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '4px' }}
          >
            {safeMbti || 'MBTI'}
          </text>

          <text 
            x="467" 
            y="130" 
            textAnchor="middle" 
            fill="#006938" 
            style={{ fontSize: '28px', fontWeight: 'bold' }}
          >
            {prescription?.name || '마음을 진단합니다'}
          </text>

          <foreignObject x="80" y="240" width="680" height="200">
            <div 
              style={{ 
                color: '#006938', 
                fontSize: '18px', 
                lineHeight: '1.8', 
                textAlign: 'left',
                fontFamily: 'serif',
                whiteSpace: 'pre-wrap'
              }}
            >
              {prescription?.description || '잠시만 기다려주세요...'}
            </div>
          </foreignObject>

          {/* Footer - Stamps reconstructed properly */}
          <g transform="translate(41, 445)">
             <rect width="110" height="110" rx="55" fill="#006938" fillOpacity="0.1"/>
             <rect width="110" height="110" rx="55" stroke="#006938" strokeWidth="1" strokeDasharray="4 4"/>
             <path d="M51.2 35C48.5 32.3 44.2 32.3 41.5 35L40.2 36.3L38.9 35C36.2 32.3 31.9 32.3 29.2 35C27.9 36.3 27.2 38 27.2 39.8C27.2 41.6 27.9 43.3 29.2 44.6L35.3 50.7C36.6 52 38.3 52.7 40.2 52.7C42.1 52.7 43.8 52 45.1 50.7L51.2 44.6C52.5 43.3 53.2 41.6 53.2 39.8C53.2 38 52.5 36.3 51.2 35Z" transform="translate(15, 10)" fill="#006938" opacity="0.5"/>
             <text x="55" y="65" textAnchor="middle" fill="#006938" style={{ fontSize: '9px', fontWeight: '900' }}>MAUM-RX</text>
             <text x="55" y="75" textAnchor="middle" fill="#006938" style={{ fontSize: '7px', fontWeight: '700', opacity: 0.6 }}>CERTIFIED</text>
          </g>

          <g transform="translate(160, 445)">
             <rect width="110" height="110" rx="55" fill="#006938" fillOpacity="0.1"/>
             <rect width="110" height="110" rx="55" stroke="#006938" strokeWidth="1" strokeDasharray="4 4"/>
             <text x="55" y="60" textAnchor="middle" fill="#006938" style={{ fontSize: '9px', fontWeight: '900' }}>BEXPO 2026</text>
             <text x="55" y="70" textAnchor="middle" fill="#006938" style={{ fontSize: '7px', fontWeight: '700', opacity: 0.6 }}>APPROVED</text>
          </g>

          <line x1="300" y1="455" x2="300" y2="555" stroke="#006938" strokeOpacity="0.2"/>

          <text x="320" y="475" fill="#006938" style={{ fontSize: '13px', fontWeight: 'bold' }}>DATE OF ISSUE</text>
          <text x="320" y="495" fill="#006938" style={{ fontSize: '16px', fontWeight: '900' }}>{today}</text>
          
          <text x="320" y="525" fill="#006938" style={{ fontSize: '13px', fontWeight: 'bold' }}>PRESCRIPTION CODE</text>
          <text x="320" y="545" fill="#006938" style={{ fontSize: '16px', fontWeight: '900', letterSpacing: '2px' }}>{safeCode}</text>

          <text x="800" y="500" textAnchor="end" fill="#006938" style={{ fontSize: '12px', fontWeight: 'bold' }}>2026 SEOUL INT'L BUDDHISM EXPO</text>
          <text x="800" y="515" textAnchor="end" fill="#006938" style={{ fontSize: '10px', opacity: 0.6 }}>MAUM-RX CLINIC OFFICIAL</text>
          <text x="800" y="575" textAnchor="end" fill="#cccccc" style={{ fontSize: '8px' }}>V4.HIGH_FIDELITY_SVG_ENGINE</text>
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
