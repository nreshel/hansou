import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { app } from '../db/Firebase'
import { AiFillHome } from 'react-icons/ai'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { AiOutlineSearch, AiOutlinePlus, AiOutlineFileSearch } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgLogOut } from 'react-icons/cg'
import '../css/NavBar.css'

function NavBar() {
  let history = useHistory();
  const { state } = useContext(GlobalContext)
  const [isOpen, setIsOpen] = useState(false);
  console.log("this is coming from the navbar", state)
  // const isEmpty = !Object.values(state).some(x => (x !== null && x !== '' && x !== [] && x !== {}));
  return (
    <React.Fragment>
      {isOpen ? (
        <div className={`sidebar`} >
          <a onClick={() => history.push({
            pathname: '/',
            state: {
              cards: state.cards,
              cardsDone: state.cardsDone,
              cardSearch: [...state.cards, ...state.cardsDone],
              card: state.card,
              index: state.index
            }
          })}>
            <AiFillHome /> <span>Home</span>
          </a>
          <a onClick={() => history.push({
            pathname: '/search-card',
            state: {
              cards: state.cards,
              cardsDone: state.cardsDone,
              cardSearch: [...state.cards, ...state.cardsDone],
              card: state.card,
              index: state.index
            }
          })}>
            <AiOutlineSearch /> <span>Search Card</span>
          </a>
          <a onClick={() => history.push({
            pathname: '/add-card',
            state: {
              cards: state.cards,
              cardsDone: state.cardsDone,
              cardSearch: [...state.cards, ...state.cardsDone],
              card: state.card,
              index: state.index
            }
          })}>
            <AiOutlinePlus /> <span>Add Card</span>
          </a>
          <a onClick={() => history.push({
            pathname: '/dictionary-search',
            state: {
              cards: state.cards,
              cardsDone: state.cardsDone,
              cardSearch: [...state.cards, ...state.cardsDone],
              card: state.card,
              index: state.index
            }
          })}>
            <AiOutlineFileSearch /> <span>Dictionary Search</span>
          </a>
          <div className="arrow-toggle" onClick={() => setIsOpen(!isOpen)}>
            <MdKeyboardArrowLeft />
          </div>
          <a className="sign-out" href="/" onClick={() => app.auth().signOut()
          .then(() => {
            alert("User has signed out successfully")
          })
          .catch((error) => {
            alert(error)
          })}>
            <CgLogOut className="sign-out-icon"/> <span>Sign Out</span>
          </a>
        </div>
      ) : (
        <div className="hamburger-nav" onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </div>
      )}

    </React.Fragment>
  )
}

export default NavBar;