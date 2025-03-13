import React, { useState, useEffect } from "react";
import axios from "axios";
import AddLabelForm from "./AddLabelForm";
import "../styles/LabelDropdown.css";

const LabelDropdown = ({ selectedLabelId, onLabelChange }) => {
  const [labels, setLabels] = useState([]);
  const [showAddLabel, setShowAddLabel] = useState(false);
  
  // Fetch all labels from the backend
  const fetchLabels = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/labels", {
        withCredentials: true,
      });
      setLabels(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch labels:", error);
    }
  };
  
  useEffect(() => {
    fetchLabels();
  }, []);
  
  const handleLabelChange = (e) => {
    if (e.target.value === "add-new") {
      setShowAddLabel(true);
    } else {
      onLabelChange(e.target.value);
    }
  };
  
  return (
    <div className="label-dropdown">
      <select 
        value={selectedLabelId || ""} 
        onChange={handleLabelChange}
      >
        <option key="default-option" value="">Select Label...</option>
        {labels.map((label) => (
          <option key={label.id || `label-${label.name}`} value={label.id}>
            {label.name}
          </option>
        ))}
        <option key="add-new" value="add-new" className="add-label-option">
          ➕ Add New Label
        </option>
      </select>
      
      {showAddLabel && (
        <AddLabelForm 
          closeForm={() => setShowAddLabel(false)} 
          refreshLabels={fetchLabels} 
        />
      )}
    </div>
  );
};

export default LabelDropdown;