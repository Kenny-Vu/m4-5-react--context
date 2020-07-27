import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../data";

//CUSTOM HOOK - LOCAL STORAGE
const usePersistedState = (keyName, keyValue) => {
  const trueKeyValue = window.localStorage.getItem(keyName)
    ? Number(window.localStorage.getItem(keyName))
    : keyValue;
  console.log(window.localStorage.getItem(keyName));
  const [state, setState] = React.useState(trueKeyValue);
  React.useEffect(() => {
    window.localStorage.setItem(keyName, state);
  }, [state]);
  return [state, setState];
};

function App(props) {
  // const [numCookies, setNumCookies] = React.useState(1000);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  const [numCookies, setNumCookies] = usePersistedState("num-Cookies", 1000);
  // const [purchasedItems, setPurchasedItems] = usePersistedState("num-Items", {
  //   cursor: 0,
  //   grandma: 0,
  //   farm: 0,
  // });

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
