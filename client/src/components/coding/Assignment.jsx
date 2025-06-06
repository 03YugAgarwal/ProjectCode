import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
import CodingHome from "./CodingHome";

import styles from './Assignment.module.css'

const Assignment = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("user_token");

        const response = await fetch(
          `${BASE_URL}/student/assignment/${params.assignmendid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch assignment");
        }

        const data = await response.json();

        if (data) {
          setData(data);
        } else {
          setError("No such assignment available");
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
        setError("Error fetching assignment. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <p>Loading assignment...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formatDate = (date) => {
    if (!date) return "--";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString();
  };

  const handleQuestionClick = (questionNumber) => {
    setSelectedQuestion(questionNumber);
  };

  return (
    <div className={styles.container}>
      <h1>{data?.title}</h1>
      {/* <h3>{data?.description || null}</h3> */}
      {/* <p>Number of questions: {data?.numberOfCodes}</p> */}
      <p>Due Date: { formatDate(data?.submitBy) || "-- : --"}</p>

      <div>
        {Array.from({ length: data?.numberOfCodes || 0 }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleQuestionClick(index + 1)}
            className={`${styles.button} ${selectedQuestion === (index+1) ? styles.glow : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {selectedQuestion && (
        <CodingHome key={selectedQuestion} data={data} questionNumber={selectedQuestion} />
      )}
    </div>
  );
};

export default Assignment;
