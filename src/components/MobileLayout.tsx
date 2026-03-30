import Head from 'next/head'
import { ReactNode } from 'react'

interface MobileLayoutProps {
  children: ReactNode
  title?: string
  bg?: string
}

export default function MobileLayout({ children, title = "마음처방전", bg = "var(--surface)" }: MobileLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="layout-wrapper" style={{ backgroundColor: "var(--bg-color)", minHeight: "100vh" }}>
        <main className="mobile-container" style={{ 
          maxWidth: "480px", 
          margin: "0 auto", 
          backgroundColor: bg,
          minHeight: "100vh",
          position: "relative",
          boxShadow: "0 0 20px rgba(0,0,0,0.05)",
          zoom: 0.9
        } as React.CSSProperties}>
          {children}
        </main>
      </div>
    </>
  )
}
