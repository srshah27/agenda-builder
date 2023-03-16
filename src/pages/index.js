import GradientBG from "@/components/GradientBG"
import Hero from "@/components/home/Hero.js"
import Feature from "@/components/home/Feature"
import Use from "@/components/home/Use"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { useSession, getSession, signOut } from "next-auth/react"

export default function Home({ sess }) {
  const { data: session, status } = useSession()
  console.log(sess)
  console.log(session)
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

export async function getServerSideProps(context) {
  let session = await getSession(context)
  return {
    props: {
      sess: session,
    },
  }
}
