import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ProgressTracker from "./pages/ProgressTracker";
import Leaderboard from "./pages/Leaderboard";
import GoalPage from "./pages/GoalPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/progressTracker" element={<ProgressTracker />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/goal/:goalId/:kanbanBoardId/:specificSteps/:measureProgress/:isGoalRealistic/:dueDate/:completedDate" element={<GoalPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
