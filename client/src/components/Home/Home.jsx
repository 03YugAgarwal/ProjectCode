import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TeacherHome from "./TeacherHome";
import StudentHome from "./StudentHome";

const Home = () => {

  const { userRole } = useContext(AuthContext);

  return userRole.includes(1) ? <TeacherHome /> : <StudentHome />
};

export default Home;