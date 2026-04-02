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
    <div className="min-h-screen bg-[#006938] text-white font-scdream overflow-hidden flex flex-col">
      <Head>
        <title>마음처방전 키오스크 | 현장 출력</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <style>{`
        @media print {
          @page {
            size: ${printSize === 'A4-landscape' ? 'A4 landscape' : 'A4 portrait'};
            margin: 0;
          }
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
          }
          .kiosk-screen { display: none !important; }
          .kiosk-print-zone { display: block !important; }
        }
        @media screen {
          .kiosk-print-zone { display: none; }
        }
      `}</style>

      {/* ─── Screen UI ─── */}
      <div className="kiosk-screen flex-1 flex flex-col relative">
        {/* Background Graphic */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="10" cy="10" r="20" fill="white" />
            <circle cx="90" cy="90" r="30" fill="white" />
          </svg>
        </div>

        {/* Global Toolbar */}
        <header className="p-8 pb-0 flex justify-between items-center z-10">
          <div className="flex flex-col">
            <h1 className="text-[28px] font-black tracking-tight leading-none mb-2">
              마음처방전 <span className="opacity-50 text-[18px]">KIOSK V2</span>
            </h1>
            <p className="text-[14px] opacity-60">2026 서울국제불교박람회 | 선명상축제</p>
          </div>
          {session && (
            <button 
              onClick={handleReset}
              className="px-6 py-3 rounded-full border border-white border-opacity-30 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all font-bold"
            >
              ← 처음으로 돌아가기
            </button>
          )}
        </header>

        <main className="flex-1 flex items-center justify-center p-8 z-10">
          {!session ? (
            /* ── Lookup View ── */
            <div className="w-full max-w-[600px] bg-white rounded-[40px] p-16 shadow-[0_20px_80px_rgba(0,0,0,0.2)] text-center animate-fade-in">
              <div className="w-20 h-20 bg-[#F0F5F2] rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl text-[#006938]">🔍</span>
              </div>
              <h2 className="text-[32px] font-black text-[#006938] mb-4">처방 코드 조회</h2>
              <p className="text-[#666] text-[16px] mb-10 leading-relaxed break-keep">
                모바일에서 발급받으신 4단어 처방 코드를<br/>아래 입력 칸에 정확히 입력해 주세요.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleLookup(); }} className="flex flex-col gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="예: 연꽃의 해탈"
                    autoFocus
                    className="w-full bg-[#F5F7F6] border-2 border-transparent focus:border-[#006938] transition-all p-6 text-[24px] font-black text-[#006938] rounded-[24px] text-center placeholder:opacity-20 placeholder:text-[#006938] outline-none"
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-[16px] font-bold text-[15px] animate-pulse">
                    ⚠ {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={!code.trim() || loading}
                  className={`w-full p-6 rounded-[24px] text-[20px] font-black transition-all ${
                    code.trim() 
                      ? 'bg-[#006938] text-white shadow-lg shadow-[#00693844] hover:scale-[1.02] active:scale-[0.98]' 
                      : 'bg-[#eee] text-[#ccc]'
                  }`}
                >
                  {loading ? '처방전 찾는 중...' : '처방전 불러오기'}
                </button>
              </form>
            </div>
          ) : (
            /* ── Preview View ── */
            <div className="w-full max-w-[1200px] flex flex-col gap-6 animate-fade-in">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-[32px] p-6 flex justify-between items-center border border-white border-opacity-10 shadow-xl">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-3 py-1 bg-white text-[#006938] rounded-full text-[12px] font-black">PRESCRIPTION FOUND</span>
                    <h2 className="text-[24px] font-black">{session.code}</h2>
                  </div>
                  <p className="text-[14px] opacity-70">A4 가로 모드로 인쇄할 준비가 되었습니다.</p>
                </div>
                
                <div className="flex gap-4">
                  <select
                    value={printSize}
                    onChange={e => setPrintSize(e.target.value as typeof printSize)}
                    className="bg-white bg-opacity-10 border border-white border-opacity-20 text-white p-4 rounded-[20px] font-bold outline-none cursor-pointer hover:bg-opacity-20 transition-all"
                  >
                    <option value="A4-landscape" className="text-black">A4 가로 (표준)</option>
                    <option value="A4-portrait" className="text-black">A4 세로</option>
                  </select>
                  
                  <button
                    onClick={handlePrint}
                    className="bg-white text-[#006938] px-10 py-4 rounded-[20px] text-[20px] font-black shadow-lg hover:bg-[#F0F5F2] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                  >
                    <span>🖨</span> 프린트하기
                  </button>
                </div>
              </div>

              {/* Preview Container */}
              <div className="flex-1 bg-white bg-opacity-5 rounded-[40px] p-12 flex items-center justify-center border border-white border-opacity-5 relative overflow-hidden">
                <div className="absolute top-4 left-4 text-[10px] font-bold opacity-30 tracking-widest uppercase">Paper Preview (Screen Only)</div>
                <div style={{ 
                  transform: `scale(${printSize === 'A4-landscape' ? 0.7 : 0.5})`,
                  transformOrigin: 'center center',
                  boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
                }} className="bg-white shadow-2xl">
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
          )}
        </main>
        
        <footer className="p-8 opacity-40 text-[12px] flex justify-between">
          <p>© 2026 SEOUL INTERNATIONAL BUDDHISM EXPO</p>
          <p>MAUM-RX OFFICE</p>
        </footer>
      </div>

      {/* ─── Print Zone ─── */}
      <div className="kiosk-print-zone bg-white">
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
    </div>
  )
}
