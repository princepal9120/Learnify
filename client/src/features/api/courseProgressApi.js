import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const PROGRESS_API = "http://localhost:8080/api/v1/progress";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROGRESS_API ,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getCourseProgress: builder.query({
        query: 
    })
    }),
  }),
});
