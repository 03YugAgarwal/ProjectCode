import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";
import AdminHome from "./AdminHome";

const Home = () => {
  const { userRole } = useContext(AuthContext);

  return userRole.includes(2) ? (
    <AdminHome />
  ) : userRole.includes(1) ? (
    <TeacherHome />
  ) : (
    <StudentHome />
  );
};

export default Home;
