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

  const [showForm, setShowForm] = useState(false);

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
      console.error("Failed to refresh tasks", error);
    }
  };

  // ✅ Drag & Drop logic: Move tasks between columns
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;
    const taskIndex = result.source.index;

    const updatedTasks = { ...tasks };

    // Remove task from source column
    const [movedTask] = updatedTasks[sourceCol].splice(taskIndex, 1);
    updatedTasks[destCol].splice(result.destination.index, 0, movedTask);

    setTasks({ ...updatedTasks });

    const newStatus = destCol.toUpperCase(); // "todo" -> "TODO", "inprogress" -> "INPROGRESS", "done" -> "DONE"

    try {
      await axios.post(
        `http://localhost:8080/task/change-status/${movedTask.id}`,
        { newStatus },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(`✅ Task ${movedTask.id} moved to ${newStatus}`);
    } catch (error) {
      console.error(`❌ Failed to update task status for ${movedTask.id}`, error);
    }
  };

  return (
    <div>
      {kanbanData.name}
      <DragDropContext onDragEnd={onDragEnd}> {/* ✅ Fix: Add onDragEnd */}
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
                    <button className="add-task-btn" onClick={() => setShowForm(true)}>➕ Add Task</button>
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {showForm && <AddTaskForm kanbanBoardId={kanbanData.id} closeForm={() => setShowForm(false)} refreshTasks={refreshTasks} />}
    </div>
  );
};

export default KanbanBoard;
