import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course=({course}) =>{
  return (
  <Link to={`course-detail/${course._id}`}>
    <Card
      className="overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl
     transform hover:scale-110 transition-all duration-300"
    >
      <div className="relative">
        <img
          className="w-full h-36 object-cover rounded-t-lg"
          src={course.courseThumbnail}
          alt="course.courseTitle"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold to-lime-50 truncate">
         {course.courseTitle}
        </h1>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>Cn</AvatarFallback>
            </Avatar>
            <h1 className="text-sm font-medium">{course.creator?.name}</h1>
          </div>
          <Badge className="bg-blue-900 text-wrap px-3 py-2 text-black">
           {course.courseLevel}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold mt-2"> ₹ {course.coursePrice}</h1>
      </CardContent>
    </Card></Link>
  );
}

export default Course;
