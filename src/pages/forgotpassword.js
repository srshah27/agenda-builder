import { React, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RxDotFilled } from 'react-icons/rx'
import Link from 'next/link'
import login_validate from '@/lib/validate'
import { getProviders, signIn, getSession } from 'next-auth/react'
import { useFormik, Field, ErrorMessage, FormikProvider } from 'formik'
import Image from 'next/image'
import Router from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

function forgotpassword() {
  const router = Router
  const [error, setError] = useState('')
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: login_validate,
    onSubmit
  })
  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/api/w/get'
    })
    if (status.ok) router.push(status.url)
    if (status.status === 401) setError(status.error)
    if (status.error) toast.error(status.error)
  }
  return (
    <FormikProvider value={formik}>
      <Toaster />
      <div className="mt-20 flex flex-col">
        <div className="mx-auto my-6 max-w-full sm:block">
          <Image
            className=""
            src="svg/agenda.svg"
            alt="agenda"
            width={200}
            height={200}
          />
        </div>

        <section className="w-full p-5">
          <div className="mx-auto my-0 w-96 max-w-lg rounded-sm  bg-white py-[25px] px-[40px] shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)]">
            <h1 className="mt-3 mb-6 text-center text-base font-semibold tracking-tight text-gray-500">
              Reset Password
            </h1>
            <div className="">
              <form className="w-50 mt-0 block" onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="mt-2 h-10 w-full rounded-sm border-2 border-gray-300 bg-gray-50 p-2 transition-all duration-500"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className="text-xs text-red-400">
                    {formik.errors.email}
                  </span>
                ) : (
                  <></>
                )}
                {formik.touched.password && formik.errors.password ? (
                  <span className="text-xs text-red-400">
                    {formik.errors.password}
                  </span>
                ) : (
                  <></>
                )}
                <button
                  className="my-2 h-10 w-full rounded-md bg-emerald-400 font-bold mt-4"
                  type="submit"
                >
                  Send Confirmation
                </button>
              </form>
            </div>
          </div>
        </section>
        <div>
          <Image
            src="svg/checklist.svg"
            alt="image1"
            className="absolute top-[-6.7px] left-14  -z-10  hidden scale-y-[-1] scale-x-[-1] md:hidden lg:block"
            width={400}
            height={500}
          />
          <Image
            src="svg/business.svg"
            alt="image2"
            className="absolute bottom-0 right-0 -z-10 hidden lg:block"
            width={500}
            height={600}
          />
        </div>
      </div>
    </FormikProvider>
  )
}

export default forgotpassword
