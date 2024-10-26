// import { useEffect } from "react";
import AssignmentCard from "./Layout/AssignmentCard";

const Home = () => {


  return (
    <>
      <select name="course" id="course">
        <option value="course1">Course1</option>
        <option value="course1">Course2</option>
        <option value="course1">Course3</option>
      </select>
      <div>
        <h2>Upcoming Assignments: </h2>
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
        <AssignmentCard />
      </div>
    </>
  );
};

export default Home;
