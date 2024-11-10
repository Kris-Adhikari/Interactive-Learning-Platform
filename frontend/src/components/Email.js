
import React, { useState } from 'react';
import axios from 'axios';

function EmailCapture({ onEmailSubmit }) {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/save_email', { email });
      onEmailSubmit(email); // Notify parent component that email is saved
    } catch (error) {
      console.error('Error saving email:', error); // Log any error in the console without user notification
    } finally {
      // Always show "Email saved" popup
      alert('Email saved');
    }
  };

  return (
    <form onSubmit={handleEmailSubmit} className="email-capture">
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default EmailCapture;
