
import './App.css'
import { Button } from './components/ui/button'

import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Auth from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import Courses from './pages/student/Courses'
import { ThemeProvider } from './components/ThemeProvider'
import React from 'react'
import Profile from './pages/student/Profile'
import MyLearning from './pages/student/MyLearning'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element:
          (<>
            <HeroSection />
            <Courses />
          </>)
      },
      {
        path: "login",
        element: (

          <Auth />

        )
      }
      , {
        path: "my-learning",
        element: (

          <MyLearning />


        )
      }, {
        path: "profile",
        element: (

          <Profile />

        )
      }

    ]
  }
])

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />

      </ThemeProvider>
    </main>
  )
}

export default App
