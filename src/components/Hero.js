import Image from "next/image"
import Link from "next/link"
import styles from "../styles/GradientBG.module.css"

function Hero() {
  return (
    <>
      <section className="w-4/5 mx-auto my-auto pt-40 flex flex-wrap h-screen">
        <div className="flex justify-center items-center flex-wrap py-4 lg:mb-32 mx-auto max-w-md">
          <div className="">
            <h1 className="text-3xl text-center mb-4 text-blue-900 font-medium">
              Welcome to Agenda Builder, Manage & Create Tasks Together
            </h1>
            <p className="text-white text-center mb-6">
              Add tasks, collaborate with your colleagues. Lets get oraganized
              together.
            </p>
          </div>
          <div className="flex justify-center flex-col lg:flex-row">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-80 m-2 hidden lg:block"
            />
            <button className="btn w-full lg:w-auto m-2 bg-blue-900">
              SignUp
            </button>
          </div>
        </div>
        <div className="mx-auto mt-4 justify-around">
          <Image
            src="/img/track.png"
            alt="track"
            width={350}
            height={300}
            className=""
          />
        </div>
      </section>
    </>
  )
}

export default Hero
