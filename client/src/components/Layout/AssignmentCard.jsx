const AssignmentCard = ({assignment}) => {
  
  return (
    <div>
        <h1>{assignment?.title}</h1>
        <h3>{assignment?.numberOfCodes}</h3>
        <h3>{assignment?.type}</h3>
        <h5>Start By: {assignment?.startBy ? assignment?.startBy : "--"}</h5>
        <h5>Finish By: {assignment?.submitBy ? assignment?.submitBy : "--"}</h5>
    </div>
  )
}

export default AssignmentCard