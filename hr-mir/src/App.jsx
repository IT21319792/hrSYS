import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';


 const  router = createBrowserRouter([
  {
    path: '/',
    element: <div>Root Route</div>
  },
  {
    path: '/register',
    element: <div>Register</div>
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
