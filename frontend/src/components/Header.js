
import React from 'react';
import { Link } from 'react-router-dom';
import EmailCapture from './Email'; 
import './Header.css';

function Header({ points, email, onEmailSubmit }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="home-button">Home</Link>
        <Link to="/library" className="library-button">Library</Link> {}
        <h1>ImproWise</h1>
        <div className="points-display">Points: {points}</div>
        
        {}
        {!email && (
          <div className="email-capture-container">
            <span className="save-progress-text">Enter email to save progress</span>
            <EmailCapture onEmailSubmit={onEmailSubmit} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
