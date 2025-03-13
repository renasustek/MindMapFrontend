import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LabelDropdown.css";

const LabelDropdown = ({ selectedLabel, setSelectedLabel }) => {
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
    const selectedUuid = e.target.value;
    
    if (selectedUuid === "add-new") {
      setShowAddLabel(true);
    } else {
      const selectedLabelObj = labels.find(label => label.uuid === selectedUuid);
      setSelectedLabel(selectedLabelObj || null); // ✅ Store the whole object
    }
  };

  return (
    <div className="label-dropdown">
      <select value={selectedLabel ? selectedLabel.uuid : ""} onChange={handleLabelChange}>
        <option value="">Select Label...</option> {/* ✅ Default option */}
        {labels.map((label) => (
          <option key={label.uuid} value={label.uuid}>
            {label.name} {/* ✅ Show name but store full object */}
          </option>
        ))}
        <option key="add-new" value="add-new" className="add-label-option">➕ Add New Label</option>
      </select>
    </div>
  );
};

export default LabelDropdown;
