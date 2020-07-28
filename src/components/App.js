import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";

import usePersistedState from "../hooks/use-persisted-state-hook";
import { GameContext } from "./GameContext";

function App() {
  const {
    numCookies,
    setNumCookies,
    purchasedItems,
    setPurchasedItems,
  } = React.useContext(GameContext);

  //CALCULATES NUM OF COOKIES ACCUMULATED WHEN TAB IS CLOSED
  useEffect(() => {
    const currentTimeStamp = new Date().getTime();
    const timeDiff = Math.floor(
      (currentTimeStamp - JSON.parse(localStorage.getItem("pastTimeStamp"))) /
        1000
    );
    let totalCookiesAcc = null;
    const itemsPurchasedKeys = Object.keys(purchasedItems);
    itemsPurchasedKeys.forEach((item) => {
      let numOwned = purchasedItems[item];
      let itemValue = items.find((element) => element.id === item).value;
      totalCookiesAcc += numOwned * itemValue * timeDiff;
      console.log("current item:" + item);
      console.log("timeDiff:" + timeDiff);
      console.log("num of cookies accumulated:" + totalCookiesAcc);
      console.log("expected num of cookies:" + (numCookies + totalCookiesAcc));
      console.log("num of cookies:" + numCookies);
    });
    setNumCookies(numCookies + totalCookiesAcc);
  }, []);
  //STORING CURRENT TIME STAMPS
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
          <Game
            numCookies={numCookies}
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
