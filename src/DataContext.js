// DataContext.js
import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [selectedTense, setSelectedTense] = useState(null);
  const [words1, setWords1] = useState([]);

  return (
    <DataContext.Provider value={{ selectedTense, setSelectedTense, words1, setWords1 }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
