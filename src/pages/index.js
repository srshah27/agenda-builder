import GradientBG from '@/components/Landing/GradientBG'
import Hero from '@/components/Landing/Hero.js'
import Feature from '@/components/Landing/Feature'
import Use from '@/components/Landing/Use'
import Navbar from '@/components/Landing/Navbar'
import Footer from '@/components/Landing/Footer'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
// import {login} from '@/store/userSlice'
import store from '@/store/store'

export default function Home({ sess }) {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  console.log(session);
  
  if(session) {
    dispatch(login({
      uid: session.user.uid,
      name: session.user.name,
      image: session.user.image,
      email: session.user.email,
    }))
  }
  
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      <Feature />
      <Use />
      <Footer />
    </div>
  )
}
