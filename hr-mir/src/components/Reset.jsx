import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
// import {usernameValidate} from '../helper/validate'
import { resetPasswordVerify } from '../helper/validate'


export default function Reset() {

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
      // username: ''
    },
    // validate: passwordValidate,
    // validate: usernameValidate,
    validate: resetPasswordVerify,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Reset</h1>
            <span className='py-4 text-xl,w=2/3 text-center text-gray-500'>Enter New Password</span>

          </div>
          <form className='py-20' onSubmit={formik.handleSubmit}>


            <div className='textbox flex flex-col items-center gap-6'>
              {/* <input {...formik.getFieldProps('username')}className={styles.textbox} type='text' placeholder='Username' /> */}
              <input {...formik.getFieldProps('password')} className={styles.textbox} type='text' placeholder='New Password' />
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type='text' placeholder='Re type Password' />

              <button className={styles.btn} type='submit'>SignUp</button>

            </div>



          </form>
        </div>

      </div>
    </div>
  )
}
