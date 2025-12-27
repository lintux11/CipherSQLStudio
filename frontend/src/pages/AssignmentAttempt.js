import { useEffect, useState } from "react";
import { getAssignmentById, executeQuery, getHint } from "../api/api";

const AssignmentAttempt = ({ assignmentId, onBack }) => {
  const [assignment, setAssignment] = useState(null);
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState("");

  useEffect(() => {
    getAssignmentById(assignmentId).then(setAssignment);
  }, [assignmentId]);

  if (!assignment) return <p>Loading...</p>;

  const runQuery = async () => {
    const res = await executeQuery({ assignmentId, sqlQuery: sql });
    setResult(res);
  };

  const fetchHint = async () => {
    const res = await getHint({ assignmentId, sqlQuery: sql });
    setHint(res.hint);
  };

  return (
    <div className="container">
      <button onClick={onBack}>⬅ Back</button>

      <div className="card">
        <h2>{assignment.title}</h2>
        <p>{assignment.question}</p>

        <textarea
          rows={6}
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="Write your SQL here"
        />

        <br /><br />
        <button onClick={runQuery}>Execute</button>
        <button onClick={fetchHint}>Get Hint</button>

        {hint && <p><b>Hint:</b> {hint}</p>}

        {result?.rows && (
          <pre>{JSON.stringify(result.rows, null, 2)}</pre>
        )}

        {result?.error && <p style={{ color: "red" }}>{result.error}</p>}
      </div>
    </div>
  );
};

export default AssignmentAttempt;
