import React, { createContext, useState } from 'react'; // useReducer

export const GetDirectionGlobalContext = createContext();
export const SetDirectionGlobalContext = createContext();

export const GlobalProvider = (props) => {
  // const [panelIndex, setPanelIndex] = useState(40);
  const [pastPanelIndex, setPastPanelIndex] = useState(0);
  const [theDirection, setTheDirection] = useState(77);
  const setDirection = (chosenIndex) => {
    (chosenIndex > pastPanelIndex)
      ? setTheDirection(0) : setTheDirection(1);
    setPastPanelIndex(chosenIndex);
  }

  return(
    // <GetDirectionGlobalContext.Provider value={panelIndex}>
    <GetDirectionGlobalContext.Provider value={theDirection}>
      {/* <GlobalContext.Provider value = {{ setPanelIndex }}> */}
      <SetDirectionGlobalContext.Provider value = {{ setDirection }}>
          {props.children}
      </SetDirectionGlobalContext.Provider>
    </GetDirectionGlobalContext.Provider>
  )
}