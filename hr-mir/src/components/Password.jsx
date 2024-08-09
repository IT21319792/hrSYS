import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import styles from '../styles/Username.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/validate'
// import {usernameValidate} from '../helper/validate'
import useFetch from '../hooks/fetch.hook'
import { useAuthStore } from '../Store/store'
import {verifyPassword} from '../helper/helper'


export default function Password() {

  const { username } = useAuthStore(state => state.auth)

  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
  const navigate = useNavigate()

  console.log(apiData);


  const formik = useFormik({
    initialValues: {
      password: '',
      // username: ''
    },
    validate: passwordValidate,
    // validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
     let loginPromise = verifyPassword({username, password: values.password});
      toast.promise(loginPromise, {
        loading: 'Verifying...',
        success: 'Verified successfully',
        error: 'Verification failed'
      }
      )
      loginPromise.then(res =>{
        let {token} = res.data;
        localStorage.setItem('token',token);
        navigate('/profile')
      })
    }
  })

  if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>
            Hello {apiData?.rest?.firstName || apiData?.rest?.username || 'User'}!
            </h1>

            <span className='py-4 text-xl,w=2/3 text-center text-gray-500'>Login with your username</span>

          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={apiData?.rest?.profile || avatar} className={styles.profile_img} alt='avatar' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              {/* <input {...formik.getFieldProps('username')}className={styles.textbox} type='text' placeholder='Username' /> */}
              <input {...formik.getFieldProps('password')} className={styles.textbox} type='password' placeholder='Password' />


              <button className={styles.btn} type='submit'>Sign In</button>

            </div>


            <div className="text-center py-4"></div>
            <span className='text-gray-500'>Forgot password<Link className='text-red-500' to='/recovery'> Click here !</Link></span>

          </form>
        </div>

      </div>
    </div>
  )
}
