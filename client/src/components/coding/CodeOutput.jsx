import { useState } from "react";
// import { executeCode } from "../../api";
import { BASE_URL } from "../../constants";
import { useParams } from "react-router-dom";

import styles from "./Assignment.module.css";

import Cookies from "js-cookie";

const CodeOutput = ({ editorRef, language, data }) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passedCount, setPassedCount] = useState(0);

  const params = useParams();
  // console.log(data);
  // console.log(params);

  const onCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) return;

    setIsLoading(true);
    setOutput([]);
    setPassedCount(0);

    // let newOutput = [];
    // let countPassed = 0;

    let payload = {
      code,
      assignmentID: params.assignmendid,
      language,
      questionNumber: data.number,
    };

    const token = Cookies.get("user_token");

    try {
      const response = await fetch(BASE_URL + "/answer/check", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Couldnot submit code, try again later");
      }

      const data1 = await response.json();

      setOutput(data1?.output);
      // console.log(output);

      setPassedCount(data1?.countPassed);
    } catch (error) {
      console.error("Error executing code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.output}>
      <button onClick={onCode} disabled={isLoading} className={styles.button}>
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <h3>Output</h3>

      <div>
        {output.length > 0 ? (
          output.map((result, i) => (
            <div key={i} className={`${styles.testCases} ${result.actualOutput === result.expectedOutput ? styles.passed : styles.failed}`}>
              <div className={styles.input}>
                <h4>Input</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>{result.input}</p>
              </div>
              <div className={styles.expectedOutput}>
                <h4>Expected Output:</h4>
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {result.expectedOutput}
                </p>
              </div>
              <div className={styles.actualOutput}>
                <h4>Your Output: </h4>
                <p style={{ whiteSpace: "pre-wrap" }}>{result.actualOutput}</p>
                {/* <p>
                  {result.actualOutput === result.expectedOutput
                    ? "✅ Passed"
                    : "❌ Failed"}
                </p> */}
              </div>
            </div>
          ))
        ) : (
          <p>Click "Run Code" to see the output here.</p>
        )}
      </div>

      <div className={styles.summary}>
        <h3>Summary:</h3>
        <p>
          {passedCount} / {data?.testCases?.length || 0} test cases passed.
        </p>
      </div>
    </div>
  );
};

export default CodeOutput;
