import '@/styles/globals.tail.css'
import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'


export default function App({ Component, pageProps, session }) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <NextNProgress
          color="#0079bf"
          startPosition={0.3}
          stopDelayMs={200}
          height={4}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}
