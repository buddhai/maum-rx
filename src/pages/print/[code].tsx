import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PrescriptionCard from '@/components/PrescriptionCard'
import { getRxByCode } from '@/lib/db'
import { PRESCRIPTIONS } from '@/lib/prescriptions'
import type { Concern, Reason } from '@/lib/prescriptions'

interface PrintPreviewProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any | null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params as { code: string }
  
  try {
    const session = await getRxByCode(code)
    if (!session) {
      return { props: { session: null } }
    }
    
    // Serialize object for Next.js props
    const serializedSession = {
      ...session,
      id: session.id || null, // in db.ts getPrescriptionSession, id is added?
      createdAt: session.createdAt?.getTime ? session.createdAt.getTime() : Date.now()
    }
    
    return { props: { session: serializedSession } }
  } catch {
    return { props: { session: null } }
  }
}

export default function PrintPreview({ session }: PrintPreviewProps) {
  const router = useRouter()
  const [printing, setPrinting] = useState(false)
  const [markedPrinted, setMarkedPrinted] = useState(false)

  // Auto-redirect if not found
  useEffect(() => {
    if (!session) {
      alert("코드에 해당하는 처방전이 없습니다.")
      router.push('/print')
    }
  }, [session, router])

  if (!session) return null

  const prescription = PRESCRIPTIONS[session.concern as Concern]?.[session.reason as Reason]

  const handlePrint = async () => {
    setPrinting(true)
    
    // Optional: Mark as printed before showing dialog if it's reliable
    if (!markedPrinted) {
      try {
        await fetch(`/api/rx/${encodeURIComponent(session.code)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ printed: true })
        })
        setMarkedPrinted(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to update print status", err)
      }
    }

    // Trigger browser print
    setTimeout(() => {
      // Check for Fully Kiosk Browser (for silent printing in kiosk mode)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).fully && (window as any).fully.print) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).fully.print();
      } else {
        window.print();
      }
      setPrinting(false)
    }, 500)
  }

  return (
    <>
      <Head>
        <title>인쇄: {session.code}</title>
      </Head>

      {/* Screen View Container */}
      <div className="no-print" style={{ 
        minHeight: '100vh', 
        background: '#e0e0e0', // Darker background to contrast white paper
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px'
      }}>
        
        {/* Toolbar */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          background: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h1 style={{ fontSize: '20px', color: 'var(--dark)', fontWeight: 'bold' }}>출력 대기 중: {session.code}</h1>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>A4 가로 (297×210mm) 용지로 출력됩니다.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => router.push('/print')}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'white',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              취소
            </button>
            <button
              onClick={handlePrint}
              disabled={printing}
              style={{
                padding: '12px 32px',
                borderRadius: '8px',
                background: 'var(--dark)',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              프린트 시작
            </button>
          </div>
        </div>

        {/* Paper Preview */}
        <div style={{
          width: '297mm',          // A4 Long edge
          height: '210mm',         // A4 Short edge
          background: 'white',
          boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
          pointerEvents: 'none',   // Prevent interaction on preview
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'scale(0.6)', // Preview scaling for tablet screen
          transformOrigin: 'top center'
        }}>
          {prescription && (
            <PrescriptionCard
              code={session.code}
              mbtiStr={session.mbti}
              prescription={prescription}
            />
          )}
        </div>
      </div>

      {/* Actual Print Zone - Only visible during print */}
      <style>{`
        @media screen {
          .print-only { display: none; }
        }
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0;
            padding: 0;
          }
          .print-only { 
            display: block; 
            width: 297mm;
            height: 210mm;
            page-break-after: avoid;
            page-break-inside: avoid;
            overflow: hidden;
          }
          .no-print { display: none !important; }
        }
      `}</style>
      
      <div className="print-only">
        {prescription && (
          <PrescriptionCard
            code={session.code}
            mbtiStr={session.mbti}
            prescription={prescription}
          />
        )}
      </div>
    </>
  )
}
