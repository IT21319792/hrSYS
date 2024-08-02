import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import {Toaster } from 'react-hot-toast'
import {useFormik} from 'formik'
import {passwordValidate} from '../helper/validate'
// import {usernameValidate} from '../helper/validate'


export default function Password() {

  const [file,setFile]= useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
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

const onUpload = async (e)=>{
  const base64 = '';
  setFile(base64);
 
}

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{width:'59%'}}>
          <div className='title flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Register</h1>
            <span className='py-4 text-xl,w=2/3 text-center text-gray-500'>Sign up with your username</span>

          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor="profile">
              <img src={avatar} className={styles.profile_img} alt='avatar' />

              </label>
              <input type="file" id='profile' name='profile'></input>
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
        
             <input {...formik.getFieldProps('email')}className={styles.textbox} type='email' placeholder='Email' />
             <input {...formik.getFieldProps('username')}className={styles.textbox} type='text' placeholder='Username' />
             <input {...formik.getFieldProps('password')}className={styles.textbox} type='text' placeholder='Password' />
              <button className={styles.btn} type='submit'>Register</button>

            </div>
            
          
            <div className="text-center py-4"></div>
            <span className='text-gray-500'>Already Registered?<Link className='text-red-500' to='/'> Login</Link></span>

          </form>
        </div>

      </div>
    </div>
  )
}
