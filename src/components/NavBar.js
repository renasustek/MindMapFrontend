import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartLine, FaBook, FaPlus, FaRedo, FaUser, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import axios from "axios"; 
import "../styles/NavBar.css";


const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);

  const navigate = useNavigate();

  // Fetch goals when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/goal/all", { withCredentials: true })
        .then((response) => {
          setGoals(response.data || []);
          localStorage.setItem("goals", JSON.stringify(response.data || []));
        })
        .catch((error) => {
          console.error("Failed to fetch goals", error);
          setGoals([]);
        });
    }
  }, [isAuthenticated]);

  // Restore goals from localStorage on page load
  useEffect(() => {
    const savedGoals = localStorage.getItem("goals");
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const handleGoalClick = (goal) => {
    navigate(`/goal/${goal.uuid}/${goal.kanbanBoardId}/${goal.specificSteps}/${goal.measureProgress}/${goal.isGoalRealistic}/${goal.dueDate}/${goal.completedDate}`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo"></div>
          <h1>MindMap</h1>
        </div>

        <div className="nav-links">
          <Link to="/progressTracker"><FaChartLine /></Link>
          <Link to="/leaderboard"><FaBook /></Link>
          <div className="goal-buttons">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <button key={goal.uuid} onClick={() => handleGoalClick(goal)} className="goal-btn">
                GOAL
              </button>
            ))
          ) : (
            <p>No Goals Available</p>
          )}
        </div>

          <FaPlus />
        </div>

        {/* Goal Buttons */}
        
        <div className="user-section">
          <FaUser onClick={() => setShowModal(true)} className="cursor-pointer" title="Login/Register" />
          <FaSignOutAlt
            onClick={() => {
              logout();
              setGoals([]);
              localStorage.removeItem("goals");
            }}
            className="cursor-pointer"
            title="Logout"
          />
        </div>
      </nav>

      {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default NavBar;
