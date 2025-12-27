import { useEffect, useState } from "react";
import { getAssignments } from "../api/api";

const AssignmentList = ({ onSelect }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignments()
      .then((data) => {
        setAssignments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load assignments", err);
        setAssignments([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading assignments...</p>;
  }

  return (
    <div className="container">
      <h2>SQL Assignments</h2>

      {assignments.length === 0 && <p>No assignments found.</p>}

      {assignments.map((assignment) => (
        <div className="card" key={assignment._id}>
          <h3>{assignment.title}</h3>
          <p>Difficulty: {assignment.difficulty}</p>
          <button onClick={() => onSelect(assignment._id)}>
            Solve
          </button>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;
