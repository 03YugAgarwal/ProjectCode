import { useNavigate } from "react-router-dom"

const AssignmentCard = ({ assignment, navigateLink }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    // navigate(`/code/${assignment._id}`)
    navigate(navigateLink)
  }

  const formatDate = (date) => {
    if (!date) return "--";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString(); // This formats the date to a readable format
  }

  return (
    <div onClick={handleClick}>
      <h1>{assignment?.title}</h1>
      <h3>{assignment?.numberOfCodes}</h3>
      <h3>{assignment?.type}</h3>
      <h5>Start By: {formatDate(assignment?.startBy)}</h5>
      <h5>Finish By: {formatDate(assignment?.submitBy)}</h5>
    </div>
  )
}

export default AssignmentCard;