import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import "../styles/KanbanBoard.css";

const KanbanBoard = ({ kanbanData }) => {
  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    done: []
  });

  const [showForm, setShowForm] = useState(false); // ✅ Track Task Form Visibility

  useEffect(() => {
    if (kanbanData) {
      setTasks({
        todo: kanbanData.todo || [],
        inprogress: kanbanData.inprogress || [],
        done: kanbanData.done || [],
      });
    }
  }, [kanbanData]);

  const refreshTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/kanbanBoard/get/${kanbanData.id}`, {
        withCredentials: true,
      });
      setTasks({
        todo: response.data.todo || [],
        inprogress: response.data.inprogress || [],
        done: response.data.done || [],
      });
    } catch (error) {
      console.error("❌ Failed to refresh tasks", error);
    }
  };

  // ✅ Ensure this function properly updates the state
  const handleOpenForm = () => {
    console.log("Opening Task Form...");
    setShowForm(true);
  };

  return (
    <div>
      {kanbanData.name}
      <DragDropContext>
        <div className="kanban-container">
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided) => (
                <div className="kanban-column" ref={provided.innerRef} {...provided.droppableProps}>
                  <h2>{columnId.toUpperCase()}</h2>
                  {columnTasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}

                  {columnId === "todo" && (
                    <button className="add-task-btn" onClick={handleOpenForm}>
                      ➕ Add Task
                    </button>
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* ✅ Add Task Form appears when showForm is true */}
      {showForm && (
        <AddTaskForm 
          kanbanBoardId={kanbanData.id} 
          closeForm={() => setShowForm(false)} 
          refreshTasks={refreshTasks} 
        />
      )}
    </div>
  );
};

export default KanbanBoard;
