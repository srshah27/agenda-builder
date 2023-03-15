import Image from "next/image"
import Link from "next/link"
import GradientBG from "./GradientBG"

function Hero() {
  return (
    <>
      <section className="h-screen">
        <div className="flex justify-around items-center flex-wrap h-screen">
          <div className="">
            <h1>Welcome to Agenda Builder</h1>
          </div>
          <div className="">
            <Image
              src="/img/track.png"
              alt="track"
              width={400}
              height={400}
              className=""
              // className=" absolute right-32 top-36 hidden md:hidden lg:block"
              // width={440}
              // height={400}
            />
          </div>
        </div>
        <div className="text-gray-800 bottom-20 pl-44 text-xl font-mono bg-red-400">
          <span>
            Agenda Builder 101 <br />
          </span>
        </div>
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
