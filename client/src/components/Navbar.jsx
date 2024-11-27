import { Menu, University, User } from 'lucide-react'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import DarkMode from '@/DarkMode';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';



const logoutHandler =()=>{

}
function Navbar() {
 
  const user =false;
  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:bg-border-gray-300 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10'>
{/* desktop */}
<div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full'>
<div className="flex items-center gap-2">
<University className='h-9 w-9 mr-2'/>
<h1 className='hidden md:block font-extrabold text-2xl'> LMS</h1>
</div>
<div className="flex items-center gap-2">
  {
    user? (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>1
          <DropdownMenuItem>
            <Link to="my-learning">My learning</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link to="profile">Edit Profile</Link>{" "}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logoutHandler}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {user?.role === "instructor" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    ):(
    <div className='flex items-center gap-3'>
         <Link to="/login"> <Button variant='ghost'>Login</Button></Link>
         <Link to="/login"> <Button >Signup</Button></Link>
    </div>
    )
  }
  <DarkMode/>

</div>

</div>
<div className="flex md:hidden items-center justify-between px-4 h-full">
 
 <h1 className='text-2xl text-gray-900 font-extrabold'>LMS</h1><MobileDevice/>
</div>
    </div>
  );
};

export default Navbar

const MobileDevice=()=>{
  const role= "instructor"
  return( <Sheet>
    <SheetTrigger asChild>
      <Button size='icon' className='rounded-full bg-gray-200 hover:bg-gray-900'><Menu/></Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader className='flex flex-row justify-between items-center gap-7 mt-3 mb-4'>
        <SheetTitle className='text-2xl font-extrabold'><Link to={"/"}>LMS</Link></SheetTitle>
        <DarkMode/>
      </SheetHeader>
      <div className="grid gap-3 py-4 my-2">
        <h1><Link to={"/my-learning"}>My Learning</Link></h1>
        <h1><Link to={"/profile"}>Edit Profile</Link></h1>
        <h1>Logout</h1>
      </div>
      {
        role === "instructor" && (
          <SheetFooter >
            <SheetClose asChild>
              <Button type='submit' className='w-full'>
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )
      }
    
    </SheetContent>
  </Sheet>
);
};