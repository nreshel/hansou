import React, { createContext, useState } from 'react'
import { app } from '../db/Firebase'

const initialState = {
  cards: [],
  cardsDone: [],
  card: {},
  index: 0
}

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  return (
    <GlobalContext.Provider value={{state, setState}}>
      {children}
    </GlobalContext.Provider>
  );
}