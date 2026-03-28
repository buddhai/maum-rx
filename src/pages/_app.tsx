import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import localFont from 'next/font/local'

const pretendard = localFont({
  src: '../../public/fonts/Pretendard/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

const scDream = localFont({
  src: [
    { path: '../../public/fonts/SCoreDream/SCDream1.otf', weight: '100', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream2.otf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream3.otf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream4.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream5.otf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream6.otf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream7.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream8.otf', weight: '800', style: 'normal' },
    { path: '../../public/fonts/SCoreDream/SCDream9.otf', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-scdream',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>마음처방전</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <main className={`${pretendard.variable} ${scDream.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
