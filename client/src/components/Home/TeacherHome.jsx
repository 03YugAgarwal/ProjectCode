import { Link } from 'react-router-dom'
import UpdatePage from '../teacher/UpdatePage'

const TeacherHome = () => {
  return (
    <>
      <h1>Teacher home</h1>
      <Link to="/create">Create Assignment</Link>
      <br />
      {/* <Link to="/update">Update Assignment</Link>
      <br />
      <Link to="">Evaluate Assignment</Link> */}
      <UpdatePage />
    </>
  )
}

export default TeacherHome