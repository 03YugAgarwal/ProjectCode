import { useState } from "react";
import { executeCode } from "../../api";

const CodeOutput = ({ editorRef, language, data }) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passedCount, setPassedCount] = useState(0);

  const onCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) return;

    setIsLoading(true);
    setOutput([]);
    setPassedCount(0);

    let newOutput = [];
    let countPassed = 0;

    try {
      for (const testcase of data?.testCases || []) {
        const { input, output: expectedOutput } = testcase;

        const { run: result } = await executeCode(language, code, input);

        const actualOutput = result.output.trim();
        newOutput.push({ input, actualOutput, expectedOutput });
        
        if (actualOutput === expectedOutput.trim()) {
          countPassed += 1;
        }
      }

      setOutput(newOutput);
      setPassedCount(countPassed);
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