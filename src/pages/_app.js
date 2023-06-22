import '@/styles/globals.tail.css'
import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MultiSelectTheme } from 'chakra-multiselect'
import { wrapper } from '@/store/store'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})


const App = ({ Component, pageProps, session }) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <NextNProgress
          color="#0079bf"
          startPosition={0.3}
          stopDelayMs={100}
          height={6}
        />
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default wrapper.withRedux(App)
