import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import MobileLayout from '@/components/MobileLayout'
import { PrescriptionCard } from '@/components/PrescriptionCard'
import { getRxByCode } from '@/lib/db'
import { PRESCRIPTIONS } from '@/lib/prescriptions'
import type { Concern, Reason } from '@/lib/prescriptions'

interface ResultProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any | null // Type properly if possible
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code, fallback } = context.query
  if (!code || typeof code !== 'string') {
    return { redirect: { destination: '/', permanent: false } }
  }

  const session = await getRxByCode(code)
  
  if (!session) {
    if (fallback === 'true') {
      // Create a dummy session for fallback mode when DB is failing
      return {
        props: {
          session: {
            code: code,
            mbtiStr: 'INTJ', // Default or random
            concern: '번아웃',
            reason: '편안해지고싶어서',
            aiLine: '잠시 쉼표를 찍어도 괜찮습니다. 당신의 가치는 속도가 아닌 방향에 있으니까요.',
            createdAt: Date.now(),
            isFallback: true
          }
        }
      }
    }
    return { redirect: { destination: '/', permanent: false } }
  }

  // Convert Firebase Timestamp to string/number if needed, but db.ts might return serializable data.
  // Actually, db.ts getPrescriptionSession returns a document data object. We must serialize createdAt.
  const serializedSession = {
    ...session,
    createdAt: session.createdAt?.getTime ? session.createdAt.getTime() : Date.now()
  }

  return { props: { session: serializedSession } }
}

export default function ResultPage({ session }: ResultProps) {
  const printRef = useRef<HTMLDivElement>(null)
  const [savingImage, setSavingImage] = useState(false)
  const [showModal, setShowModal] = useState(false)

  if (!session) return null

  // Find the exact prescription data
  const prescription = PRESCRIPTIONS[session.concern as Concern]?.[session.reason as Reason]

  const handleSaveImage = async () => {
    if (!printRef.current) return
    setSavingImage(true)
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2, backgroundColor: '#FFF8F0' })
      const image = canvas.toDataURL('image/jpeg', 0.9)
      const link = document.createElement('a')
      link.href = image
      link.download = `마음처방전_${session.code}.jpg`
      link.click()
    } catch (err) {
      console.error(err)
      alert("이미지 저장에 실패했습니다.")
    } finally {
      setSavingImage(false)
    }
  }

  // Kakao Login & Send implemented via Next.js auth or custom route
  // From implementation_plan: `/result` has "카카오로 받기" which triggers kakao login
  // We can just redirect to `/api/auth/kakao/callback` with code? Actually kakao auth flow requires KAKAO REST API.
  // Since we have `kakao.ts` we'll just redirect to Kakao auth URL.
  const handleKakao = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
    const redirectUri = `${window.location.origin}/api/auth/kakao/callback`
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${session.code}`
    window.location.href = kakaoAuthUrl
  }

  return (
    <MobileLayout bg="white">
      <Head>
        <title>처방전 - {session.code}</title>
      </Head>

      {/* The Scrollable View */}
      <div className="w-full flex-1 overflow-y-auto animate-fade-in pb-[120px] bg-white">
        {prescription && (
          <PrescriptionCard
            ref={printRef}
            code={session.code}
            mbtiStr={session.mbtiStr}
            concern={session.concern}
            reason={session.reason}
            aiLine={session.aiLine}
            prescription={prescription}
            isPrintMode={false}
          />
        )}
      </div>

      {/* Fixed Bottom Button Area (Glassmorphism or solid white container) */}
      <div className="fixed bottom-0 w-full max-w-[375px] bg-white border-t border-gray-100 p-[20px] pt-[16px] pb-[32px] flex flex-col gap-[10px] z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-[60px] rounded-[30px] bg-[var(--primary-green)] text-white text-[18px] font-bold font-scdream tracking-wide shadow-[0_4px_14px_rgba(0,104,55,0.3)] transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          현장 прин터 출력하기
        </button>
        
        <div className="flex gap-[10px]">
          <button
            onClick={handleKakao}
            className="flex-1 h-[52px] rounded-[26px] bg-[#FEE500] text-[#000000] text-[15px] font-bold tracking-tight transition-transform hover:scale-[1.02] flex items-center justify-center gap-1.5"
          >
            카카오톡 공유
          </button>
          
          <button
            onClick={handleSaveImage}
            disabled={savingImage}
            className="flex-1 h-[52px] rounded-[26px] bg-white border-[1.5px] border-[var(--primary-green)] text-[var(--primary-green)] text-[15px] font-bold tracking-tight transition-transform hover:bg-[#F0F5F2] flex items-center justify-center gap-1.5"
          >
            {savingImage ? '저장 중...' : '이미지 저장'}
          </button>
        </div>
      </div>

      {/* Print Info Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-[24px] animate-fade-in backdrop-blur-sm">
          <div className="bg-white p-[32px] rounded-[24px] w-full max-w-[340px] text-center shadow-xl">
            <h3 className="text-[22px] font-bold text-[var(--primary-green)] mb-[12px] font-scdream">처방전 출력 안내</h3>
            <p className="text-[15px] text-gray-600 mb-[24px] leading-relaxed break-keep">
              현장 행사 부스에 방문하여<br/>아래 출력 코드를 제시해주세요.
            </p>
            <div className="bg-[#F0F5F2] rounded-[16px] py-[24px] mb-[28px] border border-[var(--primary-green)] border-opacity-20">
              <div className="text-[32px] font-black text-[var(--dark)] tracking-[4px] font-scdream">
                {session.code}
              </div>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="w-full h-[56px] rounded-[28px] bg-[var(--primary-green)] text-white text-[18px] font-bold shadow-md transition-transform hover:scale-[1.02]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </MobileLayout>
  )
}
