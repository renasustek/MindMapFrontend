import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ProgressTracker from "./pages/ProgressTracker";
import Leaderboard from "./pages/Leaderboard";
import GoalPage from "./pages/GoalPage";
import Chatbot from "./pages/Chatbot"; // ✅ Import Chatbot Page
import PriorityTasks from "./pages/PriorityTasks"; // ✅ Import Main Kanban Board
import { AuthProvider } from "./context/AuthContext";
import CreateGoal from "./pages/CreateGoal";
import "./styles/App.css"

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/progressTracker" element={<ProgressTracker />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/chatbot" element={<Chatbot />} /> {/* ✅ New Chatbot Page */}
            <Route path="/PriorityTasks" element={<PriorityTasks />} /> {/* ✅ New Main Kanban Board */}
            <Route path="/CreateGoal" element={<CreateGoal />} /> {/* ✅ New Main Kanban Board */}
            <Route path="/goal/:goalId/:kanbanBoardId/:specificSteps/:measureProgress/:isGoalRealistic/:dueDate/:completedDate" element={<GoalPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
