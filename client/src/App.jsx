import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
import MainLayout from "./Layout/MainLayout";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import Loader from "./components/Loader";

// Lazy-loaded components
const Auth = React.lazy(() => import("./pages/Login"));
const HeroSection = React.lazy(() => import("./pages/student/HeroSection"));
const Courses = React.lazy(() => import("./pages/student/Courses"));
const Profile = React.lazy(() => import("./pages/student/Profile"));
const MyLearning = React.lazy(() => import("./pages/student/MyLearning"));
const Sidebar = React.lazy(() => import("./pages/admin/Sidebar"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AddCourse = React.lazy(() => import("./pages/admin/course/AddCourse"));
const CourseTable = React.lazy(() => import("./pages/admin/course/CourseTable"));
const EditCourse = React.lazy(() => import("./pages/admin/course/EditCourse"));
const CreateLecture = React.lazy(() => import("./pages/admin/lecture/CreateLecture"));
const EditLecture = React.lazy(() => import("./pages/admin/lecture/EditLecture"));
const CourseDetail = React.lazy(() => import("./pages/student/CourseDetail"));
const CourseProgress = React.lazy(() => import("./pages/student/CourseProgress"));
const SearchPage = React.lazy(() => import("./pages/student/SearchPage"));
const Stats = React.lazy(() => import("./components/Stats"));
const Categories = React.lazy(() => import("./components/Categories"));
const Testimonials = React.lazy(() => import("./components/Tesimonials"));
const CTA = React.lazy(() => import("./components/CTA"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loader/>}>
            <HeroSection />
            <Stats />
            <Courses />
            <Categories />
            <Testimonials />
            <CTA />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Suspense fallback={<Loader/>}>
              <Auth />
            </Suspense>
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader/>}>
              <MyLearning />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader/>}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader/>}>
              <SearchPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader/>}>
              <CourseDetail />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <Suspense fallback={<Loader/>}>
                <CourseProgress />
              </Suspense>
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      // Admin routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Suspense fallback={<Loader/>}>
              <Sidebar />
            </Suspense>
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<Loader/>}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "course/create",
            element: (
              <Suspense fallback={<Loader/>}>
                <AddCourse />
              </Suspense>
            ),
          },
          {
            path: "course",
            element: (
              <Suspense fallback={<Loader/>}>
                <CourseTable />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId",
            element: (
              <Suspense fallback={<Loader/>}>
                <EditCourse />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId/lecture",
            element: (
              <Suspense fallback={<Loader/>}>
                <CreateLecture />
              </Suspense>
            ),
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: (
              <Suspense fallback={<Loader/>}>
                <EditLecture />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
