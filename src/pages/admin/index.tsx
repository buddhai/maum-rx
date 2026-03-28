import { useState, useEffect } from 'react'
import Head from 'next/head'
import StatsChart from '@/components/admin/StatsChart'

export default function AdminDashboard() {
  const [secret, setSecret] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchSessions = async (key: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/sessions?secret=${key}`)
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.message || '인증 실패')
      }
      
      setSessions(data.sessions)
      setIsAuthenticated(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSessions(secret)
  }

  const downloadCsv = () => {
    // Basic CSV Generation
    const headers = ['코드', 'MBTI', '고민', '이유', '생성일', '출력여부']
    const rows = sessions.map(s => [
      s.code,
      s.mbtiStr,
      s.concern,
      s.reason,
      new Date(s.createdAt).toLocaleString('ko-KR'),
      s.printed ? 'O' : 'X'
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.join(','))
    ].join('\n')

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }) // BOM for excel
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `마음처방전_데이터_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  // Auto refresh data every 30 seconds if authenticated
  useEffect(() => {
    if (!isAuthenticated) return
    const interval = setInterval(() => {
      fetchSessions(secret)
    }, 30000)
    return () => clearInterval(interval)
  }, [isAuthenticated, secret])

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '24px' }}>
        <Head><title>어드민 로그인</title></Head>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '48px', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', color: 'var(--dark)', marginBottom: '32px' }}>마음처방전 어드민</h1>
          <input 
            type="password" 
            value={secret}
            onChange={e => setSecret(e.target.value)}
            placeholder="관리자 비밀번호"
            style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '16px' }}
          />
          {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: 'var(--dark)', color: 'white', fontWeight: 'bold', borderRadius: '8px' }}>
            {loading ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    )
  }

  const printedCount = sessions.filter(s => s.printed).length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-color)', padding: '48px 24px' }}>
      <Head><title>어드민 대시보드</title></Head>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '28px', color: 'var(--dark)', fontWeight: 'bold' }}>마음처방전 대시보드</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => fetchSessions(secret)} style={{ padding: '10px 20px', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>새로고침</button>
            <button onClick={downloadCsv} style={{ padding: '10px 20px', background: 'var(--accent)', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>CSV 다운로드</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>총 참여자 수</p>
            <p style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--dark)' }}>{sessions.length}</p>
          </div>
          <div style={{ background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>현장 출력 완료</p>
            <p style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--sage)' }}>{printedCount}</p>
          </div>
        </div>

        {/* Charts */}
        <div style={{ marginBottom: '40px' }}>
          <StatsChart sessions={sessions} />
        </div>

        {/* Table */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontSize: '20px', color: 'var(--dark)', fontWeight: 'bold' }}>최근 발급 내역</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-color)', color: '#666', fontSize: '14px' }}>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>처방코드</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>MBTI</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>고민</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>이유</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>시간</th>
                  <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>출력상태</th>
                </tr>
              </thead>
              <tbody>
                {sessions.slice(0, 50).map(s => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 'bold', color: 'var(--dark)' }}>{s.code}</td>
                    <td style={{ padding: '16px 24px' }}>{s.mbtiStr}</td>
                    <td style={{ padding: '16px 24px' }}>{s.concern}</td>
                    <td style={{ padding: '16px 24px' }}>{s.reason}</td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: '#666' }}>{new Date(s.createdAt).toLocaleString('ko-KR')}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 'bold',
                        background: s.printed ? '#E8F5E9' : '#FFF0F0',
                        color: s.printed ? 'var(--dark)' : '#D32F2F'
                      }}>
                        {s.printed ? '출력완료' : '미출력'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sessions.length > 50 && (
              <div style={{ padding: '16px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                최근 50개만 표시됩니다. 전체 내역은 CSV를 다운로드하세요.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
