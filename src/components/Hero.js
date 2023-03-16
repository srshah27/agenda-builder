import Image from "next/image"
import Link from "next/link"
import styles from "../styles/GradientBG.module.css"

function Hero() {
  return (
    <>
      <div className="hero min-h-screen" id="home">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            src="/img/trackv2.png"
            alt="track"
            width={380}
            height={380}
            className="max-w-sm"
          />
          <div className="text-center md:text-left font-mono  text-gray-50">
            <h1 className=" text-4xl md:text-6xl font-bold  text-blue-900">Welcome to Agenda Builder, Manage & Create Tasks Together.</h1>
            <p className="py-6 text-md md:text-2xl">Add tasks, deadlines and collaborate with your colleagues. Lets get oraganized together.</p>
            <button className="btn bg-blue-900 max-w-md"><Link href= "/login"> Get Started </Link> </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
