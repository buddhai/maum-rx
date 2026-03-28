import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js'
import { CONCERN_LABELS, REASON_LABELS } from '@/lib/prescriptions'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

interface StatsChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sessions: any[]
}

export default function StatsChart({ sessions }: StatsChartProps) {
  // Aggregate data
  const concernCounts: Record<string, number> = {}
  const reasonCounts: Record<string, number> = {}
  const mbtiCounts: Record<string, number> = {}

  sessions.forEach(s => {
    concernCounts[s.concern] = (concernCounts[s.concern] || 0) + 1
    reasonCounts[s.reason] = (reasonCounts[s.reason] || 0) + 1
    mbtiCounts[s.mbtiStr] = (mbtiCounts[s.mbtiStr] || 0) + 1
  })

  // Colors based on design
  const colors = [
    '#006837', '#F8B54A', '#4A6B4E', '#8BB590', '#F2D7B6', '#2C1E0F'
  ]

  const concernData = {
    labels: Object.keys(concernCounts).map(k => CONCERN_LABELS[k as keyof typeof CONCERN_LABELS]),
    datasets: [{
      data: Object.values(concernCounts),
      backgroundColor: colors,
      borderWidth: 0,
    }]
  }

  const reasonData = {
    labels: Object.keys(reasonCounts).map(k => REASON_LABELS[k as keyof typeof REASON_LABELS]),
    datasets: [{
      data: Object.values(reasonCounts),
      backgroundColor: colors,
      borderWidth: 0,
    }]
  }
  
  // Sort MBTI by count descending
  const sortedMbti = Object.entries(mbtiCounts).sort((a, b) => b[1] - a[1])

  const mbtiData = {
    labels: sortedMbti.map(x => x[0]),
    datasets: [{
      label: '참여자 수',
      data: sortedMbti.map(x => x[1]),
      backgroundColor: '#006837',
      borderRadius: 4,
    }]
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--dark)', marginBottom: '16px', textAlign: 'center' }}>고민 분포</h3>
        <div style={{ height: '240px', display: 'flex', justifyContent: 'center' }}>
          <Doughnut data={concernData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--dark)', marginBottom: '16px', textAlign: 'center' }}>이유 분포</h3>
        <div style={{ height: '240px', display: 'flex', justifyContent: 'center' }}>
          <Doughnut data={reasonData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize: '16px', color: 'var(--dark)', marginBottom: '16px', textAlign: 'center' }}>MBTI 유형 분포 (Top)</h3>
        <div style={{ height: '240px' }}>
          <Bar 
            data={mbtiData} 
            options={{ 
              maintainAspectRatio: false,
              plugins: { 
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: (context: any) => {
                      const label = context.label || ''
                      const value = context.raw || 0
                      return `${label}: ${value}명`
                    }
                  }
                }
              },
              scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
            }} 
          />
        </div>
      </div>
    </div>
  )
}
