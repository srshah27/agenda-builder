import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
// import menu from '../../public/svg/menu.svg'
// import close from '../../public/svg/close.svg'
import {HiMenu} from 'react-icons/hi'
import {IoClose} from 'react-icons/io5'
function Navbar() {
  const [navbar, setNavbar] = useState(false)
  return (
    <>
      <nav className="w-full bg-slate-50 opacity-80 fixed top-0 left-0 z-10 ">
        <div className="justify-between  mx-4 lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center py-3 md:py-4 md:block left-0 ">
              <Link href="/">
                <Image
                  src="/svg/agenda.svg"
                  width={200}
                  height={200}
                  alt="logo"
                />
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 right-0 " //rounded-md outline-none focus:border-gray-400 focus:border
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <IoClose className="text-primary  w-6 h-6 ml-[480px]" />
                    // <Image src={close} width={40} height={30} alt="logo" />
                  ) : (
                    // <Image
                    //   src={menu}
                    //   width={30}
                    //   height={30}
                    //   alt="logo"
                    //   className="focus:border-none active:border-none"
                    // />
                    <HiMenu className="text-primary w-6 h-6 ml-[480px]" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex font-mono">
                <li className=" text-xl text-neutral py-2 md:px-6 text-center border-b-2  md:border-b-0  border-primary  md:hover:text-primary ">
                  <Link href="#about" onClick={() => setNavbar(!navbar)}>
                    About
                  </Link>
                </li>
                <li className="text-xl text-neutral py-2 px-6 text-center  border-b-2  md:border-b-0   border-primary  md:hover:text-primary">
                  <Link href="#blog" onClick={() => setNavbar(!navbar)}>
                    Blogs
                  </Link>
                </li>
                <li className="text-xl text-neutral py-2 px-6 text-center  border-b-2 md:border-b-0   border-primary  md:hover:text-primary">
                  <Link href="#contact" onClick={() => setNavbar(!navbar)}>
                   Contacts
                  </Link>
                </li>
                {/* <li className="text-xl text-neutral py-2 px-6 text-center  border-b-2 md:border-b-0   border-primary  md:hover:text-primary">
                  <Link href="#projects" onClick={() => setNavbar(!navbar)}>
                    Projects
                  </Link>
                  </li> */}
                <li className="text-xl text-neutral py-2 px-6 text-center   md:border-b-0   border-primary  md:hover:text-primary">
                  <Link href="/login" onClick={() => setNavbar(!navbar)}>
                    LogIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
