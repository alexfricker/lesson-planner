import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Root from "./pages/root";
import { loader as rootLoader } from "./pages/root";
import Student, { loader as studentLoader } from "./pages/student";
import Lesson, { loader as lessonLoader } from "./pages/lesson";
import LessonForm, { loader as lessonFormLoader } from "./forms/lesson";
import StudentForm from "./forms/student";
import ErrorPage from "./error-page";
import Dashboard, { loader as dashboardLoader } from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "students/new",
        element: <StudentForm />,
      },
      {
        path: "students/:studentId",
        element: <Student />,
        loader: studentLoader,
      },
      {
        path: "students/:studentId/lessons/new",
        element: <LessonForm />,
        loader: lessonFormLoader,
      },
      {
        path: "lessons/:lessonId",
        element: <Lesson />,
        loader: lessonLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
