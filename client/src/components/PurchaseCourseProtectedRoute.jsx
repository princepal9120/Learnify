import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

function PurchaseCourseProtectedRoute({children}) {
    const {courseId}= useParams();
    const { data, isLoading} =useGetCourseDetailWithStatusQuery(courseId);
    if(isLoading) return <p>lading.....</p>
  return (
    data?.purchased ? children : <Navigate to={`/course-detail/${courseId}`} />
  )
}

export default PurchaseCourseProtectedRoute