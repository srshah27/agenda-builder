import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps, session }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <SessionProvider session={session}>
          <NextNProgress
            color="#0079bf"
            startPosition={0.3}
            stopDelayMs={200}
            height={4}
          />
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </ChakraProvider>
  )
}
