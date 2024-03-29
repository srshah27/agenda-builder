import '@/styles/globals.tail.css'
import { SessionProvider } from 'next-auth/react'
import NextNProgress from 'nextjs-progressbar'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { MultiSelectTheme } from 'chakra-multiselect'
import store from '@/store/store'
import { Provider } from 'react-redux'
import localFont from 'next/font/local'

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme
  }
})

const cabinet = localFont({
  src: '../../public/fonts/cabinet/WEB/fonts/CabinetGrotesk-Regular.ttf'
  // variable: "--font-supreme",
})

const App = ({ Component, pageProps, session }) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <NextNProgress
            color="#0079bf"
            startPosition={0.3}
            stopDelayMs={100}
            height={6}
          />
          <main className={`${cabinet.className}`}>
            <Component {...pageProps} />
          </main>
        </SessionProvider>
      </ChakraProvider>
    </Provider>
  )
}

export default App
// export default wrapper.withRedux(App)
