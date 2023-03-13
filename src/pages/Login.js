import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RxDotFilled } from 'react-icons/rx'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
import Image from 'next/image'
function login() {
  return (
    <div className="mt-20 ">
      <div className="flex items-center justify-center font-mono text-3xl font-bold md:text-4xl text-primary mx-52">
        <Image
          className="inline w-10 h-10 my-8 mr-5 md:w-12 md:h-16 "
          src="/logo.svg"
          alt="agenda"
          width={50}
          height={63}
        />
        <span>Agile Builder</span>
      </div>

      <section className="w-full p-5">
        <div className="mx-auto my-0 shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)] w-96 max-w-lg  py-[25px] px-[40px] rounded-sm bg-white">
          <h1 className="mt-3 mb-6 font-mono text-base font-semibold tracking-tight text-center text-gray-500">
            Log in to Agile Builder
          </h1>
          <div className="">
            <form className="block mt-0 w-50">
              <input
                type="text"
                placeholder="Enter Email"
                className="w-full h-10 mt-2 transition-all duration-500 border-2 border-gray-300 rounded-sm input-md bg-gray-50"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full h-10 my-2 transition-all duration-500 border-2 border-gray-300 rounded-sm input-md input-bordered bg-gray-50"
              />
              <button className="w-full h-10 my-2 font-mono font-bold text-gray-100 rounded-md btn-active bg-primary">
                Log In
              </button>
              <div className="my-3 text-xs text-center text-gray-500"> OR </div>
              <button className="items-center justify-center w-full h-10 text-center border-2 rounded-sm shadow-lg border-gray-50">
                <FcGoogle className="inline w-5 h-auto mx-2 my-2 " />
                <div className="inline font-bold text-slate-600">
                  Continue with Google
                </div>
              </button>
              <div className="h-1 my-6 divider"></div>
              <div className="inline mx-10 text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <RxDotFilled className="inline text-gray-800" /> Sign Up!
              </div>
            </form>
          </div>
        </div>
      </section>
      <div>
        <Image
          src="/checklist.svg"
          alt="image1"
          className="scale-y-[-1] block absolute top-[-6.7px] left-14 "
          width={400}
          height={500}
        />
        <Image
          src="/business.svg"
          alt="image2"
          className="absolute bottom-0 right-0 -z-10"
          width={500}
          height={600}
        />
      </div>
    </div>
  )
}

export default login
