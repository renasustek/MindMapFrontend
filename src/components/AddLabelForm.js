import React, { useState } from "react";
import axios from "axios";
import "../styles/AddLabelForm.css";

const AddLabelForm = ({ closeForm, refreshLabels }) => {
  const [labelName, setLabelName] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevents page reload
    
    try {
      const response = await axios.post("http://localhost:8080/api/labels", { name: labelName }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      console.log("✅ Label Created:", response.data);
      
      // Uncomment these lines to fix the issue
      refreshLabels(); // ✅ Updates label list after creation
      closeForm(); // ✅ Closes the modal after success
    } catch (error) {
      console.error("❌ Failed to create label", error);
    }
  };
  
  return (
    <div className="overlay">
      <div className="modal">
        <button className="close-btn" onClick={closeForm}>✖</button>
        <h2>Create Label</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Label name..."
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
            required
          />
          <button type="submit" className="create-btn">Create Label</button>
        </form>
      </div>
    </div>
  );
};

export default AddLabelForm;
