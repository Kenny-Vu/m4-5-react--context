import React from "react";

export const GameContext = React.createContext(null);
export const GameProvider = ({ children }) => {
  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
