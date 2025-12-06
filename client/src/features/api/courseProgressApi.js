import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROGRESS_API = "https://learnifywithai.onrender.com/api/v1/progress";

const baseQuery = fetchBaseQuery({
  baseUrl: PROGRESS_API,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Wrapper around baseQuery to handle errors
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error) {
    console.error("Progress API Error:", result.error);
    
    if (result.error.status === 0 || result.error.message?.includes("CORS")) {
      console.error("CORS Error - Check backend configuration");
    }
  }
  
  return result;
};

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    updateLectureProgress: builder.mutation({
      query: ({ courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}/view`,
        method: "POST",
      }),
    }),
    completeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/complete`,
        method: "POST",
      }),
    }),

    inCompleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/${courseId}/incomplete`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCourseProgressQuery,
  useCompleteCourseMutation,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} = courseProgressApi;
