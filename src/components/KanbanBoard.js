import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import "../styles/KanbanBoard.css";

const KanbanBoard = ({ kanbanData }) => {
  // ✅ Ensure default empty board structure
  const [tasks, setTasks] = useState({
    todo: [],
    inprogress: [],
    done: []
  });

  const [showForm, setShowForm] = useState(false);

  // ✅ Load tasks when `kanbanData` changes
  useEffect(() => {
    if (kanbanData) {
      setTasks({
        todo: Array.isArray(kanbanData.todo) ? kanbanData.todo : [],
        inprogress: Array.isArray(kanbanData.inprogress) ? kanbanData.inprogress : [],
        done: Array.isArray(kanbanData.done) ? kanbanData.done : [],
      });
    }
  }, [kanbanData]);

  // ✅ Refresh tasks from backend
  const refreshTasks = async () => {
    if (!kanbanData?.id) return;

    try {
      const response = await axios.get(`http://localhost:8080/kanbanBoard/get/${kanbanData.id}`, {
        withCredentials: true,
      });

      setTasks({
        todo: Array.isArray(response.data.todo) ? response.data.todo : [],
        inprogress: Array.isArray(response.data.inprogress) ? response.data.inprogress : [],
        done: Array.isArray(response.data.done) ? response.data.done : [],
      });
    } catch (error) {
      console.error("❌ Failed to refresh tasks", error);
    }
  };

  // ✅ Drag and Drop functionality
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    // Copy current tasks
    const updated = { ...tasks };
    // Remove from source
    const [movedTask] = updated[sourceCol].splice(source.index, 1);
    // Insert into destination
    updated[destCol].splice(destination.index, 0, movedTask);

    setTasks(updated);

    // ✅ Update backend with new task status
    try {
      const newStatus = destCol.toUpperCase();
      await axios.post(
        `http://localhost:8080/task/change-status/${movedTask.id}`,
        { newStatus },
        { withCredentials: true }
      );
      console.log(`✅ Moved task ${movedTask.id} to ${newStatus}`);
    } catch (error) {
      console.error(`❌ Failed to move task ${movedTask.id}`, error);
      refreshTasks(); // Fallback if request fails
    }
  };

  return (
    <div className="kanban-board">

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-container">
          {["todo", "inprogress", "done"].map((colId) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2>{colId.toUpperCase()}</h2>

                  {/* ✅ Show tasks if they exist, otherwise display placeholder */}
                  {tasks[colId].length > 0 ? (
                    tasks[colId].map((task, index) => (
                      <Draggable
                        key={String(task.id)}
                        draggableId={String(task.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-wrapper"
                          >
                            <Task task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p className="empty-column">No tasks yet...</p>
                  )}

                  {provided.placeholder}

                  {/* ✅ Only show "Add Task" in the To-Do column */}
                  {colId === "todo" && (
                    <button
                      className="add-task-btn"
                      onClick={() => setShowForm(true)}
                    >
                      ➕ Add Task
                    </button>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {showForm && (
        <AddTaskForm
          kanbanBoardId={kanbanData?.id || ""}
          closeForm={() => setShowForm(false)}
          refreshTasks={refreshTasks}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
