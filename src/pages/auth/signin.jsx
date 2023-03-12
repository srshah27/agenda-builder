import React from 'react'
import { getProviders, signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import { useState } from 'react'
import Link from 'next/link'
import login_validate from '@/lib/validate'
function Test({ providers }) {
  const [show, setShow] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_validate,
    onSubmit,
  })
  async function onSubmit(values) {
    const status = await signIn('Credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    })
    console.log(status)
    if (status.ok) router.push(status.url)
  }
  return (
    <>
      <div className="grid w-3/5 m-auto text-center rounded-md h-3/4 lg:grid-cols-1">
        <section className="flex flex-col w-3/4 gap-10 mx-auto">
          <div className="title">
            <h1 className="py-4 text-4xl font-bold text-gray-800">Login</h1>
            <p className="w-3/4 mx-auto text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
              officia?
            </p>
          </div>

          {/* form */}
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <div
              className={`${
                formik.errors.email && formik.touched.email
                  ? 'border-rose-600'
                  : ''
              }`}
            >
              <input
                type="email"
                name="email"
                placeholder="Email"
                {...formik.getFieldProps('email')}
              />
              <span className="flex items-center px-4 icon">
                {/* <HiAtSymbol size={25} /> */}
              </span>
            </div>
            {formik.errors.email && formik.touched.email ? (
              <span className="text-rose-500">{formik.errors.email}</span>
            ) : (
              <></>
            )}

            <div
              className={`${
                formik.errors.password && formik.touched.password
                  ? 'border-rose-600'
                  : ''
              }`}
            >
              <input
                type={`${show ? 'text' : 'password'}`}
                name="password"
                placeholder="password"
                {...formik.getFieldProps('password')}
              />
              <span
                className="flex items-center px-4 icon"
                onClick={() => setShow(!show)}
              >
                {/* <HiFingerPrint size={25} /> */}
              </span>
            </div>

            {formik.errors.password && formik.touched.password ? (
              <span className="text-rose-500">{formik.errors.password}</span>
            ) : (
              <></>
            )}
            {/* login buttons */}
            <div className="input-button">
              <button type="submit">Login</button>
            </div>
          </form>

          {/* bottom */}
          <p className="text-center text-gray-400 ">
            Don{"'"}t have an account yet?{' '}
            <Link href={'/auth/register'} className="text-blue-400">
              Register
            </Link>
          </p>
        </section>
        <div>
          {Object.values(providers).map((provider) => {
            if (provider.name === 'Credentials') return
            return (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      providers: await getProviders(context),
    },
  }
}

export default Test
