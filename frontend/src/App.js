// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import QuizPage from './components/QuizPage';
import HomePage from './components/HomePage';
import LibraryPage from './components/LibraryPage'; 
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [currentTopic, setCurrentTopic] = useState("critical-thinking");
  const [progress, setProgress] = useState({
    "critical-thinking": { quizCompleted: false },
    "networking-marginalized": { quizCompleted: false }
  });

  useEffect(() => {
    setPoints(0); 
    const savedProgress = JSON.parse(localStorage.getItem('userProgress')) || progress;
    setProgress(savedProgress);
  }, []);

  const handleQuizCompletion = (topic) => {
    setPoints(points + 10); // Increase points by 10 for each completed quiz
    markQuizAsCompleted(topic);
  };

  const markQuizAsCompleted = (topic) => {
    const updatedProgress = {
      ...progress,
      [topic]: { quizCompleted: true }
    };
    setProgress(updatedProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
  };

  const handleTopicChange = (topic) => {
    setCurrentTopic(topic);
  };

  return (
    <Router>
      <div className="app-container">
        <Header points={points} />
        <div className="content-container">
          <Sidebar onTopicChange={handleTopicChange} currentTopic={currentTopic} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/topic/:topic" element={<VideoPlayer videoUrl="/videos/WhatIsCriticalThinking.mp4" />} />
              <Route path="/quiz/:topic" element={<QuizPage onQuizComplete={(topic) => handleQuizCompletion(topic)} />} />
            </Routes>
          </main>
        </div>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
