import React from 'react'
import styles from '@/styles/Hero.module.css'
import Image from 'next/image'

function Hero() {
  return (
    <>
    <div className="absolute w-screen h-screen left-0 top-0 -z-50 overflow-x-hidden">
      <div className={styles.backbg}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className="md:pl-36 md:pt-52 pl-12 pt-48 text-gray-100 text-7xl font-mono md:text-left text-center ">Welcome to <br/> Agenda Builder!</div>
        <div className="md:pl-36 pt-8 pl-12 text-gray-100 text-3xl font-mono md:text-left text-center ">Add tasks and collaborate with your colleagues. <br/> Let&aposs get oraganized together.</div>
        <Image
        src="/svg/track.svg"
        className=" absolute right-36 top-40 hidden md:hidden lg:block"
        width={400}
        height={400}
      />
      
      </div>
      {/* <div className='h-1/3'> */}
      <Image
        src="/svg/waves.svg"
        className="absolute bottom-[-1px] left-0 scale-y-[-1]  w-full md:h-1/3  h-1/4 "
        width={100}
        height={100}
      />
      <div className="absolute text-gray-800 bottom-20 pl-44 text-xl font-mono hidden md:hidden"> 
        <span>Agenda Builder 101 <br/></span>
      </div>
      
      {/* </div> */}
      {/* <Image fill alt="public/svg/waves.svg" src="/mountains.jpg" sizes="100vw" /> */}
    <div className ="h-screen top-auto w-screen">
    </div>
    </div>
    
    </>
  )
}

export default Hero
