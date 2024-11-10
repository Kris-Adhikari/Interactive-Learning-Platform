import React from 'react';
import './LibraryPage.css';

function LibraryPage() {
  const categories = [
    { id: 1, name: 'Flappy Bird', pointsRequired: 50 },
    { id: 2, name: 'Hangman', pointsRequired: 75 },
    { id: 3, name: 'Mario', pointsRequired: 100 },
    { id: 4, name: 'Fortnite', pointsRequired: 25 },
  ];

  return (
    <div className="library-page">
      <h1>Redeemable Games Library</h1>
      <p>Select a game to redeem with your points.</p>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <h2>{category.name}</h2>
            <p>Points Required: {category.pointsRequired}</p>
            <button>Coming Soon</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LibraryPage;
