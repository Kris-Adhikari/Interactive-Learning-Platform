// src/components/QuizPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuizPage.css';

function QuizPage({ onQuizComplete }) {
  const { topic } = useParams();
  const navigate = useNavigate();
  
  const questions = {
    "critical-thinking": [
      {
        question: "What is critical thinking?",
        options: [
          "A way to think creatively",
          "Analyzing information objectively",
          "A form of memorization",
          "A type of emotional response"
        ],
        correctAnswer: "Analyzing information objectively"
      },
      {
        question: "Which is a part of critical thinking?",
        options: [
          "Accepting all information at face value",
          "Questioning assumptions",
          "Ignoring other perspectives",
          "Following your gut instinct"
        ],
        correctAnswer: "Questioning assumptions"
      }
    ],
    "networking-marginalized": [
      {
        question: "What is a key benefit of networking?",
        options: [
          "Expanding social support",
          "Gaining immediate promotions",
          "Avoiding professional relationships",
          "Working alone on projects"
        ],
        correctAnswer: "Expanding social support"
      },
      {
        question: "How can you effectively network?",
        options: [
          "Focus only on high-level executives",
          "Listen actively to others",
          "Discuss only your own goals",
          "Avoid asking questions"
        ],
        correctAnswer: "Listen actively to others"
      }
    ]
  };

  const topicQuestions = questions[topic] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showScore, setShowScore] = useState(false);

  const handleAnswerSelect = (option) => setSelectedAnswer(option);

  const handleNextQuestion = () => {
    if (selectedAnswer === topicQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setSelectedAnswer("");

    if (currentQuestion + 1 < topicQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      if (onQuizComplete && score + 1 === topicQuestions.length) {
        onQuizComplete(topic);
      }
    }
  };

  return (
    <div className="quiz-page">
      <h1>{topic === "critical-thinking" ? "Critical Thinking Quiz" : "Networking Quiz"}</h1>
      {showScore ? (
        <div className="score-section">
          <p>Your Score: {score} out of {topicQuestions.length}</p>
          <button onClick={() => navigate("/")}>Return to Home</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>{topicQuestions[currentQuestion]?.question}</h2>
          <div className="options">
            {topicQuestions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === option ? "selected" : ""}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="next-button" onClick={handleNextQuestion} disabled={!selectedAnswer}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
