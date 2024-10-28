// import CodingHome from "./components/coding/CodingHome"
// import TeacherAssignmentForm from "./components/teacher/TeacherAssignmentForm"
import Login from "./components/Login";
import Home from "./components/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import ErrorPage from "./components/page/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
    ],
  },
  // {
  //   path: '/admin',
  // }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
