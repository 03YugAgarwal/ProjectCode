import { useState } from "react";
// import { executeCode } from "../../api";
import { BASE_URL } from "../../constants";
import { useParams } from "react-router-dom";

import Cookies from 'js-cookie'

const CodeOutput = ({ editorRef, language, data }) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passedCount, setPassedCount] = useState(0);

  const params = useParams()
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
      questionNumber: data.number
    }

    const token = Cookies.get('user_token')
    

    try {
      const response = await fetch(BASE_URL + "/answer/check", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      });

      if(!response.ok){
        throw new Error("Couldnot submit code, try again later")
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
    <>
      <h3>Output</h3>
      <button onClick={onCode} disabled={isLoading}>
        {isLoading ? "Running..." : "Run Code"}
      </button>

      <div>
        {output.length > 0 ? (
          output.map((result, i) => (
            <div key={i}>
              <p>Input: {result.input}</p>
              <p>Expected Output: {result.expectedOutput}</p>
              <p>Actual Output: {result.actualOutput}</p>
              <p>
                {result.actualOutput === result.expectedOutput
                  ? "✅ Passed"
                  : "❌ Failed"}
              </p>
            </div>
          ))
        ) : (
          <p>Click "Run Code" to see the output here.</p>
        )}
      </div>

      <div>
        <h3>Summary:</h3>
        <p>
          {passedCount} / {data?.testCases?.length || 0} test cases passed.
        </p>
      </div>
    </>
  );
};

export default CodeOutput;