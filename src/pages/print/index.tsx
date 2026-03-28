import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function PrintIndex() {
  const [code, setCode] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim()) {
      router.push(`/print/${encodeURIComponent(code.trim())}`)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-color)',
      padding: '24px'
    }}>
      <Head>
        <title>마음처방전 현장 출력</title>
      </Head>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '48px',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '480px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '24px', color: 'var(--dark)', marginBottom: '32px' }}>처방전 출력하기</h1>
        
        <input 
          type="text" 
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="처방 코드를 입력하세요 (예: 연꽃의 해탈)"
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '18px',
            borderRadius: '12px',
            border: '2px solid var(--border)',
            marginBottom: '24px',
            textAlign: 'center'
          }}
        />

        <button 
          type="submit"
          disabled={!code.trim()}
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
            background: code.trim() ? 'var(--dark)' : 'var(--border)',
            color: 'white',
            borderRadius: '12px',
            transition: 'all 0.2s'
          }}
        >
          조회하기
        </button>
      </form>
    </div>
  )
}
