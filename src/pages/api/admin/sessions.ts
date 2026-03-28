import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllSessions } from '@/lib/db'

// 간단한 어드민 인증 (환경변수로 비밀번호)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'maum2026'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 어드민 인증
  const auth = req.headers.authorization
  if (auth !== `Bearer ${ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'GET') return res.status(405).end()

  const sessions = await getAllSessions(500)

  // 통계 계산
  const stats = {
    total: sessions.length,
    printed: sessions.filter(s => s.printed).length,
    byMBTI: {} as Record<string, number>,
    byConcern: {} as Record<string, number>,
    byReason: {} as Record<string, number>,
    byHour: {} as Record<number, number>,
  }

  sessions.forEach(s => {
    stats.byMBTI[s.mbti] = (stats.byMBTI[s.mbti] || 0) + 1
    stats.byConcern[s.concern] = (stats.byConcern[s.concern] || 0) + 1
    stats.byReason[s.reason] = (stats.byReason[s.reason] || 0) + 1
    const hour = new Date(s.createdAt).getHours()
    stats.byHour[hour] = (stats.byHour[hour] || 0) + 1
  })

  return res.status(200).json({ stats, sessions })
}
