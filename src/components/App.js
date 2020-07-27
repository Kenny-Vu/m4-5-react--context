import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";

//CUSTOM HOOK - LOCAL STORAGE
const usePersistedState = (keyName, keyValue) => {
  //if value is already in storage, use that value instead
  const trueKeyValue = window.localStorage.getItem(keyName)
    ? JSON.parse(`${window.localStorage.getItem(keyName)}`)
    : keyValue;
  //create new state and pass the previous value or keyValue argument
  const [state, setState] = React.useState(trueKeyValue);
  //update local storage everytime state changes
  React.useEffect(() => {
    window.localStorage.setItem(keyName, JSON.stringify(state));
  }, [state]);
  //returning state
  return [trueKeyValue, setState];
};

function App(props) {
  // const [numCookies, setNumCookies] = React.useState(1000);
  // const [purchasedItems, setPurchasedItems] = React.useState({
  //   cursor: 0,
  //   grandma: 0,
  //   farm: 0,
  // });

  const [numCookies, setNumCookies] = usePersistedState("num-Cookies", 1000);
  const [purchasedItems, setPurchasedItems] = usePersistedState("num-items", {
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

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
