import "./App.css";
import { Button } from "./components/ui/button";

import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Auth from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import Courses from "./pages/student/Courses";
import { ThemeProvider } from "./components/ThemeProvider";
import React from "react";
import Profile from "./pages/student/Profile";
import MyLearning from "./pages/student/MyLearning";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Course from "./pages/student/Course";
import AddCourse from "./pages/admin/course/AddCourse";
import CourseTable from "./pages/admin/course/CourseTable";
import EditCourse from "./pages/admin/course/EditCourse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: <Auth />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      //admin routes 
      {
        path: "admin",
        element:(
          <Sidebar/>
        )
        ,
        children:[
          {
            path: "dashboard",
            element: <Dashboard/>
          },{
            path: "course/create",
            element: <AddCourse/>
          },
          {
            path: "course",
            element: <CourseTable/>
          },
          {
            path: "course/:courseId",
            element: <EditCourse/>
          }
        ]
      },
    ],
  },
]);

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
