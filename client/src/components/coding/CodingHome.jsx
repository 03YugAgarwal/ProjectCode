import CodingEditor from "./CodingEditor";

const CodingHome = ({ data, questionNumber }) => {
  if (!data) {
    return <p>Error in fetching data</p>;
  }
  if (!questionNumber) {
    return <p>No question exists</p>;
  }

  data = data?.question[questionNumber - 1];

  return (
    <>
      <p>Question Number: {data?.number}</p>
      <p>{data?.question}</p>
      <CodingEditor data={data} />
      <p>Number of TestCases: {data?.numberOfTestCases}</p>
    </>
  );
};

export default CodingHome;
