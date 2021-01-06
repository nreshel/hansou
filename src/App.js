import React, { useState, useEffect } from 'react'
import { app } from './db/Firebase'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalContext, GlobalProvider } from './context/GlobalState';
import NavBar from './component/NavBar'
import FlashCardList from './component/FlashCardList'
import AddFlashCard from './component/AddFlashCard'
import SearchFlashCards from './component/SearchFlashCards'
import DictionarySearch from './component/DictionarySearch'
import Register from './component/Register'
import SignIn from './component/SignIn'
import RegSignToggle from './component/RegSignToggle'
import logo from './logo.svg';
import './App.css';

function App() {
  const initialState = {
    isLoggedIn: false,
    userId: ''
  }
  const [state, setState] = useState(initialState)
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        setState({ ...state, isLoggedIn: true, userId: uid })
        console.log("user currently logged in", uid)
      } else {
        // User is signed out.
        // ...
        setState({ ...state, isLoggedIn: false })
        console.log("user not logged in")
      }
    });
  }, [])
  return (
    <GlobalProvider>
      <Router>
        { state.isLoggedIn ?
          <NavBar userId={state.userId} /> : null }
        <Switch>
          <Route exact path="/" render={(...props) => state.isLoggedIn ? <FlashCardList /> : <RegSignToggle />} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/add-card" render={(...props) => state.isLoggedIn ? <AddFlashCard /> : <RegSignToggle />} />
          <Route exact path="/search-card" render={(...props) => state.isLoggedIn ? <SearchFlashCards /> : <RegSignToggle />} />
          <Route exact path="/dictionary-search" render={(...props) => state.isLoggedIn ? <DictionarySearch /> : <RegSignToggle />} />
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
