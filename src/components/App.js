import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";

//CUSTOM HOOK - LOCAL STORAGE
const usePersistedState = (keyName, keyValue) => {
  //if value is already in storage, use that value instead
  const trueKeyValue = JSON.parse(window.localStorage.getItem(keyName))
    ? JSON.parse(window.localStorage.getItem(keyName))
    : keyValue;
  //create new state and pass the previous value or keyValue argument
  const [state, setState] = React.useState(trueKeyValue);
  //update state in local storage everytime state changes
  useEffect(() => {
    window.localStorage.setItem(keyName, JSON.stringify(state));
  }, [state]);

  //returning state
  return [state, setState];
};

function App(props) {
  // const [numCookies, setNumCookies] = React.useState(1000);
  // const [purchasedItems, setPurchasedItems] = React.useState({
  //   cursor: 0,
  //   grandma: 0,
  //   farm: 0,
  // });
  const [numCookies, setNumCookies] = usePersistedState("num-cookies", 1000);
  const [purchasedItems, setPurchasedItems] = usePersistedState("num-items", {
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  //useEffect to compare timeStamps on mount
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
  //useEffect to store current timeStamp
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
