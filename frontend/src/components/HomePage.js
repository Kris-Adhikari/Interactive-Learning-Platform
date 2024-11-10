import React, { useEffect, useState } from 'react';
import './HomePage.css';

function HomePage() {
  const [progress, setProgress] = useState({
    "critical-thinking": { quizCompleted: false },
    "networking-marginalized": { quizCompleted: false }
  });

  useEffect(() => {
    // Clear any existing `userProgress` data from localStorage temporarily
    localStorage.removeItem('userProgress');

    // Load saved progress from localStorage if it exists, or initialize default progress
    const savedProgress = JSON.parse(localStorage.getItem('userProgress')) || {
      "critical-thinking": { quizCompleted: false },
      "networking-marginalized": { quizCompleted: false }
    };

    setProgress(savedProgress);
    // Save default progress structure to localStorage if it was empty
    localStorage.setItem('userProgress', JSON.stringify(savedProgress));
  }, []);

  return (
    <div className="home-page">
      <div className="progress-container">
        <h1 className="page-title">Learning Progress</h1>
        <p className="subtitle">Track your progress as you complete quizzes!</p>
        <div className="progress-section">
          {Object.entries(progress).map(([topic, status]) => (
            <div key={topic} className="progress-item">
              <h2 className="topic-title">{topic === "critical-thinking" ? "Critical Thinking" : "Networking While Being Marginalized"}</h2>
              <p className={status.quizCompleted ? "completed" : ""}>
                Quiz Completed: {status.quizCompleted ? "✅" : "❌"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
