import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import KanbanBoard from "../components/KanbanBoard";

const GoalPage = () => {
  const { goalId, kanbanBoardId, specificSteps, measureProgress, isGoalRealistic, dueDate, completedDate } = useParams();
  const [kanbanData, setKanbanData] = useState(null);

  useEffect(() => {
    // Fetch Kanban Board Data from Backend
    axios
      .get(`http://localhost:8080/kanbanBoard/get/${kanbanBoardId}`, { withCredentials: true })
      .then((response) => {
        console.log("Kanban Board Data:", response.data);
        setKanbanData(response.data);
      })
      .catch((error) => console.error("Failed to fetch Kanban Board data", error));
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

      {/* Render Kanban Board if Data is Available */}
      {kanbanData ? (
        <KanbanBoard initialTasks={kanbanData} />
      ) : (
        <p>Loading Kanban Board...</p>
      )}
    </div>
  );
};

export default GoalPage;
