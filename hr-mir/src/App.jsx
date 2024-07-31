import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';


// import all components
import Username from './components/Username'
import Password from './components/Password'
import Profile from './components/Profile'
import Register from './components/Register'
import Reset from './components/Reset'
import Recovery from './components/Recovery'
import PageNotFound from './components/PageNotFound'

 const  router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>
  },
  {
    path: '/profile',
    element: <Profile></Profile>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  },
  {
    path: '/password',
    element: <Password></Password>
  }


 ])

export default function App() {
  return (
   <main>
      <RouterProvider router={router}>
        <div>
          <h1>App</h1>
        </div>
      </RouterProvider>

    </main>
  )
}
