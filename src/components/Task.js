import React from "react";

// Function to determine task color based on EisenhowerMatrix
const getTaskColor = (matrix) => {
  switch (matrix) {
    case "DO":
      return "#4CAF50"; // Green
    case "DECIDE":
      return "#2196F3"; // Blue
    case "DELEGATE":
      return "#03A9F4"; // Light Blue
    case "DELETE":
      return "#F44336"; // Red
    default:
      return "#FFFFFF"; // Default White
  }
};

const Task = ({task}) => {
  return (
        <div
          className="kanban-task"
          style={{ backgroundColor: getTaskColor(task.eisenhowerMatrix) }}
        >
          <p className="task-title">{task.name}</p>
          <p className="task-desc">{task.description}</p>
          <div className="task-info">
            <p><strong>Created:</strong> {task.createdDate}</p>
            <p><strong>Due:</strong> {task.dueDate || "N/A"}</p>
            {task.completedDate && <p><strong>Completed:</strong> {task.completedDate}</p>}
          </div>
        </div>
     
  );
};

export default Task;
