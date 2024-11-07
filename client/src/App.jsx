import CodingHome from "./components/coding/CodingHome";
import TeacherAssignmentForm from "./components/teacher/TeacherAssignmentForm";
import Login from "./components/Login";
import Home from "./components/Home/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import ErrorPage from "./components/page/ErrorPage";
import Unauthorized from "./components/page/Unauthorized";
import RestrictedStudent from "./components/Layout/RestrictedStudent";
import RestrictedTeacher from "./components/Layout/RestrictedTeacher";
import Assignment from "./components/coding/Assignment";
import RestrictedAdmin from "./components/Layout/RestrictedAdmin";
import CreateTeacher from "./components/Admin/CreateTeacher";
import CreateStudent from "./components/Admin/CreateStudent";
import CreateCourse from "./components/Admin/CreateCourse";
import AssignStudents from "./components/Admin/AssignStudents";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <Login /> },
      {
        element: <RestrictedStudent />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/unauthorized", element: <Unauthorized /> },
          { path: "/code/:assignmendid", element: <Assignment /> },
        ],
      },
      {
        element: <RestrictedTeacher />,
        children: [
          {path: "/create", element: <TeacherAssignmentForm />}
          // {path: '/code', element}
        ]
      },
      {
        element: <RestrictedAdmin />,
        children: [
          {path: "/createteacher", element: <CreateTeacher />},
          {path: "/createstudent", element: <CreateStudent />},
          {path: "/createcourse", element: <CreateCourse />},
          {path: "/assign", element: <AssignStudents />},
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
