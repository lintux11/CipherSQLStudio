import "./styles/main.scss";
import { useState } from "react";
import AssignmentList from "./pages/AssignmentList";
import AssignmentAttempt from "./pages/AssignmentAttempt";

function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      {!selectedId ? (
        <AssignmentList onSelect={setSelectedId} />
      ) : (
        <AssignmentAttempt
          assignmentId={selectedId}
          onBack={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

export default App;
