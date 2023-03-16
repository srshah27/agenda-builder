import GradientBG from "@/components/GradientBG"
import Hero from "@/components/home/Hero.js"
import Feature from "@/components/home/Feature"
import Use from "@/components/home/Use"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Home({ sess }) {
  return (
    <>
      <Navbar />
      <GradientBG />
      <Hero />
      <Feature />
      <Use />
      <Footer />
    </>
  )
}
