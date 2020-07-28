import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";

import usePersistedState from "../hooks/use-persisted-state-hook";
import { GameContext } from "./GameContext";

function App() {
  const { numCookies, setNumCookies, purchasedItems } = React.useContext(
    GameContext
  );

  //CALCULATES NUM OF COOKIES ACCUMULATED WHILE TAB WAS CLOSED
  useEffect(() => {
    const currentTimeStamp = new Date().getTime(); //fetching current time in ms
    //calculating time difference in seconds since last time browser ran
    const timeDiff = Math.floor(
      (currentTimeStamp - JSON.parse(localStorage.getItem("pastTimeStamp"))) /
        1000
    );
    let totalCookiesAcc = null; // sum of all cookies/sec that all 3 powerups generate together
    const itemsPurchasedKeys = Object.keys(purchasedItems);
    itemsPurchasedKeys.forEach((item) => {
      let numOwned = purchasedItems[item];
      let itemValue = items.find((element) => element.id === item).value;
      totalCookiesAcc += numOwned * itemValue * timeDiff;
    });
    setNumCookies(numCookies + totalCookiesAcc);
  }, []);
  //STORING CURRENT TIME STAMPS IN MS
  useEffect(() => {
    localStorage.setItem("pastTimeStamp", JSON.stringify(new Date().getTime()));
  }, [numCookies]);
  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
