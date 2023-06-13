import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import TrelloHero from '../../../public/img/Trello.webp'
import AnimateBG from './AnimateBG'


function Hero() {
  return (
    <>
      <div className="container mt-16 h-screen" id="home">
        <div className='flex flex-col h-[calc(100svh-64px)] items-center lg:flex lg:flex-row-reverse lg:justify-around'>
        <div className='relative'>
          <AnimateBG />
        </div>
          <Image
            src={TrelloHero}
            alt="An Illustration of persons working on computers"
            className="max-w-sm p-12"
            priority={true}
          />
          <div className="text-center max-w-[50%] md:text-left">
            <h1 className="text-gray-800 text-4xl md:text-6xl font-serif">
              Get aligned around your goals
            </h1>
            <p className="text-gray-500 py-6 text-md md:text-2xl">
              Simple & straightforward project management tool based on what really matters the most. Your goals.
            </p>
            <Link href='/u'>
              <button className="btn bg-blue-900 max-w-md">
                {' '}
                Get Started{' '}
              </button>
            </Link>{' '}
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
