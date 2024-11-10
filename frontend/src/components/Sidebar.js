import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="lessons-label">Lessons</p> {}
      <ul>
        <li>
          {}
          <Link to="/topic/critical-thinking" className="topic-button">
            Critical Thinking
          </Link>
          <Link to="/quiz/critical-thinking" className="quiz-button">
            Quiz
          </Link>
        </li>
        <li>
          {}
          <Link to="/topic/networking-marginalized" className="topic-button">
            Networking While Being Marginalized
          </Link>
          <Link to="/quiz/networking-marginalized" className="quiz-button">
            Quiz
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
