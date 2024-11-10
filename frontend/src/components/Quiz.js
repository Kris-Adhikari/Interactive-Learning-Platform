import React, { useState } from 'react';
import axios from 'axios';

function Quiz({ terms, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [points, setPoints] = useState(0);

  const handleAnswer = async (term, userAnswer) => {
    const isCorrect = userAnswer.trim().toLowerCase() === term.term.toLowerCase();
    setAnswers(prev => ({
      ...prev,
      [term.term]: {
        correct: (prev[term.term]?.correct || 0) + (isCorrect ? 1 : 0),
        incorrect: (prev[term.term]?.incorrect || 0) + (isCorrect ? 0 : 1)
      }
    }));

    if (isCorrect) {
      setPoints(prev => prev + 10); // award 10 points for correct answer
    }

    if (!isCorrect) {
      // Get AI feedback for incorrect answer
      try {
        const response = await axios.post('/api/quiz_feedback', {
          user_answer: userAnswer,
          correct_answer: term.term,
          term_definition: term.definition,
        });
        setFeedback(prev => ({
          ...prev,
          [term.term]: response.data.feedback,
        }));
      } catch (error) {
        console.error('Error getting quiz feedback:', error);
      }
    } else {
      // Clear feedback if answer is correct
      setFeedback(prev => ({
        ...prev,
        [term.term]: '',
      }));
    }
  };

  const handleSubmit = () => {
    onComplete({ answers, points });
  };

  return (
    <div className="quiz">
      {terms.map((term, index) => (
        <div key={index} className="quiz-question">
          <p>{term.definition}</p>
          <input
            type="text"
            placeholder="Enter the term"
            onBlur={(e) => handleAnswer(term, e.target.value)}
          />
          {feedback[term.term] && (
            <p className="feedback">{feedback[term.term]}</p>
          )}
        </div>
      ))}
      <div className="quiz-points">
        <p>Points Earned: {points}</p>
      </div>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}

export default Quiz;
