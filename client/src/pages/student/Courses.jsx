import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import BrutalButton from "@/components/brutal/BrutalButton";
import BrutalCard from "@/components/brutal/BrutalCard";
import BrutalBadge from "@/components/brutal/BrutalBadge";
import { motion } from "motion/react";
import { Filter, X } from "lucide-react";

const courses = [1, 2, 3, 4, 5];

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("trending");

  const categories = [
    "All Courses",
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "Development",
  ];

  if (isError) return <h1 className="text-center py-12 text-xl font-bold">Some error occurred while fetching courses.</h1>;

  const filteredCourses =
    selectedCategory && selectedCategory !== "All Courses"
      ? data?.courses?.filter(
        (course) => course.category === selectedCategory
      ) || []
      : data?.courses || [];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h2 className="font-black text-4xl md:text-5xl mb-4">Explore Courses</h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Browse thousands of courses and find the perfect one to upskill your career.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 border-2 border-black p-6 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span className="font-bold">Filters & Sorting</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              {showFilters ? <X /> : <Filter />}
            </button>
          </div>

          {/* Categories */}
          <div className={showFilters ? "block" : "hidden md:block"}>
            <div className="mb-6">
              <p className="font-bold mb-3 text-sm uppercase tracking-wider">
                Categories
              </p>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat ? null : cat
                      )
                    }
                    className={`px-3 py-2 border-2 rounded-md font-bold text-sm transition-all ${selectedCategory === cat
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black hover:bg-gray-100"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="font-bold mb-3 text-sm uppercase tracking-wider">
                Sort By
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border-2 border-black px-3 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="trending">Trending</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid - Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : filteredCourses && filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Course course={course} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg font-medium">
                No courses found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
      <Skeleton className="w-full h-40 border-b-2 border-black" />
      <div className="px-4 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
};
