import CodingHome from "./components/coding/CodingHome";
import TeacherAssignmentForm from "./components/teacher/TeacherAssignmentForm";
import Login from "./components/Login";
import Home from "./components/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import ErrorPage from "./components/page/ErrorPage";
import Unauthorized from "./components/page/Unauthorized";
import RestrictedStudent from "./components/Layout/RestrictedStudent";
import RestrictedTeacher from "./components/Layout/RestrictedTeacher";

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
          { path: "/code", element: <CodingHome /> },
        ],
      },
      {
        element: <RestrictedTeacher />,
        children: [
          {path: "/create", element: <TeacherAssignmentForm />}
          // {path: '/code', element}
        ]
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
