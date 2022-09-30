import React, { createContext } from "react"

// First, we have to prepare some data and functions, that we're later gonna use
// in our reducer

const initialState = {
  openMenu: false,
  showPop: false,
  panelTitle: "to be dynamic",
  pageOrdinal: 1,
}

const actions = {
  SET_MENU: "SET_MENU",
  SET_SHOW_POP: "SET_SHOW_POP",
  SET_PANEL_TITLE: "SET_PANEL_TITLE",
  SET_PAGE_ORDINAL: "SET_PAGE_ORDINAL",
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_MENU:
      return { ...state, openMenu: action.value }
    case actions.SET_SHOW_POP:
      return { ...state, showPop: action.value }
    case actions.SET_PANEL_TITLE:
      return { ...state, panelTitle: action.value }
    case actions.SET_PAGE_ORDINAL:
      return { ...state, pageOrdinal: action.value }
    default:
      return state
  }
}

// Then we are creating a context out of the scope of the function
// "GlobalContextProvider" so that we can export it
// and use it in our pages

const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {
  // Within our overarching component, we now create a React-Reducer with the data that
  // we've prepared. This gives us a current state and a dispatch function to
  // invoke an action of the reducer function declared earlier.

  const [state, dispatch] = React.useReducer(reducer, initialState)

  // Equipped with "state" and "dispatch" we can now create a value-object, that goes
  // into our ContextProvider.

  const value = {
    openMenu: state.openMenu,
    setOpenMenu: value => {
      dispatch({ type: actions.SET_MENU, value })
    },
    showPop: state.showPop,
    setShowPop: value => {
      dispatch({ type: actions.SET_SHOW_POP, value })
    },    
    panelTitle: state.panelTitle,
    setPanelTitle: value => {
      dispatch({ type: actions.SET_PANEL_TITLE, value })
    },    
    pageOrdinal: state.pageOrdinal,
    setPageOrdinal: value => {
      dispatch({ type: actions.SET_PAGE_ORDINAL, value })
    },    
  }

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

// The exported GlobalContextProvider will only be used in our layout/index.js,
// while the general GlobalContext can be used by any Page or Component (with
// the help of useContext).

export { GlobalContextProvider as default, GlobalContext }