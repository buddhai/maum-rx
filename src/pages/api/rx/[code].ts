import type { NextApiRequest, NextApiResponse } from 'next'
import { getRxByCode, markAsPrinted } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query as { code: string }

  if (req.method === 'GET') {
    const session = await getRxByCode(code)
    if (!session) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(session)
  }

  // PATCH: 출력 완료 마킹
  if (req.method === 'PATCH') {
    const session = await getRxByCode(code)
    if (!session) return res.status(404).json({ error: 'Not found' })
    await markAsPrinted(session.id)
    return res.status(200).json({ ok: true })
  }

  return res.status(405).end()
}
