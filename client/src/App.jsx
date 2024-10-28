import CodingHome from "./components/coding/CodingHome"
// import TeacherAssignmentForm from "./components/teacher/TeacherAssignmentForm"
import Login from "./components/Login";
import Home from "./components/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import ErrorPage from "./components/page/ErrorPage";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/page/Unauthorized";

const ROLES = {
  'User': 0,
  'Teacher': 1,
  'Admin': 2
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      {path: '/unauthorized', element: <Unauthorized />},
      {
        element: <RequireAuth allowedRoles={[ROLES.User]} />,
        children: [
          {path: "/code", element: <CodingHome />}
        ]
      }
    ],
  },
  // {
  //   path: '/admin',
  // }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
