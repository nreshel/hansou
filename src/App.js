import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalContext, GlobalProvider } from './context/GlobalState';
import NavBar from './component/NavBar'
import FlashCardList from './component/FlashCardList'
import AddFlashCard from './component/AddFlashCard'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" render={(...props) => <FlashCardList />} />
          <Route exact path="/add-card" render={(...props) => <AddFlashCard />} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
