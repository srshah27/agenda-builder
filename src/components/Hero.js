import Image from "next/image"
import Link from "next/link"
import styles from "../styles/GradientBG.module.css"

function Hero() {
  return (
    <>
      <section className="w-4/5 mx-auto my-auto pt-40 flex flex-wrap h-screen">
        <div className="flex flex-col justify-center items-center flex-wrap py-4 lg:mb-32 mx-auto">
          <div className="">
            <h1 className="text-3xl text-center mb-4 text-blue-900 font-medium">
              Welcome to Agenda Builder
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
            <button className="btn w-full lg:w-auto m-2 bg-blue-900">SignUp</button>
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

        {/* <div className="text-blue-900 font-mono lg:text-justify text-center">
            <div className="text-[6vw] font-bold">
              Welcome to <br /> Agenda Builder!
            </div>
            <div className="text-[2vw] mt-4 text-gray-100">
              Add tasks, collaborate with your colleagues. <br /> Let&apos;s get
              oraganized together.
          </div> */}
        {/* <div className="max-w-full"> */}
        {/* <img src = "/img/track.png" alt="track" className="w-[35vw] h-[28vw]"/> */}
        {/* <Image
            src="/img/track.png"
            alt="track"
            width={380}
            height={380}
            className="max-w-full"
          /> */}
        {/* </div> */}
        {/* </div> */}
        {/* <div className="h-screen">
          <span>
            Agenda Builder 101 <br />
          </span>
        </div> */}
      </section>
      {/* <div className="md:pl-36 md:pt-52 pl-8 pt-48 text-blue-900 font-mono lg:text-justify text-center">
        <div className="text-4xl md:text-7xl font-bold">
          Welcome to <br /> Agenda Builder!
        </div>
        <div className="pt-8 text-2xl md:text-3xl font-mono lg:text-justify text-center">
          Add tasks and collaborate with your colleagues. <br /> Let&apos;s get
          oraganized together.
        </div>
        <input
          type="text"
          placeholder="Email"
          className="mt-8 input-lg w-96 h-12 rounded-md border-gray-300 border-2 bg-gray-50 "
        />
        <button className="btn-active w-40 h-12 rounded-md mx-8 font-bold bg-blue-900 text-gray-50">
          <Link href="/signup"> Sign Up </Link>
        </button>
      </div> */}

      {/* <div className='h-1/3'> */}

      {/* </div> */}
      {/* <Image fill alt="public/svg/waves.svg" src="/mountains.jpg" sizes="100vw" /> */}
      {/* <div className="h-screen top-auto w-screen"></div> */}
    </>
  )
}

export default Hero
