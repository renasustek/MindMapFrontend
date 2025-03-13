import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../styles/ProgressTracker.css"; // Updated CSS

const ProgressTracker = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(7);
  const [timeframe, setTimeframe] = useState(80);

  // Fetch progress data
  const fetchProcrastinationData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/procrastinationLevel?intervalDays=${interval}&timeframeDays=${timeframe}`,
        { withCredentials: true }
      );

      const formattedData = response.data.map((entry) => ({
        date: entry.endDate,
        procrastinationScore: entry.procrastinationScore,
      }));

      setData(formattedData);
    } catch (error) {
      console.error("❌ Failed to fetch procrastination data:", error);
    }
  };

  useEffect(() => {
    fetchProcrastinationData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProcrastinationData();
  };

  return (
    <div className="progress-tracker">
      <h2 className="tracker-title">📊 Procrastination Progress Tracker</h2>

      {/* Chart Section */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "8px", color: "white" }} />
            <Line type="monotone" dataKey="procrastinationScore" stroke="#00ff99" strokeWidth={3} dot={{ fill: "#00ff99", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Form Section */}
      <form className="input-container" onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="interval">Interval (Days):</label>
          <input
            type="number"
            id="interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="input-box">
          <label htmlFor="timeframe">Timeframe (Days):</label>
          <input
            type="number"
            id="timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            min="1"
            required
          />
        </div>

        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default ProgressTracker;
