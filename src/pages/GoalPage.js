import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import KanbanBoard from "../components/KanbanBoard";
import "../styles/GoalPage.css"; // Import updated styles

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
        if (error.response && error.response.status === 404) {
          console.warn("Kanban Board not found (404). Setting data to null.");
          setKanbanData(); // ✅ Set kanbanData to null if 404
        } else {
          console.error("Failed to fetch Kanban Board data", error);
        }
        setLoading(false);
      });
  }, [kanbanBoardId]);

  return (
    <div className="goal-container">
      <h1 className="goal-title">{kanbanData?.name || "Goal"}</h1>

      <div className="kanban-board-container">
        {loading ? <p>Loading Kanban Board...</p> : <KanbanBoard kanbanData={kanbanData} />}
      </div>

      {/* Goal Details Section */}
      <div className="goal-details">
        <p><strong>Specific Steps:</strong> {specificSteps}</p>
        <p><strong>Measure Progress:</strong> {measureProgress}</p>
        <p><strong>Is Goal Realistic:</strong> {isGoalRealistic ? "Yes" : "No"}</p>
        <p><strong>Due Date:</strong> {dueDate}</p>
        <p><strong>Completed Date:</strong> {completedDate || "Not Completed Yet"}</p>
      </div>
    </div>
  );
};

export default GoalPage;
