import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateGoal.css";
import { Link, useNavigate } from "react-router-dom";

const CreateGoal = () => {
    const [kanbanBoardName, setKanbanBoardName] = useState("");
    const [specificSteps, setSpecificSteps] = useState("");
    const [measureProgress, setMeasureProgress] = useState("");
    const [isGoalRealistic, setIsGoalRealistic] = useState(true);
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            kanbanBoardName,
            specificSteps,
            measureProgress,
            isGoalRealistic,
            dueDate: dueDate ? new Date(dueDate).toISOString().split("T")[0] : null,
        };

        try {
            await axios.post("http://localhost:8080/goal/create", requestData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            console.log("✅ Goal Created", requestData);
        } catch (error) {
            console.error("❌ Failed to create goal", error);
        }
    };

    return (
        <div className="overlay">
            <div className="modal">
                <h2>Create Goal</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" value={kanbanBoardName} onChange={(e) => setKanbanBoardName(e.target.value)} required />

                    <label>Specific</label>
                    <input type="text" value={specificSteps} onChange={(e) => setSpecificSteps(e.target.value)} required />

                    <label>Measurable</label>
                    <input type="text" value={measureProgress} onChange={(e) => setMeasureProgress(e.target.value)} required />

                    <label>Attainable</label>
                    <select value={isGoalRealistic} onChange={(e) => setIsGoalRealistic(e.target.value === "true")}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    <label>Time</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />

                    <div className="button-group">
                        <button type="submit">Submit</button>
                        <Link to="/">
                            <button type="button">Cancel</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateGoal;
