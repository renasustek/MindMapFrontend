import React from "react";
import "../styles/Home.css"; // Make sure the styles are correctly linked

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="main-title">
        Overcome Procrastination & Achieve Your Academic Goals
      </h1>

      <p className="main-description">
        Welcome to a platform designed to help students break free from academic
        procrastination through structured planning, psychological insights, and
        gamified motivation. By integrating cognitive restructuring techniques, 
        smart task management, and an engaging reward system, this application 
        empowers you to build lasting productivity habits.
      </p>

      <h2 className="section-title">Key Features</h2>

      <div className="features-grid">
        <div className="feature-card">
          <h3 className="feature-title">Cognitive Restructuring Chatbot</h3>
          <p className="feature-text">
            Engage with an AI-driven chatbot designed to help you reframe negative 
            thoughts and develop a more productive mindset. This technique, rooted 
            in Cognitive Behavioural Therapy (CBT), fosters long-term behavioural change.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Progress Tracker</h3>
          <p className="feature-text">
            Monitor your achievements over time using insightful visual analytics. 
            Identify trends in your study patterns and stay accountable with real-time feedback.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Leaderboard & Level-Up System</h3>
          <p className="feature-text">
            Earn experience points (XP) as you complete tasks, level up, and compete 
            with peers on the leaderboard. Gamification techniques ensure motivation 
            remains high throughout your academic journey.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Kanban Boards</h3>
          <p className="feature-text">
            Organise your tasks with a structured visual workflow. Move assignments 
            through stages such as ‘To Do,’ ‘In Progress,’ and ‘Completed’ to enhance 
            clarity and focus.
          </p>
        </div>

        <div className="feature-card">
          <h3 className="feature-title">Priority Task Management</h3>
          <p className="feature-text">
            Keep track of high-priority tasks and deadlines. Our system intelligently 
            highlights urgent assignments, ensuring that critical work is never overlooked.
          </p>
        </div>
      </div>

      <h2 className="section-title">Why This Matters</h2>

      <p className="main-description">
        Academic procrastination is more than just a time management issue—it often 
        stems from deep-seated cognitive and motivational factors. By combining 
        structured goal-setting, psychological interventions, and gamification, 
        this platform offers a **comprehensive approach** to tackling procrastination 
        at its root.
      </p>

      <h2 className="section-title">Getting Started</h2>

      <p className="main-description">
        Begin by setting up your academic goals, structuring tasks using Kanban 
        boards, and engaging with the chatbot for thought restructuring. Progress 
        is tracked through intuitive analytics, and motivation is sustained through 
        gamified rewards.
      </p>

      
    </div>
  );
};

export default Home;
