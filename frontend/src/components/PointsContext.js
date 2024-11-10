import React, { createContext, useState } from 'react';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const resetPoints = () => {
    setPoints(0);
  };

  return (
    <PointsContext.Provider value={{ points, setPoints, resetPoints }}>
      {children}
    </PointsContext.Provider>
  );
};
