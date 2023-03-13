import React from 'react'
import styles from '@/styles/Hero.module.css'
import Image from 'next/image'

function Hero() {
  return (
    <div className="absolute w-screen h-screen left-0 top-0 -z-50">
      <div className={styles.backbg}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <h1 className="m-auto text-white">Hello</h1>
      </div>
      {/* <div className='h-1/3'> */}
        <Image
          
          src="/svg/waves.svg"
          className="absolute bottom-0 left-0 scale-y-[-1] w-full h-1/3"
          width={100}
          height={100}
        />
      {/* </div> */}
      {/* <Image fill alt="public/svg/waves.svg" src="/mountains.jpg" sizes="100vw" /> */}
    </div>
  )
}

export default Hero
