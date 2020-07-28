import React from "react";

import usePersistedState from "../hooks/use-persisted-state-hook";

export const GameContext = React.createContext(null);
export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistedState("num-cookies", 1000);
  const [purchasedItems, setPurchasedItems] = usePersistedState("num-items", {
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  return (
    <GameContext.Provider
      value={{ numCookies, setNumCookies, purchasedItems, setPurchasedItems }}
    >
      {children}
    </GameContext.Provider>
  );
};
