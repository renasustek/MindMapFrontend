import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal"; // ✅ Import Auth Modal
import axios from "axios";
import "../styles/NavBar.css";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [goalDropdownOpen, setGoalDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch Goals
  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:8080/goal/all", { withCredentials: true })
        .then((response) => {
          setGoals(response.data || []);
        })
        .catch((error) => {
          console.error("Failed to fetch goals", error);
          setGoals([]);
        });
    }
  }, [isAuthenticated]);

  const handleGoalClick = (goal) => {
    navigate(`/goal/${goal.uuid}/${goal.kanbanBoardId}/${goal.specificSteps}/${goal.measureProgress}/${goal.isGoalRealistic}/${goal.dueDate}/${goal.completedDate}`);
  };

  return (
    <>
      <nav className="navbar">
        {/* Left Section */}
        <div className="nav-left">
          <div className="logo"></div>
          <h1>MindMap</h1>
        </div>

        {/* User Section */}
        <div className="user-section">
          <FaUser onClick={() => setShowModal(true)} title="Login/Register" />
          {isAuthenticated && (
            <FaSignOutAlt onClick={() => logout()} className="cursor-pointer" title="Logout" />
          )}
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/progressTracker">Progress Tracker</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/chatbot">Chatbot</Link>
          <Link to="/PriorityTasks">Priority Tasks</Link>
          <Link to="/CreateGoal">Create Goal</Link>

          {/* 🎯 Goals Dropdown */}
          {isAuthenticated && (
            <div className="goal-dropdown">
              <button className="goal-dropdown-btn" onClick={() => setGoalDropdownOpen(!goalDropdownOpen)}>
                Goals <FaChevronDown />
              </button>
              {goalDropdownOpen && (
                <div className="goal-dropdown-content">
                  {goals.length > 0 ? (
                    goals.map((goal) => (
                      <button key={goal.uuid} onClick={() => handleGoalClick(goal)} className="goal-btn">
                        {goal.name || "Goal"}
                      </button>
                    ))
                  ) : (
                    <p className="no-goals">No Goals Available</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/progressTracker" onClick={() => setMenuOpen(false)}>Progress Tracker</Link>
          <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
          <Link to="/chatbot" onClick={() => setMenuOpen(false)}>Chatbot</Link>
          <Link to="/PriorityTasks" onClick={() => setMenuOpen(false)}>Priority Tasks</Link>
          <Link to="/CreateGoal" onClick={() => setMenuOpen(false)}>Create Goal</Link>

          {/* 🎯 Mobile Goals Dropdown */}
          {isAuthenticated && (
            <div className="mobile-goal-dropdown">
              <button className="goal-dropdown-btn" onClick={() => setGoalDropdownOpen(!goalDropdownOpen)}>
                Goals <FaChevronDown />
              </button>
              {goalDropdownOpen && (
                <div className="goal-dropdown-content">
                  {goals.map((goal) => (
                    <button key={goal.uuid} onClick={() => handleGoalClick(goal)} className="goal-btn">
                      {goal.name || "Goal"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ✅ Auth Modal */}
      {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default NavBar;
