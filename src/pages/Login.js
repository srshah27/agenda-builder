import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Image from 'next/image'
function Login() {
  return (
    <div className="">
      <Image
        className="inline mx-auto"
        src="/Planit.svg"
        alt="Planit"
        width={120}
        height={150}
      />
      <span>Agile Builder</span>

      <section className="w-full p-0">
        <div className="mx-auto my-0 w-auto max-w-lg">
          <div className="shadow-lg py-[25px] px-[40px]">
            <h1 className="text-center text-base mt-3 mb-6 tracking-tight">
              Login to Agile Builder
            </h1>
            <div className="flex flex-col items-center ">
              <form className="block mt-0 w-full px-5">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input-md bg-slate-300 transition-all duration-500 input-bordered w-full rounded-md"
                />
                <input
                  type="password"
                  placeholder="Type here"
                  className="input-md bg-slate-300 transition-all duration-500 input-bordered w-full rounded-md"
                />
                <button className="btn btn-active btn-primary rounded-md">Button</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
