import Head from 'next/head'
import Link from 'next/link'
import MobileLayout from '@/components/MobileLayout'
import Image from 'next/image'

export default function Home() {
  return (
    <MobileLayout>
      <Head>
        <title>마음처방전, 선명상(SEON MEDITATION)</title>
        <meta name="description" content="나만의 불교 명상/차/인센스 처방받기" />
        <meta property="og:title" content="마음처방전, 선명상(SEON MEDITATION)" />
        <meta property="og:description" content="나만의 불교 명상/차/인센스 처방받기" />
      </Head>

      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', overflow: 'hidden' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '375px', 
          aspectRatio: '375/812',
          height: 'auto',
          maxHeight: '100vh'
        }}>
          <Image 
            src="/landing.svg" 
            alt="마음처방전 랜딩페이지" 
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
          
          {/* Invisible interactive button layer explicitly positioned over the SVG's drawn button */}
          <Link href="/quiz" passHref legacyBehavior>
            <a style={{
              position: 'absolute',
              left: '2.66%',      /* (10 / 375) * 100 */
              top: '83.99%',      /* (682 / 812) * 100 */
              width: '94.66%',    /* (355 / 375) * 100 */
              height: '7.38%',    /* (60 / 812) * 100 */
              cursor: 'pointer',
              zIndex: 10,
              WebkitTapHighlightColor: 'transparent', // removes blue flash on mobile
              outline: 'none'
            }}
            aria-label="처방 받기 시작" />
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}
