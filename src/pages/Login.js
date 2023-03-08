import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';

function Login() {
  return (
    <section>
      <div>
        <div>
          <form action="" method="post">
            <h2>Login</h2>
            <div>
              <input type="email" required />
              <label htmlFor="">Email</label>
            </div>
            <div>
              <input type="password" required />
              <label htmlFor="">Password</label>
            </div>
            <div>
              <label htmlFor="">
                <input type="checkbox" name="" id="" />
                Remeber Me
              </label>
              <a href="#">Forget Password</a>
            </div>
            <button>Login</button>
            <div className="register">
              <p>Don't Have an Account? <a href="#">SignUp</a></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
