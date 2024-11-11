import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!question) return;

    setQuestion("");

    const response = await axios.post("http://localhost:5000/api/chatbot", { question }).catch(() => {
      setAnswer("Sorry, something went wrong. Please try again later.");
      return null;
    });

    if (response && response.data.answer) {
      setAnswer(response.data.answer);
    }
  };

  return (
    <div className={`chatbot ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Minimize" : "Chat with Support"}
      </button>
      {isOpen && (
        <div className="chat-content">
          <div className="chat-answer">
            {answer && <div className="chat-bubble bot">{answer}</div>}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
