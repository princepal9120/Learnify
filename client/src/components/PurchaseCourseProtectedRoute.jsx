import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion';

function PurchaseCourseProtectedRoute({ children }) {
  const { courseId } = useParams();
  const { data, isLoading, error } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-black text-lg">Loading course...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    console.error("Error loading course status:", error);
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center border-3 border-black p-8 max-w-md">
          <p className="font-black text-xl mb-4">Error Loading Course</p>
          <p className="text-gray-600 mb-6">
            {error?.data?.message || "Unable to verify course access. Please try again."}
          </p>
          <Navigate to={`/course-detail/${courseId}`} />
        </div>
      </motion.div>
    );
  }

  // If course is purchased, show content
  if (data?.purchased) {
    return children;
  }

  // If not purchased, redirect to course detail page
  return <Navigate to={`/course-detail/${courseId}`} replace />;
}

export default PurchaseCourseProtectedRoute;