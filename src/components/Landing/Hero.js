import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import TrelloHero from '../../../public/img/Trello.webp'
import AnimateBG from './AnimateBG'

function Hero() {
  return (
    <div className="container mt-16 h-screen" id="home">
      <div className="flex h-[calc(100svh-64px)] flex-col items-center lg:flex lg:flex-row-reverse lg:justify-around">
        <AnimateBG top={100} right={200} />
        <Image
          src={TrelloHero}
          alt="An Illustration of persons working on computers"
          className="max-w-md p-4 lg:max-w-xl lg:p-12"
          priority={true}
        />
        <div className="max-w-[50%] text-center md:text-left">
          <h1 className="font-serif text-4xl text-gray-800 md:text-6xl">
            Get aligned around your goals
          </h1>
          <p className="text-md py-6 text-gray-500 md:text-2xl">
            Simple & straightforward project management tool based on what
            really matters the most. Your goals.
          </p>
          <Link href="/u">
            <button className="btn max-w-md bg-blue-900"> Get Started </button>
          </Link>{' '}
        </div>
      </div>
    </div>
  )
}

export default Hero
