import React from "react"
import {AnimatePresence } from 'framer-motion'

// import { ThemeProvider } from "./src/context/ThemeContext"
import GlobalContextProvider from "./src/context/GlobalContext"

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>{element}</GlobalContextProvider>
)

//  exitBeforeEnter
// export const wrapPageElement = ({element}) => (
//   <AnimatePresence >{element}</AnimatePresence> // initial={false} mode='wait'
// );