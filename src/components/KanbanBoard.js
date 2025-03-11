import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/KanbanBoard.css";

const KanbanBoard = ({ initialTasks }) => {
  const [tasks, setTasks] = useState({
    todo: initialTasks.todo || [],
    inprogress: initialTasks.inprogress || [],
    done: initialTasks.done || [],
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceCol = result.source.droppableId;
    const destCol = result.destination.droppableId;
    const taskIndex = result.source.index;

    // Copy current tasks
    const updatedTasks = { ...tasks };
    const [movedTask] = updatedTasks[sourceCol].splice(taskIndex, 1);
    updatedTasks[destCol].splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };

  const columnNames = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container">
        {Object.keys(tasks).map((columnId) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div className="kanban-column" {...provided.droppableProps} ref={provided.innerRef}>
                <h2>{columnNames[columnId]}</h2>
                {tasks[columnId].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="kanban-task"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p className="task-title">{task.name}</p>
                        <p className="task-desc">{task.description}</p>
                        <div className="task-footer">
                          <span className="task-label">{task.labelId || "No Label"}</span>
                          <span className="task-date">End Date: {task.dueDate || "N/A"}</span>
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
    