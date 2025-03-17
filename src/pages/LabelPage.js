import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/LabelPage.css";

const LabelsPage = () => {
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch Labels from API
  useEffect(() => {
    fetchLabels();
  }, []);

  const fetchLabels = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/labels", {
        withCredentials: true,
      });
      setLabels(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch labels:", error);
      setError("Failed to load labels.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add a New Label
  const handleAddLabel = async (e) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/labels",
        { name: newLabel },
        { withCredentials: true }
      );

      setLabels([...labels, response.data]); // Add new label to state
      setNewLabel(""); // Clear input
    } catch (error) {
      console.error("❌ Failed to add label:", error);
      setError("Error adding label.");
    }
  };

  return (
    <div className="labels-container">
      <h1 className="title">Manage Labels</h1>

      {/* 📌 Add Label Form */}
      <form onSubmit={handleAddLabel} className="add-label-form">
        <input
          type="text"
          placeholder="Enter label name..."
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          required
        />
        <button type="submit">➕ Add Label</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading labels...</p>}

      {/* 📌 Display Labels */}
      <div className="labels-grid">
        {labels.map((label) => (
          <div key={label.uuid} className="label-card">
            <p>{label.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabelsPage;
