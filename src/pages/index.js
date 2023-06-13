import GradientBG from '@/components/Landing/GradientBG'
import Hero from '@/components/Landing/Hero.js'
import Feature from '@/components/Landing/Feature'
import Use from '@/components/Landing/Use'
import Navbar from '@/components/Landing/Navbar'
import Footer from '@/components/Landing/Footer'

export default function Home({ sess }) {
  return (
    <div className='flex flex-col'>
      <Navbar />
      <Hero />
      <Feature />
      <Use />
      <Footer />
    </div>
  )
}
