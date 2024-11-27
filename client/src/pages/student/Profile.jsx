import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Course from "./Course";
import { Loader, Loader2 } from "lucide-react";
import { useLoadUserQuery } from "@/features/api/authApi";

function Profile() {
  const { data, isLoading } = useLoadUserQuery();
  const { user } = data || {};
  if (isLoading) return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex items-center"><Loader className="size-10 animate-spin" /></div>
        Profile loading....
      </div>
    </>
  )
  console.log(user)
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center md:text-left uppercase">Profile</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8 my-5">
        <div className="flex flex-col items-start">
          <Avatar className="size-24 md:size-32 mb-3">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>Cn</AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="mb-2">
            <h1 className="text-gray-200"> <span className="font-semibold text-gray-900 dark:text-gray-100 ">Name: </span>{
              user?.name}</h1>
          </div>
          <div className="mb-2">
            <h1 className="text-gray-200"> <span className="font-semibold text-gray-900 dark:text-gray-100 ">Email: </span>{
              user?.email}</h1>
          </div>
          <div className="mb-2">
            <h1 className="text-gray-200"> <span className="font-semibold text-gray-900 dark:text-gray-100 ">Role: </span>{
              user?.role}</h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Prince Pal"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    ProfilePhoto
                  </Label>
                  <Input
                    id="username"
                    className="col-span-3"
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{
                  isLoading ? (
                    <>
                      <Loader2 className="size-5 mr-2 animate-spin" />
                      Please wait....
                    </>

                  ) : ("Save Changes")
                }</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

      </div>
      <div>
        <h1 className="font-medium text-lg text-center"> Courses you're enrolled in </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
          {
            user?.enrolledCourses.length===0? (
              <h1 > your are not enrolled any courses </h1>
            ) : (
              user.enrolledCourses.map((course) => (
                <Course course={course} key={course._id} /> )
              )
            )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
