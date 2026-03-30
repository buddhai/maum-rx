import Head from 'next/head'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import html2canvas from 'html2canvas'
import MobileLayout from '@/components/MobileLayout'
import { PrescriptionCard } from '@/components/PrescriptionCard'
import { PRESCRIPTIONS } from '@/lib/prescriptions'
import type { Concern, Reason } from '@/lib/prescriptions'

interface SessionData {
  code: string
  mbtiStr: string
  concern: string
  reason: string
  aiLine: string
}

export default function ResultPage() {
  const router = useRouter()
  const printRef = useRef<HTMLDivElement>(null)
  const [savingImage, setSavingImage] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [session, setSession] = useState<SessionData | null>(null)

  useEffect(() => {
    // Read from sessionStorage (set by saving.tsx)
    const stored = sessionStorage.getItem('rx_result')
    if (!stored) {
      router.replace('/')
      return
    }
    try {
      const parsed = JSON.parse(stored) as SessionData
      setSession(parsed)
    } catch {
      router.replace('/')
    }
  }, [router])

  if (!session) return null

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

  return (
    <MobileLayout bg="white">
      <Head>
        <title>처방전 - {session.code}</title>
      </Head>

      {/* Scrollable content including buttons */}
      <div className="w-full flex-1 overflow-y-auto animate-fade-in bg-white">
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

        {/* Buttons with proper spacing */}
        <div className="w-full px-[20px] pb-[40px] pt-[24px] flex flex-col gap-[12px]">
          <button
            onClick={() => setShowModal(true)}
            className="w-full h-[56px] rounded-[16px] bg-[var(--primary-green)] text-white text-[16px] font-bold font-scdream tracking-wide shadow-[0_4px_14px_rgba(0,104,55,0.3)] transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            현장 프린터 출력하기
          </button>
          
          <button
            onClick={handleSaveImage}
            disabled={savingImage}
            className="w-full h-[48px] rounded-[14px] bg-[#F0F5F2] text-[var(--primary-green)] text-[15px] font-bold tracking-tight transition-transform hover:bg-[#E0EBE4] flex items-center justify-center gap-1.5"
          >
            {savingImage ? '저장 중...' : '이미지 저장'}
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="w-full h-[44px] rounded-[14px] bg-transparent text-gray-400 text-[14px] font-medium tracking-tight transition-all hover:text-[var(--primary-green)] flex items-center justify-center gap-1"
          >
            ← 처음으로 돌아가기
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
            <div className="bg-[#F0F5F2] rounded-[16px] py-[24px] mb-[28px]">
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
