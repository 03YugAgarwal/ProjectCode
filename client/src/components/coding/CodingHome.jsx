import CodingEditor from "./CodingEditor";

import styles from "./Assignment.module.css";
import Modal from "../ui/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CodingHome = ({ data, questionNumber }) => {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  if (!data) {
    return <p>Error in fetching data</p>;
  }
  if (!questionNumber) {
    return <p>No question exists</p>;
  }

  data = data?.question[questionNumber - 1];


  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modal}>
          <h3>Are you sure you want to end the test?</h3>
          <p>Make sure to click 'Run Code' to save the code!</p>
          <button onClick={handleClick}>End Test</button>
        </div>
      </Modal>
      <div>
        {/* <p>Question Number: {data?.number}</p> */}
        <p className={styles.question} style={{ whiteSpace: "pre-wrap" }}>
          {data?.question}
        </p>
        <CodingEditor data={data} />
        <button className={styles.button1} onClick={() =>setIsOpen(true)}>End Test</button>
      </div>
    </>
  );
};

export default CodingHome;
