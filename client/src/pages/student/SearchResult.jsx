import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

function SearchResult({ course }) {
  return (
    <div className="flex flex-col justify-between items-start md:flex-row md:items-center border-b mb-3">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row justify-between gap-4 w-full md:w-auto"
      >
        <img
          src={
            course.courseThumbnail ||
            "https://d3f1iyfxxz8i1e.cloudfront.net/courses/course_image/366e65b13ea0.jpg"
          }
          alt="courseThumbnail"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-lg md:text-xl text-gray-700">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-gray-700">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Instructor:{" "}
            <span className="font-bold italic">{course.creator.name}</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-3 md:text-right w-full md:w-auto">
        {" "}
        <h1 className="font-bold text-lg md:text-xl">₹ {course.coursePrice}</h1>
      </div>
    </div>
  );
}

export default SearchResult;
