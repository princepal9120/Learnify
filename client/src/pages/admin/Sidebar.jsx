import { ChartNoAxesColumn,  SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Sidebar() {
  return (
   <div className="flex">
     <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-700
     dark:border-gray-300 h-screen bg-[#f0f0f0] dark:bg-black p-5 top-0 ">
      <div className="mt-5 space-y-4">
        <Link to={"dashboard"} className='flex items-center gap-3'>
        <ChartNoAxesColumn className='size-8 mr-2'/>
        Dashboard
        </Link>
        <Link to={"course"} className='flex items-center gap-3'>
        <SquareLibrary className='size-8 mr-2'/>
        Course
        </Link>
      </div>
   
    </div>
    <div className="flex-1 p-10">
        <Outlet/>
      </div>
   </div>

  )
}

export default Sidebar