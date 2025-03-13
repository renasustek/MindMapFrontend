import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ProgressTracker = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(7); // Default Interval
  const [timeframe, setTimeframe] = useState(80); // Default Timeframe

  // Function to fetch data based on user inputs
  const fetchProcrastinationData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/procrastinationLevel?intervalDays=${interval}&timeframeDays=${timeframe}`, {
        withCredentials: true,
      });

      // ✅ Format data correctly for recharts
      const formattedData = response.data.map((entry) => ({
        date: entry.endDate, // ✅ X-Axis Label
        procrastinationScore: entry.procrastinationScore, // ✅ Y-Axis Value
      }));

      setData(formattedData);
    } catch (error) {
      console.error("❌ Failed to fetch procrastination data:", error);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchProcrastinationData();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ Prevents page reload
    fetchProcrastinationData();
  };

  return (
    <div className="progress-tracker">
      <h2 className="text-center text-2xl font-bold mb-6">Procrastination Progress Tracker</h2>

      {/* ✅ Interval & Timeframe Inputs - Now Fully Visible */}
      

      {/* ✅ Line Chart */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="procrastinationScore" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
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

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default ProgressTracker;
