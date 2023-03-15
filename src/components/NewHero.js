import Image from "next/image"

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
          <h1 className="text-5xl max-w-lg font-thin text-white text-center lg:text-start leading-snug">{heading}</h1>
          <p className="py-6 text-center">{content}</p>
          <button className="btn btn-primary max-w-md">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default NewHero
