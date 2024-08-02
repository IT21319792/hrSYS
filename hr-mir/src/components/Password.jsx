import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster } from 'react-hot-toast'
import {useFormik} from 'formik'
import {passwordValidate} from '../helper/validate'
// import {usernameValidate} from '../helper/validate'


export default function Password() {

  const formik = useFormik({
    initialValues: {
      password: '',
      // username: ''
    },
    validate: passwordValidate,
    // validate: usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values=>{
      console.log(values)
    }
  })
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Hello Again !</h1>
            <span className='py-4 text-xl,w=2/3 text-center text-gray-500'>Login with your username</span>

          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className={styles.profile_img} alt='avatar' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
            {/* <input {...formik.getFieldProps('username')}className={styles.textbox} type='text' placeholder='Username' /> */}
             <input {...formik.getFieldProps('password')}className={styles.textbox} type='password' placeholder='Password' />
          
             
              <button className={styles.btn} type='submit'>SignUp</button>

            </div>
            
          
            <div className="text-center py-4"></div>
            <span className='text-gray-500'>Forgot password<Link className='text-red-500' to='/recovery'> Click here !</Link></span>

          </form>
        </div>

      </div>
    </div>
  )
}
