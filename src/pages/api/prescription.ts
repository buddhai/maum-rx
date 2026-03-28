import type { NextApiRequest, NextApiResponse } from 'next'
import {
  PRESCRIPTIONS, DEFAULT_AI_LINES, MBTI_MODIFIERS,
  type Concern, type Reason, type MBTIAnswers
} from '@/lib/prescriptions'
import { saveRxSession } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const {
    kakaoId, kakaoName,
    mbti, concern, reason, freeText,
  }: {
    kakaoId: string
    kakaoName: string
    mbti: MBTIAnswers
    concern: Concern
    reason: Reason
    freeText: string
  } = req.body

  // 처방 데이터 가져오기
  const prescription = PRESCRIPTIONS[concern]?.[reason]
  if (!prescription) return res.status(400).json({ error: 'Invalid concern/reason' })

  const mbtiStr = mbti.EI + mbti.SN + mbti.TF + mbti.JP
  const tf = mbti.TF as 'T' | 'F'

  // AI 한줄 생성
  let aiLine = DEFAULT_AI_LINES[concern]?.[tf] || '지금 이 자리에 와주신 것만으로도, 당신은 이미 자신을 돌보고 있습니다.'

  if (freeText?.trim()) {
    try {
      const styleHint = MBTI_MODIFIERS.aiStyle[mbti.SN as 'S' | 'N']
      const toneHint  = MBTI_MODIFIERS.aiTone[tf]

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY!,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 120,
          messages: [{
            role: 'user',
            content: `당신은 불교 명상 선생님입니다. 다음 사람을 위한 한 문장을 써주세요.

MBTI: ${mbtiStr}
고민: ${concern}
이유: ${reason}
하고 싶은 말: "${freeText}"

문체: ${styleHint}, ${toneHint}
규칙:
- 반드시 한 문장만 (35자 이내)
- 불교적 지혜가 담기되 종교적 표현 없이
- 그 사람의 말에 직접 반응하는 내용으로
- 따뜻하고 시적인 문체
- 오직 문장만 출력, 따옴표 없이`,
          }],
        }),
      })
      const data = await response.json()
      const generated = data?.content?.[0]?.text?.trim()
      if (generated) aiLine = generated
    } catch {
      // AI 실패 시 기본값 사용
    }
  }

  // Firebase 저장
  const { id, code } = await saveRxSession({
    kakaoId,
    kakaoName,
    mbti: mbtiStr,
    concern,
    reason,
    freeText: freeText || '',
    aiLine,
    prescription,
  })

  return res.status(200).json({ id, code, aiLine, prescription, mbtiStr })
}
