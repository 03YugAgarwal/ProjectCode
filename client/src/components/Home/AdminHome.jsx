import React from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  return (
    <>
      <h1>Admin Home</h1>
      <Link to="/createteacher">Create Teacher Login</Link>
      <br />
      <Link to="/createstudent">Create Student Login</Link>
      <br />
      <Link to="/createcourse">Create Course</Link>
      <br />
      <Link to="/assign">Assign Students to Course</Link>

    </>
  )
}

export default AdminHome