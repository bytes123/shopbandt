import React, { createContext, useContext, useReducer } from "react";
import reducer, { intitalState } from "./Reducer";

export const StateContext = createContext();

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, intitalState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
