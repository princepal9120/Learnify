
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

function SearchResult({ course }) {
  const courseId = "dsfk32df";
  return (
    <div className="flex flex-col justify-between items-start md:flex-row md:items-center border-b mb-3">
      <Link
        to={`/course-detail/${courseId}`}
        className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-auto"
      >
        <img
          src="https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/366e65b13ea0.jpg"
          alt="courseThumbnail"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-lg md:text-xl text-gray-700">
            course title
          </h1>
          <p className="text-sm text-gray-700">SubTitle</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold italic">prince</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">Medium</Badge>
        </div>
      </Link>
    </div>
  );
}

export default SearchResult;
