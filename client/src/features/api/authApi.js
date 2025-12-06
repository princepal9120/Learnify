import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "https://learnifywithai.onrender.com/api/v1/user/";

const baseQuery = fetchBaseQuery({
  baseUrl: USER_API,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Wrapper around baseQuery to handle errors with retry logic
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const statusCode = result.error.status;
    const errorMessage = result.error.data?.message || result.error.message || "Unknown error";

    console.error(`[AuthAPI] ${args.url || 'Request'} - Status: ${statusCode}, Message: ${errorMessage}`);

    // Handle specific error types
    if (statusCode === 0 || result.error.message?.includes("CORS")) {
      console.error("⚠️ CORS Error - Backend may not be reachable");
    } else if (statusCode === 401) {
      console.warn("🔐 Unauthorized - User not authenticated");
    } else if (statusCode === 404) {
      console.warn("❌ Endpoint not found");
    } else if (statusCode === 500) {
      console.error("🔴 Server error - Backend issue");
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
    }),
    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result?.data.user }));
        } catch (error) {
          console.log("Login error:", error?.error?.data?.message || error.message);
          dispatch(userLoggedOut());
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log("Logout error:", error?.error?.data?.message || error.message);
          dispatch(userLoggedOut());
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result?.data.user }));
        } catch (error) {
          console.log("⚠️ Could not load user profile:", error?.error?.data?.message || error.message);
          // Don't dispatch logout - let the user continue as guest
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
} = authApi;
