import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../Store/store';
import {updateUser} from '../helper/helper'

export default function Profile() {
  const { username } = useAuthStore((state) => state.auth);
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  //console.log(apiData);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.rest?.firstName || '',
      lastName: apiData?.rest?.lastName || '',
      mobile: apiData?.rest?.mobile || '',
      email: apiData?.rest?.email || '',
      Address: apiData?.rest?.Address || '',
    },
    enableReinitialize: true,
    validate: profileValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || '' });
      
     console.log(values);
    }
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  if (isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;
  if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>;

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: '59%' }}>
          <div className='title flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Profile</h1>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Edit your details
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
                <img
                  src={apiData?.rest?.profile || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt='avatar'
                />
              </label>
              <input onChange={onUpload} type='file' id='profile' name='profile' />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <div className='name flex gap-10'>
                <input
                  {...formik.getFieldProps('firstName')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type='text'
                  placeholder='First Name'
                />
                <input
                  {...formik.getFieldProps('lastName')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type='text'
                  placeholder='Last Name'
                />
              </div>

              <div className='name flex gap-10'>
                <input
                  {...formik.getFieldProps('mobile')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type='number'
                  placeholder='Mobile'
                />
                <input
                  {...formik.getFieldProps('email')}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type='email'
                  placeholder='Email'
                />
              </div>

              <input
                {...formik.getFieldProps('Address')}
                className={`${styles.textbox} ${extend.textbox}`}
                type='text'
                placeholder='Address'
              />
              <button className={styles.btn} type='submit'>
                Update
              </button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Come Back Later?
                <Link className='text-red-500' to='/'>
                  {' '}
                  Log out
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}
