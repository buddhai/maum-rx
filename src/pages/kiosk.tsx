import { useState } from 'react'
import Head from 'next/head'
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

export default function KioskPage() {
  const [code, setCode] = useState('')
  const [session, setSession] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [printSize, setPrintSize] = useState<'A4-portrait' | 'A4-landscape'>('A4-landscape')

  const handleLookup = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError('')
    setSession(null)

    try {
      const res = await fetch(`/api/rx/${encodeURIComponent(code.trim())}`)
      if (!res.ok) {
        setError('해당 코드의 처방전을 찾을 수 없습니다.')
        setLoading(false)
        return
      }
      const data = await res.json()
      setSession({
        code: data.code,
        mbtiStr: data.mbtiStr,
        concern: data.concern,
        reason: data.reason,
        aiLine: data.aiLine,
      })
    } catch {
      setError('서버 연결에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = async () => {
    // Mark as printed
    try {
      await fetch(`/api/rx/${encodeURIComponent(session!.code)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ printed: true }),
      })
    } catch (err) {
      console.error('Failed to mark as printed', err)
    }
    window.print()
  }

  const handleReset = () => {
    setSession(null)
    setCode('')
    setError('')
  }

  const prescription = session
    ? PRESCRIPTIONS[session.concern as Concern]?.[session.reason as Reason]
    : null

  return (
    <>
      <Head>
        <title>마음처방전 키오스크 | 현장 출력</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* ─── Print-only CSS ─── */}
      <style>{`
        @media screen {
          .kiosk-print-zone { display: none; }
        }
        @media print {
          @page {
            size: ${printSize === 'A4-landscape' ? 'A4 landscape' : 'A4 portrait'};
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
          }
          .kiosk-screen { display: none !important; }
          .kiosk-print-zone {
            display: block;
            width: 100%;
          }
        }
      `}</style>

      {/* ─── Screen UI ─── */}
      <div className="kiosk-screen" style={{
        minHeight: '100vh',
        background: '#f5f5f0',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-pretendard), sans-serif',
      }}>
        {/* Top bar */}
        <div style={{
          background: '#006838',
          color: 'white',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>마음처방전 — 현장 출력 키오스크 V2</h1>
            <p style={{ fontSize: '13px', opacity: 0.8, margin: '4px 0 0' }}>2026 서울국제불교박람회 선명상축제 (최신 레이아웃)</p>
          </div>
          {session && (
            <button onClick={handleReset} style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.4)',
              background: 'transparent',
              color: 'white',
              fontSize: '15px',
              cursor: 'pointer',
            }}>
              ← 새 코드 입력
            </button>
          )}
        </div>

        {/* Main content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
        }}>
          {!session ? (
            /* ── Code Input View ── */
            <div style={{
              background: 'white',
              padding: '60px',
              borderRadius: '24px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              width: '100%',
              maxWidth: '540px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#006838', marginBottom: '8px' }}>
                처방전 코드 입력
              </h2>
              <p style={{ fontSize: '15px', color: '#666', marginBottom: '32px' }}>
                방문자의 처방 코드를 입력해주세요
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleLookup(); }}>
                <input
                  type="text"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="예: 연꽃의 해탈"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '20px',
                    fontSize: '22px',
                    borderRadius: '14px',
                    border: '2px solid #ddd',
                    textAlign: 'center',
                    marginBottom: '16px',
                    outline: 'none',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                  }}
                />
                {error && (
                  <p style={{ color: '#d32f2f', fontSize: '15px', marginBottom: '16px', fontWeight: 'bold' }}>
                    ⚠ {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!code.trim() || loading}
                  style={{
                    width: '100%',
                    padding: '18px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    background: code.trim() ? '#006838' : '#ddd',
                    color: 'white',
                    borderRadius: '14px',
                    cursor: code.trim() ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    border: 'none',
                  }}
                >
                  {loading ? '조회 중...' : '조회하기'}
                </button>
              </form>
            </div>
          ) : (
            /* ── Print Preview View ── */
            <div style={{ width: '100%', maxWidth: '1100px' }}>
              {/* Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                background: 'white',
                padding: '16px 24px',
                borderRadius: '14px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
              }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#006838', margin: 0 }}>
                    코드: {session.code}
                  </h2>
                  <p style={{ fontSize: '13px', color: '#888', margin: '4px 0 0' }}>
                    아래 미리보기를 확인 후 출력해주세요
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  {/* Size toggle */}
                  <select
                    value={printSize}
                    onChange={e => setPrintSize(e.target.value as typeof printSize)}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="A4-landscape">A4 가로</option>
                    <option value="A4-portrait">A4 세로</option>
                  </select>
                  <button
                    onClick={handlePrint}
                    style={{
                      padding: '12px 32px',
                      borderRadius: '10px',
                      background: '#006838',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(0,104,56,0.3)',
                    }}
                  >
                    🖨 프린트
                  </button>
                </div>
              </div>

              {/* Paper Preview */}
              <div style={{
                width: '100%',
                maxWidth: printSize === 'A4-landscape' ? '800px' : '560px',
                aspectRatio: printSize === 'A4-landscape' ? '297/210' : '210/297',
                background: 'white',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                margin: '0 auto',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #eee'
              }}>
                <div style={{ 
                  transform: `scale(${printSize === 'A4-landscape' ? 800/(297*3.7795) : 560/(210*3.7795)})`,
                  transformOrigin: 'center center'
                }}>
                  {prescription && (
                    <PrescriptionCard
                      code={session.code}
                      mbtiStr={session.mbtiStr}
                      prescription={prescription}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Print-only zone ─── */}
      <div className="kiosk-print-zone">
        {prescription && session && (
          <PrescriptionCard
            code={session.code}
            mbtiStr={session.mbtiStr}
            prescription={prescription}
          />
        )}
      </div>
    </>
  )
}
