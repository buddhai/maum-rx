import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import LoadingScreen from '@/components/quiz/LoadingScreen'
import { DEFAULT_AI_LINES } from '@/lib/prescriptions'
import type { Concern, Reason } from '@/lib/prescriptions'

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
        
        // Pass full result data in URL so result page doesn't need Firestore
        const resultData = encodeURIComponent(JSON.stringify({
          code: data.code,
          mbtiStr: data.mbtiStr,
          concern: payload.concern,
          reason: payload.reason,
          aiLine: data.aiLine,
        }))
        router.replace(`/result?data=${resultData}`)

      } catch (err) {
        console.error("API failed, building result locally:", err)
        
        // Build result locally without API — use prescriptions.ts directly
        const decoded = JSON.parse(decodeURIComponent(state as string))
        const mbtiStr = decoded.m || 'INTJ'
        const concern = (decoded.c || '번아웃') as Concern
        const reason = (decoded.r || '편안해지고싶어서') as Reason
        const tf = mbtiStr[2] as 'T' | 'F'
        const aiLine = DEFAULT_AI_LINES[concern]?.[tf] || '지금 이 자리에 와주신 것만으로도, 당신은 이미 자신을 돌보고 있습니다.'

        const prefixes = ['연꽃의', '자비의', '지혜의', '보리의', '인연의', '무상의', '선정의', '공덕의']
        const suffixes = ['해탈', '보살', '선정', '공덕', '열반', '반야', '자비', '지혜']
        const code = prefixes[Math.floor(Math.random() * prefixes.length)] + ' ' + suffixes[Math.floor(Math.random() * suffixes.length)]

        const resultData = encodeURIComponent(JSON.stringify({
          code, mbtiStr, concern, reason, aiLine,
        }))
        router.replace(`/result?data=${resultData}`)
      }
    }

    savePrescription()

  }, [router.isReady, state, router])

  return <LoadingScreen />
}
