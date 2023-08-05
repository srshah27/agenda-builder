import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useSession, signOut } from 'next-auth/react'
import agendaImage from '../../../public/svg/agenda.svg'

function Navbar() {
  const { data: session } = useSession()
  const [navbar, setNavbar] = useState(false)

  return (
    <nav className="z-100 fixed top-0 left-0 h-14 w-full bg-white shadow-lg">
      <div className="mx-4 justify-between md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div className="left-0 items-center py-3 sm:inline-block ">
          <Link href="/">
            <Image
              src={agendaImage}
              alt="Agenda Builder Logo"
              className="h-8 object-contain object-left"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="btn absolute right-8 top-4" //rounded-md outline-none focus:border-gray-400 focus:border
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <IoClose className=" text-primary  ml-[480px] h-6 w-6" />
              ) : (
                <HiMenu className="text-primary ml-[480px] h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div>
          <div
            className={`flex-1  md:block   ${
              navbar ? 'block md:p-0' : 'hidden'
            }`}
          >
            <ul className="mt-20 h-[50vh] items-center justify-center md:mt-0 md:flex md:h-auto">
              <li className="text-neutral border-primary md:hover:text-primary right-[23rem] border-b-2  py-2  px-6   text-center  text-xl md:absolute md:border-b-0 md:hover:underline">
                <Link href="#home" onClick={() => setNavbar(!navbar)}>
                  Home
                </Link>
              </li>
              <li className="text-neutral text-primary-6 border-primary md:hover:text-primary right-52  border-b-2 py-2  text-center  text-xl md:absolute md:border-b-0 md:hover:underline">
                <Link href="#footer" onClick={() => setNavbar(!navbar)}>
                  About
                </Link>
              </li>
              <li className="text-neutral border-primary md:hover:text-primary right-64 border-b-2  py-2 px-6  text-center  text-xl md:absolute md:border-b-0 md:hover:underline">
                <Link href="#footer" onClick={() => setNavbar(!navbar)}>
                  Contacts
                </Link>
              </li>
              <li className="text-neutral right-5 py-2 px-6 text-center text-xl md:absolute">
                {!session ? (
                  <button className="btn text md:bg-neutral rounded-md md:text-gray-50 md:hover:bg-blue-900">
                    <Link href="/signup"> Sign Up </Link>
                  </button>
                ) : (
                  <button
                    className="btn text md:bg-neutral h-12 w-32 rounded-md md:text-gray-50 md:hover:bg-blue-900 "
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
