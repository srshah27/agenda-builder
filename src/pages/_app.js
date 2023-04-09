import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import { ChakraProvider } from '@chakra-ui/react'
import localFont from '@next/font/local'
import Head from 'next/head'

const myFont = localFont({ src: '../../public/Fonts/GeneralSans_Complete/GeneralSans_Complete/Fonts/Variable/GeneralSans-Variable.ttf' })

export default function App({ Component, pageProps, session }) {
  <Head>
    <link href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600,400,700&display=swap" rel="stylesheet"></link>
  </Head>
  return (
    // <ChakraProvider>
    <SessionProvider session={session}>
      <NextNProgress
        color="#0079bf"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
      />
      <main className='myFont.className'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
    // </ChakraProvider>
  )
}
