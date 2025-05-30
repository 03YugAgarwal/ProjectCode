// import CodingHome from "./components/coding/CodingHome";
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
import UpdatePage from "./components/teacher/UpdatePage";
// import UpdateTeacherAssignmentForm from "./components/teacher/UpdateTeacherAssignmentForm";
import UpdateAssignmentForm from "./components/teacher/UpdateAssignmentForm";
import Evaluate from "./components/teacher/Evaluate";

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
          {path: "/create", element: <TeacherAssignmentForm />},
          // {path: "/update", element: <UpdatePage />},
          // {path: "/update/:id", element: <UpdateTeacherAssignmentForm />},
          {path: "/update/:id", element: <UpdateAssignmentForm />},
          {path: "/evaluate/:id", element: <Evaluate />},
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
