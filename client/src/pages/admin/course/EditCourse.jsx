import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

function EditCourse() {
  return (
    <div className="flex-1">
      <div className="flex justify-between text-center mb-5">
        <h1 className="text-2xl font-bold">
          Add detail information regarding course
        </h1>
        <Link to={'/lecture'}>
          {" "}
          <Button variant="link">Go to lecture page </Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
}

export default EditCourse;
