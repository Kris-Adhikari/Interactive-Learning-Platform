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

  useEffect(() => {
    setPoints(0); 
  }, []);

  const handleQuizCompletion = () => {
    setPoints(points + 10); // increase points by 10 for each completed quiz
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
              <Route path="/library" element={<LibraryPage />} /> {}
              <Route path="/topic/:topic" element={<VideoPlayer videoUrl="/videos/WhatIsCriticalThinking.mp4" />} />
              <Route path="/quiz/:topic" element={<QuizPage onQuizComplete={handleQuizCompletion} />} />
            </Routes>
          </main>
        </div>
        <Chatbot /> {}
      </div>
    </Router>
  );
}

export default App;
