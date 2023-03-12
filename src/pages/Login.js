import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RxDotFilled } from 'react-icons/rx'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
import Image from 'next/image'
function Login() {
  return (
      <div className="mt-20 ">
        <div className="flex items-center justify-center text-3xl md:text-4xl text-primary font-mono font-bold  mx-52">
          <Image
            className="inline mr-5 my-8 w-10 h-10 md:w-12 md:h-16 "
            src="/logo.svg"
            alt="agenda"
            width={50}
            height={63}
          />
          <span>Agile Builder</span>
        </div>

        <section className="w-full p-5">
          <div className="mx-auto my-0 shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)] w-96 max-w-lg  py-[25px] px-[40px] rounded-sm bg-white">
            <h1 className="text-center text-base mt-3 mb-6 font-mono font-semibold tracking-tight text-gray-500">
              Log in to Agile Builder
            </h1>
            <div className="  ">
              <form className="block mt-0 w-50">
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="input-md mt-2 transition-all duration-500 w-full h-10 rounded-sm border-gray-300 border-2 bg-gray-50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-md my-2 transition-all duration-500 input-bordered w-full h-10 rounded-sm  border-gray-300 border-2  bg-gray-50"
                />
                <button className="btn-active w-full h-10 rounded-md font-mono my-2 font-bold text-gray-100 bg-primary">
                  Log In
                </button>
                <div className="text-center text-gray-500 text-xs my-3"> OR </div>
                <button className=" justify-center items-center  h-10 w-full text-center shadow-lg border-2 border-gray-50 rounded-sm">
                  <FcGoogle className="inline  w-5 h-auto mx-2 my-2 " />
                  <div className=" inline font-bold text-slate-600">
                    Continue with Google
                  </div>
                </button>
                <div className="divider my-6 h-1"></div>
                <div className="inline mx-10 text-gray-400 text-sm">
                  Don&apos;t have an account? <RxDotFilled className="inline text-gray-800" /> Sign Up!
                </div>
              </form>
            </div>
          </div>
        </section>
        <div>
          <Image src="/checklist.svg" alt="image1" className='scale-y-[-1] block absolute  top-0  left-14 ' width={400} height={500} />
          <Image src="/business.svg" alt="image2" className='absolute bottom-0 right-0 -z-10' width={500} height={600} />
        </div>
      </div>
  )
}

export default Login
