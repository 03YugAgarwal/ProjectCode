import CodingEditor from "./CodingEditor";

import styles from './Assignment.module.css'

const CodingHome = ({ data, questionNumber }) => {
  if (!data) {
    return <p>Error in fetching data</p>;
  }
  if (!questionNumber) {
    return <p>No question exists</p>;
  }

  data = data?.question[questionNumber - 1];

  return (
    <div>
      {/* <p>Question Number: {data?.number}</p> */}
      <p className={styles.question}  style={{ whiteSpace: "pre-wrap" }}>{data?.question}</p>
      <CodingEditor data={data} />
    </div>
  );
};

export default CodingHome;
