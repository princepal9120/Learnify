import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen top-0 right-0'>
        <Navbar/>
        <div className="flex-1 mt-16">
         <Outlet/>
        </div>
        
    </div>
  )
}

export default MainLayout