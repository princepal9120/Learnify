import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const getSelectedCategory=()=>{

}

const createCourseHandler=()=>{

}

function CreateLecture() {
    const isLoading=false;
    const navigate=useNavigate();
  return (
    <div className="flex-1 mx-10">
    <div className="mb-4">
      {" "}
      <h1 className="font-bold text-2xl text-gray-800">
        Lets add course , add some basic detials for you new course
      </h1>
      <p className="text-sm">Lorem ipsum dolor sit amet consectetur, Sint.</p>
    </div>

    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          type="text"
        //   value={courseTitle}
        //   onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="your course name"
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select onValueChange={getSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Courses</SelectLabel>
              <SelectItem value="web-development">Web Development</SelectItem>
              <SelectItem value="ml">Machine learning</SelectItem>
              <SelectItem value="mern">Mern</SelectItem>
              <SelectItem value="ai">Artificial Intelligence</SelectItem>
              <SelectItem value="nextjs">Nextjs</SelectItem>   <SelectItem value="mern">Javascript</SelectItem>
              <SelectItem value="dsa">Data structure & Algorithm</SelectItem>
              <SelectItem value="java-sb">Java SpringBoot</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={() => navigate("/admin/course")}>
          back
        </Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>
          {isLoading ? (
            <>
              <Loader2 className="size-6 mr-2 animate-spin" />
              Please wait...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </div>
  </div>
  )
}

export default CreateLecture 