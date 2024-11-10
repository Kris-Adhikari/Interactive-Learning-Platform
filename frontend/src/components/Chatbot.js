// src/components/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // For minimize/maximize functionality

  const handleSend = async () => {
    if (!question) return;

    // add user question to chat history
    const updatedChatHistory = [...chatHistory, { sender: "user", text: question }];
    setChatHistory(updatedChatHistory);
    setQuestion(""); // clear input field

    try {
      // send question to the Flask backend
      const response = await axios.post("http://localhost:5000/api/chatbot", { question });
      const answer = response.data.answer;

      
      setChatHistory([...updatedChatHistory, { sender: "bot", text: answer }]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatHistory([...updatedChatHistory, { sender: "bot", text: "Sorry, something went wrong. Please try again later." }]);
    }
  };

  return (
    <div className={`chatbot ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Minimize" : "Chat with Support"}
      </button>
      {isOpen && (
        <div className="chat-content">
          <div className="chat-history">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-bubble ${chat.sender}`}>
                {chat.text}
              </div>
            ))}
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
