import React, { createContext, useState, useContext } from 'react';

const MapContext = createContext();

export const useMap = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const selectQuestForMap = (quest) => {
    setSelectedQuest(quest);
  };

  const value = {
    selectedQuest,
    selectQuestForMap,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
