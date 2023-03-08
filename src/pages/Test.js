import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function Test() {
  return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {}
          if (!values.email) {
            errors.email = 'Required'
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <>
            <section className="flex flex-col justify-center items-center min-h-screen w-full">
              <div className="relative w-[400px] outline-dashed h-[450px] flex flex-col justify-center items-center outline-black">
                <h2 className="text-center ">Login</h2>
                <div className="form-control w-full max-w-xs">
                  <Form>
                    <label htmlFor="" className="label-text">
                      <span>Email</span>
                    </label>
                    <div className="flex">
                      <Field
                        type="email"
                        name="email"
                        className="input input-bordered w-full max-w-xs"
                      />
                      <label htmlFor="my-modal-4" className="btn">
                        (i)
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id="my-modal-4"
                        className="modal-toggle"
                      />
                      <label
                        htmlFor="my-modal-4"
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative" htmlFor="">
                          <h3 className="text-lg font-bold">
                            <ErrorMessage name="email" component="div" />
                          </h3>
                        </label>
                      </label>
                    </div>
                    <label htmlFor="">Password</label>
                    <div className="flex">
                      <Field
                        type="password"
                        name="password"
                        className="input input-bordered w-full max-w-xs"
                      />
                      <label htmlFor="my-modal-4" className="btn">
                        (i)
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id="my-modal-4"
                        className="modal-toggle"
                      />
                      <label
                        htmlFor="my-modal-4"
                        className="modal cursor-pointer"
                      >
                        <label className="modal-box relative" htmlFor="">
                          <h3 className="text-lg font-bold">
                            <ErrorMessage name="password" component="div" />
                          </h3>
                        </label>
                      </label>
                    </div>
                    <br />
                    <br />
                    <br />
                    {/* <div className="flex">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Email</span>
                      </label>
                      <label className="input-group">
                        <span>Email</span>
                        <input
                          type="text"
                          placeholder="info@site.com"
                          className="input input-bordered"
                        />
                      </label>
                    </div>
                  </div> */}
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </Form>
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <span className="label-text">Remember me</span>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-success"
                      />
                    </label>
                  </div>
                  <button>Login</button>
                  <div className="register">
                    <p>
                      Dont Have an Account? <a href="#">SignUp</a>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Test
