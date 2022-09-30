import React from "react"

// import { ThemeProvider } from "./src/context/ThemeContext"
import GlobalContextProvider from "./src/context/GlobalContext"

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
)