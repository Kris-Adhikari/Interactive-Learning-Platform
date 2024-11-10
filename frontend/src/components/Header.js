
import React from 'react';
import { Link } from 'react-router-dom';
import EmailCapture from './Email'; // tmport the EmailCapture component
import './Header.css';

function Header({ points, email, onEmailSubmit }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="home-button">Home</Link>
        <Link to="/library" className="library-button">Library</Link> {/* New Library button */}
        <h1>ImproWise</h1>
        <div className="points-display">Points: {points}</div>
        
        {/* Show "Enter email to save progress" text with EmailCapture if no email */}
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
