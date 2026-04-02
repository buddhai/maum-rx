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
      <div className="kiosk-screen min-h-screen bg-[#FDFDFB] flex flex-col font-pretendard">
        {/* Top bar: Immersive Dark Green */}
        <div style={{
          background: '#006838',
          color: 'white',
          padding: '24px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '900', opacity: 0.6, letterSpacing: '2px', marginBottom: '4px' }}>2026 SEOUL INTERNATIONAL BUDDHISM EXPO</div>
            <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0, letterSpacing: '-0.5px' }}>마음처방전 현장 출력 키오스크</h1>
          </div>
          {session && (
            <button onClick={handleReset} style={{
              padding: '12px 28px',
              borderRadius: '30px',
              border: '1.5px solid rgba(255,255,255,0.3)',
              background: 'transparent',
              color: 'white',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}>
              ← 다른 코드 조회
            </button>
          )}
        </div>

        {/* Main content */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}>
          {!session ? (
            /* ── Code Input View: Premium & Minimal ── */
            <div style={{
              background: 'white',
              padding: '80px 60px',
              borderRadius: '40px',
              boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
              width: '100%',
              maxWidth: '640px',
              textAlign: 'center',
              border: '1px solid #F0F0F0'
            }}>
              <div style={{ width: '80px', height: '80px', background: '#F0F7F3', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '32px' }}>🌿</div>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#006838', marginBottom: '12px', letterSpacing: '-1px' }}>
                처방전 코드 입력
              </h2>
              <p style={{ fontSize: '16px', color: '#888', marginBottom: '48px', fontWeight: '500' }}>
                모바일에서 받은 4자리의 &apos;마음 한 장&apos; 코드를 입력해주세요.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleLookup(); }} style={{ textAlign: 'left' }}>
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                  <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="예: 지혜의 보살"
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '24px',
                      fontSize: '32px',
                      borderRadius: '24px',
                      border: '2.5px solid #E8E8E8',
                      textAlign: 'center',
                      outline: 'none',
                      fontWeight: '900',
                      color: '#006838',
                      transition: 'all 0.3s ease',
                      backgroundColor: '#FAFAF9'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#006838'}
                    onBlur={(e) => e.target.style.borderColor = '#E8E8E8'}
                  />
                </div>
                {error && (
                  <p style={{ color: '#E53E3E', fontSize: '15px', marginBottom: '24px', textAlign: 'center', fontWeight: '700' }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!code.trim() || loading}
                  style={{
                    width: '100%',
                    padding: '22px',
                    fontSize: '20px',
                    fontWeight: '900',
                    background: code.trim() ? '#006838' : '#D1D5DB',
                    color: 'white',
                    borderRadius: '24px',
                    cursor: code.trim() ? 'pointer' : 'default',
                    transition: 'all 0.2s',
                    border: 'none',
                    boxShadow: code.trim() ? '0 8px 30px rgba(0,104,56,0.2)' : 'none'
                  }}
                >
                  {loading ? '데이터를 가져오는 중...' : '처방전 확인하기'}
                </button>
              </form>
            </div>
          ) : (
            /* ── Print Preview View: Immersive Gallery Mode ── */
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', gap: '40px', alignItems: 'start' }}>
              
              {/* Sidebar Controls */}
              <div style={{ width: '320px', background: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #F0F0F0', flexShrink: 0 }}>
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#006838', opacity: 0.5, marginBottom: '8px' }}>TARGET CODE</div>
                  <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#006838', margin: 0, letterSpacing: '-1px' }}>
                    {session.code}
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: '#666', marginBottom: '10px' }}>인쇄 용지 설정</label>
                    <select
                      value={printSize}
                      onChange={e => setPrintSize(e.target.value as typeof printSize)}
                      style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '16px',
                        border: '2px solid #F0F0F0',
                        fontSize: '16px',
                        fontWeight: '600',
                        backgroundColor: '#FAFAFA',
                        cursor: 'pointer',
                        outline: 'none'
                      }}
                    >
                      <option value="A4-landscape">A4 가로 (수평)</option>
                      <option value="A4-portrait">A4 세로 (수직)</option>
                    </select>
                  </div>

                  <button
                    onClick={handlePrint}
                    style={{
                      marginTop: '16px',
                      width: '100%',
                      padding: '24px',
                      borderRadius: '20px',
                      background: '#006838',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0,104,56,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px'
                    }}
                  >
                    <span>🖨️</span> 지금 바로 출력하기
                  </button>
                  
                  <p style={{ fontSize: '13px', color: '#AAA', textAlign: 'center', lineHeight: '1.5' }}>
                    * 출력하기 버튼을 누르면 용지함 1번에서<br/>처방전이 자동으로 인쇄됩니다.
                  </p>
                </div>
              </div>

              {/* High-Fidelity Preview Area */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px', opacity: 0.4 }}>
                  <span style={{ fontSize: '14px', fontWeight: '900' }}>REAL-TIME PRINT PREVIEW</span>
                  <div style={{ width: '40px', height: '1px', background: '#000' }}></div>
                </div>
                
                <div style={{
                  width: '100%',
                  background: '#EAEAE2',
                  padding: '40px',
                  borderRadius: '32px',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    boxShadow: '0 30px 100px rgba(0,0,0,0.2)',
                    // 피그마 디자인(842px)을 화면 크기에 맞게 스케일링
                    transform: `scale(${printSize === 'A4-landscape' ? 0.95 : 0.7})`,
                    transformOrigin: 'center center',
                    backgroundColor: 'white'
                  }}>
                    {prescription && (
                      <PrescriptionCard
                        code={session.code}
                        mbtiStr={session.mbtiStr}
                        prescription={prescription}
                        concern={session.concern}
                        reason={session.reason}
                        aiLine={session.aiLine}
                        mode="print"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Print-only zone: Fixed 842x595 output ─── */}
      <div className="kiosk-print-zone">
        {prescription && session && (
          <PrescriptionCard
            code={session.code}
            mbtiStr={session.mbtiStr}
            prescription={prescription}
            concern={session.concern}
            reason={session.reason}
            aiLine={session.aiLine}
            mode="print"
          />
        )}
      </div>
    </>
  )
}
