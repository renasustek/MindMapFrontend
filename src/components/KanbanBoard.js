import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import "../styles/KanbanBoard.css";

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

const KanbanBoard = ({ initialTasks }) => {
  const [tasks, setTasks] = useState({
    todo: initialTasks.todo || [],
    inprogress: initialTasks.inprogress || [],
    done: initialTasks.done || [],
  });

  useEffect(() => {
    setTasks({
      todo: initialTasks.todo || [],
      inprogress: initialTasks.inprogress || [],
      done: initialTasks.done || [],
    });
  }, [initialTasks]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;
    const taskIndex = result.source.index;

    const updatedTasks = { ...tasks };

    // Find the moved task and remove it from the source column
    const [movedTask] = updatedTasks[sourceCol].splice(taskIndex, 1);
    updatedTasks[destCol].splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);

    // Convert column ID to task status
    const newStatus = destCol.toUpperCase(); // Converts "todo" -> "TODO", "inprogress" -> "INPROGRESS", "done" -> "DONE"

    try {
      await axios.post(`http://localhost:8080/task/change-status/${movedTask.id}`, newStatus, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(`Task ${movedTask.id} moved to ${newStatus}`);
    } catch (error) {
      console.error(`Failed to update task status for ${movedTask.id}`, error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div className="kanban-column" {...provided.droppableProps} ref={provided.innerRef}>
                <h2>{columnId.replace(/([A-Z])/g, " $1").trim()}</h2>
                {columnTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="kanban-task"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{ backgroundColor: getTaskColor(task.eisenhowerMatrix) }}
                      >
                        <p className="task-title">{task.name}</p>
                        <p className="task-desc">{task.description}</p>
                        <div className="task-info">
                          <p><strong>Created:</strong> {task.createdDate}</p>
                          <p><strong>Due:</strong> {task.dueDate || "N/A"}</p>
                          {columnId === "done" && <p><strong>Completed:</strong> {task.completedDate || "N/A"}</p>}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
