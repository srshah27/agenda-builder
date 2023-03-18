import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import store from '@/redux/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps, session }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}
