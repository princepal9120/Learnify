import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "https://learnifywithai.onrender.com/api/v1/purchase";

const baseQuery = fetchBaseQuery({
  baseUrl: COURSE_PURCHASE_API,
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
    console.error("Purchase API Error:", result.error);
    
    if (result.error.status === 0 || result.error.message?.includes("CORS")) {
      console.error("CORS Error - Check backend configuration");
    }
  }
  
  return result;
};

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-checkout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getPurchasedCourse: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCourseQuery,
} = purchaseApi;
