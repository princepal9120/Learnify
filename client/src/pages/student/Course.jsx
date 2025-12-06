import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Link } from "react-router-dom";
import BrutalCard from "@/components/brutal/BrutalCard";
import BrutalBadge from "@/components/brutal/BrutalBadge";
import BrutalButton from "@/components/brutal/BrutalButton";
import { motion } from "motion/react";
import { ArrowRight, Star } from "lucide-react";

const Course = ({ course }) => {
  const rating = course.courseLevel === "Beginner" ? 4.5 : course.courseLevel === "Intermediate" ? 4.8 : 4.9;

  return (
    <Link to={`course-detail/${course._id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <BrutalCard className="h-full border-3 flex flex-col overflow-hidden hover:shadow-brutal-lg cursor-pointer">
          {/* Thumbnail */}
          <div className="relative overflow-hidden border-b-3 border-black bg-gray-100">
            <img
              className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
              src={course.courseThumbnail}
              alt={course.courseTitle}
            />
            <div className="absolute top-3 right-3">
              <BrutalBadge variant="accent" className="text-xs">
                {course.courseLevel}
              </BrutalBadge>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-4 flex flex-col flex-1">
            {/* Title */}
            <h3 className="font-black text-base leading-tight mb-3 line-clamp-2 group-hover:underline">
              {course.courseTitle}
            </h3>

            {/* Instructor */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b-2 border-gray-200">
              <Avatar className="w-8 h-8 border-2 border-black">
                <AvatarImage src={course.creator?.photoUrl} alt={course.creator?.name} />
                <AvatarFallback className="font-bold">
                  {course.creator?.name?.charAt(0) || "I"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">{course.creator?.name}</p>
                <p className="text-xs text-gray-600">Instructor</p>
              </div>
            </div>

            {/* Rating & Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(rating)
                        ? "fill-accent text-accent"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold ml-1">{rating}</span>
              </div>
              <div className="text-right">
                <p className="text-xl font-black">₹{course.coursePrice}</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <BrutalButton
                variant="primary"
                size="sm"
                fullWidth
                className="group hover:bg-white text-sm"
              >
                View Course
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </BrutalButton>
            </div>
          </div>
        </BrutalCard>
      </motion.div>
    </Link>
  );
};

export default Course;
