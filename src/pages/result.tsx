import Head from 'next/head'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import html2canvas from 'html2canvas'
import MobileLayout from '@/components/MobileLayout'
import PrescriptionCard from '@/components/PrescriptionCard'
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
  const [downloadModalUrl, setDownloadModalUrl] = useState<string | null>(null)
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
    
    // 모바일(특히 iOS Safari)에서 html2canvas가 스크롤 위치를 잘못 계산하여
    // 이미지를 확대/자르기(Crop)해버리는 심각한 버그를 방지하기 위해 컨테이너 스크롤을 임시로 위로 올립니다.
    const scrollContainer = document.querySelector('.overflow-y-auto');
    const prevScroll = scrollContainer ? scrollContainer.scrollTop : 0;
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }

    try {
      // 폰트 렌더링 등 완료 보장을 위한 약간의 지연
      await new Promise(r => setTimeout(r, 100));
      
      const canvas = await html2canvas(printRef.current, { 
        scale: 2, 
        backgroundColor: '#FFF8F0',
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
      })
      const image = canvas.toDataURL('image/jpeg', 0.9)
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobi/i.test(navigator.userAgent) || navigator.maxTouchPoints > 2;
      const isKakao = /KAKAOTALK/i.test(navigator.userAgent);
      const isInsta = /Instagram/i.test(navigator.userAgent);

      // 모바일 기기는 무조건 모달을 띄워 네이티브 OS 기능(꾹 눌러 저장)을 쓰도록 유도합니다.
      if (isMobile || isKakao || isInsta) {
        setDownloadModalUrl(image)
      } else {
        const link = document.createElement('a')
        link.href = image
        link.download = `마음처방전_${session.code}.jpg`
        link.click()
      }
    } catch (err) {
      console.error(err)
      alert("이미지 생성에 실패했습니다.")
    } finally {
      if (scrollContainer) {
        scrollContainer.scrollTop = prevScroll; // 스크롤 원복
      }
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
            code={session.code}
            mbtiStr={session.mbtiStr}
            prescription={prescription}
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

      {/* Loading Overlay for Image Generation */}
      {savingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[300] flex flex-col items-center justify-center animate-fade-in backdrop-blur-md">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
          <div className="text-white text-[18px] font-black font-scdream tracking-widest">이미지 생성 중...</div>
          <p className="text-white opacity-60 text-[14px] mt-2">잠시만 기다려주세요</p>
        </div>
      )}

      {/* Download Modal - Long Press UX for Mobile */}
      {downloadModalUrl && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-[200] flex flex-col items-center justify-center p-[20px] animate-fade-in backdrop-blur-xl"
          onClick={() => setDownloadModalUrl(null)}
        >
          <div className="w-full max-w-[340px] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <div className="mb-6 text-center">
              <h3 className="text-[20px] font-black text-white font-scdream mb-2">이미지 저장 안내</h3>
              <p className="text-white opacity-70 text-[14px] leading-relaxed break-keep">
                아래 이미지를 <span className="text-[var(--primary-green)] bg-white px-1.5 py-0.5 rounded-md font-bold">꾹 눌러서</span><br/>
                &apos;내 휴대폰에 저장&apos;을 눌러주세요.
              </p>
            </div>
            
            <div className="relative w-full rounded-[24px] overflow-hidden shadow-2xl border-4 border-white border-opacity-20 mb-8 max-h-[60vh] overflow-y-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={downloadModalUrl} 
                className="w-full h-auto object-contain bg-white" 
                alt="마음처방전 결과"
              />
            </div>

            <div className="flex flex-col w-full gap-3">
              <button
                onClick={() => setDownloadModalUrl(null)}
                className="w-full h-[56px] rounded-[20px] bg-white text-[var(--primary-green)] text-[16px] font-black shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileLayout>
  )
}
