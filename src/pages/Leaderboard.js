import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const [userLevel, setUserLevel] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch User Level
    const fetchUserLevel = async () => {
      try {
        const response = await axios.get("http://localhost:8080/gamification/get-level", {
          withCredentials: true,
        });
        setUserLevel(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch user level:", error);
      }
    };

    // Fetch Leaderboard Data
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("http://localhost:8080/gamification/leaderboard", {
          withCredentials: true,
        });
        setLeaderboard(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch leaderboard:", error);
      }
    };

    fetchUserLevel();
    fetchLeaderboard();
  }, []);

  // Function to get background color based on ranking position
  const getRankColor = (index) => {
    if (index === 0) return "gold"; // 🥇 First place
    if (index === 1) return "silver"; // 🥈 Second place
    if (index === 2) return "bronze"; // 🥉 Third place
    return "blue"; // 🔵 Other positions
  };

  return (
    <div className="leaderboard-container">
      {/* ✅ User Level Section */}
      <div className="user-level">
        <h2>Your Level: {userLevel}</h2>
      </div>

      {/* ✅ Leaderboard Section */}
      <div className="leaderboard">
        <h2 className="leaderboard-title">LEADERBOARD</h2>
        
        {/* Leaderboard Header */}
        <div className="leaderboard-header">
          <div>Ranking</div>
          <div>Name</div>
          <div>XP</div>
        </div>

        {/* Leaderboard Entries */}
        {leaderboard.map((player, index) => (
          <div key={index} className={`leaderboard-row ${getRankColor(index)}`}>
            <div>{index + 1}</div>
            <div>{player.username}</div>
            <div>{player.xp}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
