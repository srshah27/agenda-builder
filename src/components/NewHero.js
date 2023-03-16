import Image from "next/image"
import Link from "next/link"

const NewHero = ({ heading, content }) => {
  return (
    <div className="hero min-h-screen bg-opacity-20 bg-gray-400 mt-12 lg:mt-auto">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-around gap-12">
        <Image
          src="/img/track.png"
          width={500}
          height={500}
          className="rounded-lg"
        />
        <div className="flex flex-col items-center">
          <h1 className="md:text-5xl text-3xl max-w-lg text-white text-center lg:text-start leading-snug font-mono font-bold">{heading}</h1>
          <p className="py-6 text-center text-2xl">{content}</p>
          <button className="btn btn-primary max-w-md"> <Link href= "/login"> Get Started </Link> </button>
        </div>
      </div>
    </div>
  )
}

export default NewHero
