import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartLine, FaBook, FaPlus, FaRedo, FaUser, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";
import "../styles/NavBar.css";

const NavBar = () => {
  const { logout, goals } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
          <Link to="/tasks"><FaChartLine /></Link>
          <Link to="/leaderboard"><FaBook /></Link>
          <FaRedo />
          <FaRedo />
          <FaRedo />
          <FaPlus />
        </div>

        {/* Display Goal Buttons */}
        <div className="goal-buttons">
          {goals.map((goal) => (
            <button key={goal.uuid} onClick={() => handleGoalClick(goal)} className="goal-btn">
              GOAL
            </button>
          ))}
        </div>

        <div className="user-section">
          <FaUser onClick={() => setShowModal(true)} className="cursor-pointer" title="Login/Register" />
          <FaSignOutAlt onClick={logout} className="cursor-pointer" title="Logout" />
        </div>
      </nav>

      {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default NavBar;
