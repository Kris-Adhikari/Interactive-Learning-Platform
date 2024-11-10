import React, { useState, useEffect } from 'react';

function Points() {
  const [points, setPoints] = useState(0);
  const userId = 'user123'; 

  return (
    <div className="points">
      <h2>Your Points: {points}</h2>
      <button onClick={handleRedeem}>Redeem Points</button>
    </div>
  );
}

export default Points;
