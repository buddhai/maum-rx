import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '@/components/quiz/LoadingScreen'

export default function SavingPage() {
  const router = useRouter()
  const { state } = router.query
  const [errorMsg] = useState('')
  const hasSaved = useRef(false)

  useEffect(() => {
    if (!router.isReady) return
    if (!state) {
      router.replace('/')
      return
    }

    if (hasSaved.current) return
    hasSaved.current = true

    const savePrescription = async () => {
      try {
        const decoded = JSON.parse(decodeURIComponent(state as string))
        
        // Payload parsing
        const mbtiObj = {
          EI: decoded.m?.[0] || 'E',
          SN: decoded.m?.[1] || 'S',
          TF: decoded.m?.[2] || 'T',
          JP: decoded.m?.[3] || 'J'
        }
        
        const payload = {
          mbti: mbtiObj,
          concern: decoded.c || '번아웃',
          reason: decoded.r || '편안해지고싶어서',
          freeText: '',
          kakaoId: decoded.k_id || null,
          kakaoName: decoded.k_name || null
        }

        const res = await fetch('/api/prescription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        
        if (!res.ok) throw new Error(data.message || 'Server error')
        
        setTimeout(() => {
          router.replace(`/result?code=${encodeURIComponent(data.code)}`)
        }, 2000)

      } catch (err) {
        console.error("Failed to submit quiz, using fallback:", err)
        const fallbackCode = '연꽃의 해탈'
        setTimeout(() => {
          router.replace(`/result?code=${encodeURIComponent(fallbackCode)}&fallback=true`)
        }, 2000)
      }
    }

    savePrescription()

  }, [router.isReady, state, router])

  if (errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center h-[100vh] bg-white text-[var(--primary-green)]">
        <p>{errorMsg}</p>
        <button onClick={() => router.push('/')} className="mt-4 px-4 py-2 border rounded">홈으로</button>
      </div>
    )
  }

  return <LoadingScreen />
}
