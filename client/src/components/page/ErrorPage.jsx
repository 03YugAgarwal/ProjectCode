import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <>
    <h1>404 - Page not found</h1>
    <p>Are you sure you are supposed to be here?</p>
    <Link to='/'>Go to Home</Link>
    </>
  )
}

export default ErrorPage