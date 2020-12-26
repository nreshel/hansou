import React, { useContext } from 'react'
import { GlobalContext, GlobalProvider } from './context/GlobalState'
import FlashCardList from './component/FlashCardList'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <FlashCardList />
    </GlobalProvider>
  );
}

export default App;
