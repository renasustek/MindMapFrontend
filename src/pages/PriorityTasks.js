import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PriorityTasks.css"; 

const PriorityTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPriorityTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/mainKanban", {
          withCredentials: true,
        });
        setTasks(response.data || []);
      } catch (error) {
        console.error("❌ Failed to fetch prioritized tasks:", error);
      }
    };

    fetchPriorityTasks();
  }, []);

  return (
    <div className="priority-tasks-container">
      <h1 className="title">Prioritised Tasks</h1>
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h2>{task.name}</h2>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Due Date:</strong> {task.dueDate || "No due date"}</p>
              <p><strong>Status:</strong> {task.taskStatus}</p>
            </div>
          ))
        ) : (
          <p className="no-tasks">No prioritized tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default PriorityTasks;
