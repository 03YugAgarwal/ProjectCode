import { useNavigate } from "react-router-dom";
import styles from "./AssignmentCardTeacher.module.css";
import Button from "../ui/Button";
import { useState } from "react";
import Modal from "../ui/Modal";
import Delete from "../teacher/Delete";

const AssignmentCard = ({ assignment, navigateLink }) => {
  const [isOpen, setIsOpen] = useState();

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(navigateLink);
  };

  const handleDelete = () => {
    setIsOpen(true)
  };
  const handleEvaluate = () => {
    navigate("/evaluate/" + assignment._id);
  };

  const formatDate = (date) => {
    if (!date) return "--";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}><Delete assignment={assignment} /></Modal>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.title}>
            {assignment?.title || "Untitled Assignment"}
          </h1>
          <p className={styles.type}>{assignment?.type || "N/A"}</p>
        </div>
        <div className={styles.details}>
          <h3>
            Questions: <span>{assignment?.numberOfCodes || "0"}</span>
          </h3>
          <p>
            Start By: <span>{formatDate(assignment?.startBy)}</span>
          </p>
          <p>
            Finish By: <span>{formatDate(assignment?.submitBy)}</span>
          </p>
        </div>
        <div className={styles.buttonGroup}>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleEvaluate}>Evaluate</Button>
        </div>
      </div>
    </>
  );
};

export default AssignmentCard;
