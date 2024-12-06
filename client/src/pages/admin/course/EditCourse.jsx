import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseTab from "./CourseTab";

function EditCourse() {
  const navigate=useNavigate()
  return (
    <div className="flex-1">
      <div className="flex justify-between text-center mb-5">
        <h1 className="text-2xl font-bold">
          Add detail information regarding course
        </h1>
   
        <Link to="lecture">
          <Button className="hover:text-blue-600" variant="link">Go to lectures page</Button>
        </Link>

      </div>
      <CourseTab/>
    </div>
  );
}

export default EditCourse;
