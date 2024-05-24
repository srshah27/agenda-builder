import Image from 'next/image'
import Link from 'next/link'
import TrelloHero from '../../../public/img/Trello.webp'
import AnimateBG from './AnimateBG'

function Hero() {
  return (
    <div
      className="flex w-screen flex-col bg-gradient-to-br from-[#aec6f6] via-[#faf6f7] to-[#aec6f6] supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]"
      id="home"
    >
      <div className="relative flex flex-1 flex-col justify-center px-5 pt-8 text-[#FE7600] dark:text-[#f0e438] md:px-6 md:py-[22px] lg:px-8">
        <nav className="absolute left-0 top-8 flex w-full px-6 md:top-[22px] md:px-6 lg:px-8">
          <h1>
            <div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px]">
              Agenda Builder
            </div>
          </h1>
        </nav>
        <div className="flex-col text-center text-[32px] leading-[1.2] md:flex md:text-left md:text-[40px]">
          <h1 className="font-extrabold text-[#FE7600] dark:text-[#f0e438]">
            Welcome to Agenda Builder
          </h1>
          <p className="py-6 text-base font-semibold text-gray-500 md:text-lg lg:text-xl">
            Simple & straightforward project management tool based on what
            really matters the most. Your goals.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center rounded-t-[30px] bg-white px-5 py-8 text-black dark:bg-black dark:text-white md:rounded-none md:px-6">
        <Image
          src={TrelloHero}
          alt="An Illustration of persons working on computers"
          className="hidden lg:block lg:max-w-sm"
          priority={true}
        />
        <h2 className="text-center text-[20px] font-semibold leading-[1.2] md:text-[32px] md:leading-[1.25]">
          Get Started
        </h2>
        <div className="mt-5 w-full max-w-[440px]">
          <div className="grid grid-cols-2 gap-x-3">
            <Link
              href="/u"
              passHref
              className="relative flex h-12 items-center justify-center rounded-md bg-[#3C46FF] text-center text-base font-medium text-[#fff] hover:bg-[#0000FF]"
            >
              <button>
                <div className="relative -top-[1px]">Log in</div>
              </button>
            </Link>
            <Link
              href="/signup"
              passHref
              className="relative flex h-12 items-center justify-center rounded-md bg-[#3C46FF] text-center text-base font-medium text-[#fff] hover:bg-[#0000FF]"
            >
              <button>
                <div className="relative -top-[1px]">Sign up</div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
