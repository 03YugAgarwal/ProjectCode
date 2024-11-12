import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../../constants";
import { useParams } from "react-router-dom";

const Evaluate = () => {
  const { id } = useParams(); // Get the id from URL parameters
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      const token = Cookies.get("user_token");
      try {
        const response = await fetch(`${BASE_URL}/answer/submission`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ assignmentID: id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Group data by `studentid`
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.studentid]) {
      acc[item.studentid] = [];
    }
    acc[item.studentid].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedData).map((studentid) => (
        <div key={studentid} style={{ marginBottom: "20px" }}>
          <h3>Student ID: {studentid}</h3>
          <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Question Number</th>
                <th>Count Passed</th>
                <th>Code</th>
                <th>Output Details</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[studentid].map((answer) => (
                <tr key={answer._id}>
                  <td>{answer.questionNumber}</td>
                  <td>
                    {answer.countPassed} / {answer.output.length}
                  </td>
                  <td>
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                      {answer.code} {/* Display code here with formatting */}
                    </pre>
                  </td>
                  <td>
                    <table border="1" cellPadding="5" cellSpacing="0">
                      <thead>
                        <tr>
                          <th>Input</th>
                          <th>Actual Output</th>
                          <th>Expected Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        {answer.output.map((outputItem) => (
                          <tr key={outputItem._id}>
                            <td>{outputItem.input}</td>
                            <td>{outputItem.actualOutput}</td>
                            <td>{outputItem.expectedOutput}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Evaluate;
