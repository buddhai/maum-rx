import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '@/components/quiz/LoadingScreen'
import { DEFAULT_AI_LINES } from '@/lib/prescriptions'
import type { Concern } from '@/lib/prescriptions'

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
        
        const concern = decoded.c || '번아웃'
        const reason = decoded.r || '편안해지고싶어서'
        const mbtiStr = decoded.m || 'INTJ'
        
        const payload = {
          mbti: mbtiObj,
          concern,
          reason,
          freeText: ''
        }

        let code = ''
        let aiLine = ''

        try {
          // Try API with timeout
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
          
          code = data.code
          aiLine = data.aiLine
        } catch {
          // API failed — build locally
          const tf = mbtiStr[2] as 'T' | 'F'
          aiLine = DEFAULT_AI_LINES[concern as Concern]?.[tf] || '지금 이 자리에 와주신 것만으로도, 당신은 이미 자신을 돌보고 있습니다.'
          const prefixes = ['연꽃의', '자비의', '지혜의', '보리의', '인연의', '무상의', '선정의', '공덕의']
          const suffixes = ['해탈', '보살', '선정', '공덕', '열반', '반야', '자비', '지혜']
          code = prefixes[Math.floor(Math.random() * prefixes.length)] + ' ' + suffixes[Math.floor(Math.random() * suffixes.length)]
        }

        // Save to sessionStorage (more reliable than URL params for large data)
        sessionStorage.setItem('rx_result', JSON.stringify({
          code, mbtiStr, concern, reason, aiLine,
        }))
        router.replace('/result')

      } catch (err) {
        console.error("Fatal error in saving:", err)
        router.replace('/')
      }
    }

    savePrescription()

  }, [router.isReady, state, router])

  return <LoadingScreen />
}
