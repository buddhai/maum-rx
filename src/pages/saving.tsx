import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '@/components/quiz/LoadingScreen'

export default function SavingPage() {
  const router = useRouter()
  const { state } = router.query
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

        // Use AbortController to enforce a strict 8-second timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const res = await fetch('/api/prescription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Server error')
        
        router.replace(`/result?code=${encodeURIComponent(data.code)}`)

      } catch (err) {
        console.error("API failed, using fallback:", err)
        // Always go to result with fallback — never stay stuck
        router.replace(`/result?code=${encodeURIComponent('연꽃의 해탈')}&fallback=true`)
      }
    }

    savePrescription()

  }, [router.isReady, state, router])

  return <LoadingScreen />
}
