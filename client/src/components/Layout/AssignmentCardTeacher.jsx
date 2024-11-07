import { useNavigate } from "react-router-dom"

const AssignmentCard = ({ assignment, navigateLink }) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    // navigate(`/code/${assignment._id}`)
    navigate(navigateLink)
  }
  const handleDelete = () => {

  }
  const handleEvaluate = () => {

  }

  const formatDate = (date) => {
    if (!date) return "--";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString(); // This formats the date to a readable format
  }

  return (
    <div>
      <h1>{assignment?.title}</h1>
      <h3>{assignment?.numberOfCodes}</h3>
      <h3>{assignment?.type}</h3>
      <h5>Start By: {formatDate(assignment?.startBy)}</h5>
      <h5>Finish By: {formatDate(assignment?.submitBy)}</h5>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEvaluate}>Evaluate</button>
    </div>
  )
}

export default AssignmentCard;