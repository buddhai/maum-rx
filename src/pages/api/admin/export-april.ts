import type { NextApiRequest, NextApiResponse } from 'next'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''

  const str =
    value instanceof Date
      ? value.toISOString()
      : String(value)

  return `"${str.replace(/"/g, '""')}"`
}

function toKoreanTimeString(value: any): string {
  try {
    const date =
      value?.toDate instanceof Function
        ? value.toDate()
        : value instanceof Date
          ? value
          : new Date(value)

    return date.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  } catch {
    return ''
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const key = req.query.key

    if (!process.env.EXPORT_KEY || key !== process.env.EXPORT_KEY) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const start = Timestamp.fromDate(new Date('2026-03-31T15:00:00.000Z')) // KST 2026-04-01 00:00
    const end = Timestamp.fromDate(new Date('2026-04-30T15:00:00.000Z'))   // KST 2026-05-01 00:00

    const q = query(
      collection(db, 'rx_sessions'),
      where('eventId', '==', 'seon2026'),
      where('createdAt', '>=', start),
      where('createdAt', '<', end),
      orderBy('createdAt', 'asc')
    )

    const snap = await getDocs(q)

    const headers = [
      'id',
      'code',
      'createdAt',
      'mbti',
      'concern',
      'reason',
      'freeText',
      'aiLine',
      'typeName',
      'meditationTitle',
      'meditationDesc',
      'teaTitle',
      'teaDesc',
      'incenseTitle',
      'incenseDesc',
      'printed',
      'eventId',
    ]

    const rows = snap.docs.map((doc) => {
      const data: any = doc.data()
      const prescription = data.prescription || {}

      return [
        data.id || doc.id,
        data.code || '',
        toKoreanTimeString(data.createdAt),
        data.mbti || '',
        data.concern || '',
        data.reason || '',
        data.freeText || '',
        data.aiLine || '',
        prescription.typeName || '',
        prescription.meditation?.title || '',
        prescription.meditation?.desc || '',
        prescription.tea?.title || '',
        prescription.tea?.desc || '',
        prescription.incense?.title || '',
        prescription.incense?.desc || '',
        data.printed ?? '',
        data.eventId || '',
      ]
    })

    const csv =
      '\uFEFF' +
      [
        headers.map(csvEscape).join(','),
        ...rows.map((row) => row.map(csvEscape).join(',')),
      ].join('\n')

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="maum-rx-2026-04.csv"')
    return res.status(200).send(csv)
  } catch (error: any) {
    console.error('export-april error:', error)

    return res.status(500).json({
      error: 'Export failed',
      message: error?.message || String(error),
    })
  }
}
