import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import KanbanBoard from "../components/KanbanBoard";

const GoalPage = () => {
  const { goalId, kanbanBoardId, specificSteps, measureProgress, isGoalRealistic, dueDate, completedDate } = useParams();
  const [kanbanData, setKanbanData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/kanbanBoard/get/${kanbanBoardId}`, { withCredentials: true })
      .then((response) => {
        console.log("Kanban Board Data:", response.data);
        setKanbanData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch Kanban Board data", error);
        setLoading(false);
      });
  }, [kanbanBoardId]);

  return (
    <div className="goal-container">
      <h1>Goal Details</h1>
      <p><strong>UUID:</strong> {goalId}</p>
      <p><strong>Kanban Board ID:</strong> {kanbanBoardId}</p>
      <p><strong>Specific Steps:</strong> {specificSteps}</p>
      <p><strong>Measure Progress:</strong> {measureProgress}</p>
      <p><strong>Is Goal Realistic:</strong> {isGoalRealistic ? "Yes" : "No"}</p>
      <p><strong>Due Date:</strong> {dueDate}</p>
      <p><strong>Completed Date:</strong> {completedDate || "Not Completed Yet"}</p>

      {/* Show Kanban Board if data is available */}
      {loading ? <p>Loading Kanban Board...</p> : <KanbanBoard kanbanData={kanbanData} />}
    </div>
  );
};

export default GoalPage;
