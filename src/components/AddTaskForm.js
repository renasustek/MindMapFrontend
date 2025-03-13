import React, { useState } from "react";
import axios from "axios";
import LabelDropdown from "./LabelDropdown";
import "../styles/AddTasksForm.css"; // ✅ Ensure this file exists

const AddTaskForm = ({ kanbanBoardId, closeForm, refreshTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [eisenhowerMatrix, setEisenhowerMatrix] = useState("DO");
  const [labelId, setLabelId] = useState(""); 
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formattedDueDate = dueDate ? new Date(dueDate).toISOString().split("T")[0] : null;
    
    const requestData = {
      kanbanboardUUID: kanbanBoardId,
      name: taskName,
      description: description,
      eisenhowerMatrix: eisenhowerMatrix,
      labelId: labelId.uuid || null,
      dueDate: formattedDueDate ? new Date(formattedDueDate) : null,
    };
    
    console.log(requestData);

    try {
      await axios.post("http://localhost:8080/task/create", requestData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      console.log("✅ Task Created:", requestData);
      refreshTasks();
      closeForm();
    } catch (error) {
      console.error("❌ Failed to create task", error);
    }
  };

  return (
    <div className="overlay"> {/* ✅ Ensures full-page overlay */}
      <div className="modal"> {/* ✅ Centers the popup */}
        <button className="close-btn" onClick={closeForm}>✖</button>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Task name..." value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
          <textarea placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

          <div className="task-options">
            <button type="button" className={eisenhowerMatrix === "DO" ? "selected" : ""}
              onClick={() => setEisenhowerMatrix("DO")}>Do</button>
            <button type="button" className={eisenhowerMatrix === "DECIDE" ? "selected" : ""}
              onClick={() => setEisenhowerMatrix("DECIDE")}>Schedule</button>
            <button type="button" className={eisenhowerMatrix === "DELEGATE" ? "selected" : ""}
              onClick={() => setEisenhowerMatrix("DELEGATE")}>Delegate</button>
            <button type="button" className={eisenhowerMatrix === "DELETE" ? "selected" : ""}
              onClick={() => setEisenhowerMatrix("DELETE")}>Delete</button>
          </div>

          <LabelDropdown selectedLabel={labelId} setSelectedLabel={setLabelId} />

          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />

          <button type="submit" className="create-btn">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
