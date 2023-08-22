import Hero from '@/components/Landing/Hero.js'
import Feature from '@/components/Landing/Feature'
import Use from '@/components/Landing/Use'
import Navbar from '@/components/Landing/Navbar'
import Footer from '@/components/Landing/Footer'
import { getSession } from 'next-auth/react'

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/u',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
