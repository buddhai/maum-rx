import {
  collection, doc, setDoc, getDocs,
  query, where, orderBy, limit, Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { RxSession } from './prescriptions'
import { generateCode } from './prescriptions'

const EVENT_ID = 'seon2026'

// ── 처방 세션 저장 ────────────────────────────────────────
export async function saveRxSession(
  data: Omit<RxSession, 'id' | 'code' | 'createdAt' | 'printed' | 'eventId'>
): Promise<{ id: string; code: string }> {

  // 중복 안 되는 코드 생성
  let code = generateCode()
  let isUnique = false
  while (!isUnique) {
    const existing = await getRxByCode(code)
    if (!existing) isUnique = true
    else code = generateCode()
  }

  const id = `${EVENT_ID}_${Date.now()}_${code}`
  const session: RxSession = {
    ...data,
    id,
    code,
    createdAt: new Date(),
    printed: false,
    eventId: EVENT_ID,
  }

  await setDoc(doc(db, 'rx_sessions', id), {
    ...session,
    createdAt: Timestamp.fromDate(session.createdAt),
  })

  return { id, code }
}

// ── 코드로 처방 조회 ──────────────────────────────────────
export async function getRxByCode(code: string): Promise<RxSession | null> {
  const cleanCode = code.trim()
  const q = query(
    collection(db, 'rx_sessions'),
    where('code', '==', cleanCode),
    where('eventId', '==', EVENT_ID),
    limit(1)
  )
  const snap = await getDocs(q)
  if (snap.empty) return null

  const data = snap.docs[0].data()
  return {
    ...data,
    createdAt: (data.createdAt as Timestamp).toDate(),
  } as RxSession
}

// ── 출력 완료 마킹 ────────────────────────────────────────
export async function markAsPrinted(id: string): Promise<void> {
  await setDoc(doc(db, 'rx_sessions', id), { printed: true }, { merge: true })
}

// ── 어드민: 전체 세션 조회 ────────────────────────────────
export async function getAllSessions(limitCount = 100): Promise<RxSession[]> {
  const q = query(
    collection(db, 'rx_sessions'),
    where('eventId', '==', EVENT_ID),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({
    ...d.data(),
    createdAt: (d.data().createdAt as Timestamp).toDate(),
  })) as RxSession[]
}
