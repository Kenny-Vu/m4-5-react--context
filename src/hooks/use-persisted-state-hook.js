import React from "react";

//CUSTOM HOOK - LOCAL STORAGE
const usePersistedState = (keyName, keyValue) => {
  //create new state and pass the previous value or keyValue argument
  const [state, setState] = React.useState(() => {
    //if value is already in storage, use that value instead
    const persistedValue = JSON.parse(window.localStorage.getItem(keyName))
      ? JSON.parse(window.localStorage.getItem(keyName))
      : keyValue;
    return persistedValue;
  });
  //update state in local storage everytime state changes
  React.useEffect(() => {
    window.localStorage.setItem(keyName, JSON.stringify(state));
  }, [state]);

  //returning state
  return [state, setState];
};

export default usePersistedState;
