import GradientBG from "@/components/GradientBG"
import Hero from "@/components/Hero.js"
import Feature from "@/components/Feature"
import Use from "@/components/Use"
import Navbar from "@/components/NavbarDhara"
import Footer from "@/components/Footer"
import NewHero from "@/components/NewHero"
function Landing() {
  return (
    <>
      <Navbar />
      <GradientBG />
      <NewHero
        heading={"Welcome to Agenda Builder, Manage & Create Tasks Together"}
        content={
          "Add tasks, collaborate with your colleagues. Lets get oraganized together."
        }
      />
      {/* <Hero /> */}
      <Feature />
      <Use />
      <Footer />
    </>
  )
}

export default Landing
