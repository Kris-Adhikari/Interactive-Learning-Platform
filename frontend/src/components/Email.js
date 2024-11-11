
import React, { useState } from 'react';
import axios from 'axios';

function EmailCapture({ onEmailSubmit }) {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/save_email', { email });
      onEmailSubmit(email); 
    } catch (error) {
      console.error('Error saving email:', error); 
    } finally {
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
