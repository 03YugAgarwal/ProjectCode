import { useNavigate } from "react-router-dom";
import styles from "./AssignmentCardTeacher.module.css";
import { useState } from "react";

import Modal from "../ui/Modal";

const AssignmentCard = ({ assignment, navigateLink }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/code/${assignment._id}`)
    navigate(navigateLink);
  };

  const formatDate = (date) => {
    if (!date) return "--";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modal}>
          <p>Are you sure you want to start the test?</p>
          <button onClick={handleClick}>Continue</button>
        </div>
      </Modal>
      <div onClick={() => setIsOpen(true)} className={styles.card}>
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
      </div>
    </>
  );
};

export default AssignmentCard;
