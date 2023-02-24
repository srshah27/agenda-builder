import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='flex justify-center h-screen'>
        <h1 className="my-auto font-semibold">Agenda Builder</h1>
      </div>
    </>
  )
}
