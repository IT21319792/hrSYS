import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
// import { usernameValidate } from '../helper/validate';

export default function Recovery() {
  const formik = useFormik({
    initialValues: {
      password: '',
      // username: ''
    },
    validate: passwordValidate,
    // validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h1 className="text-4xl font-bold">Reset Password</h1>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to Recover Password
            </span>
          </div>
          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter OTP sent to your email
                </span>
                <input
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>
              
              {/* <input {...formik.getFieldProps('username')} className={styles.textbox} type='text' placeholder='Username' /> */}
              <input
                {...formik.getFieldProps('password')}
                className={styles.textbox}
                type="password"
                placeholder="New Password"
              />
              <button className={styles.btn} type="submit">
                SignUp
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Can't get OTP?{' '}
                <button className="text-red-500">Re Send</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
