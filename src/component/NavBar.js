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
  const { state, setState } = useContext(GlobalContext)
  const [isOpen, setIsOpen] = useState(false);
  console.log("this is coming from the navbar", state)
  return (
    <React.Fragment>
      {isOpen ? (
        <div className={`sidebar`} >
          <a href="/">
            <AiFillHome /> <span>Home</span>
          </a>
          <a onClick={() => history.push({
            pathname: '/search-card',
            state: {...state}
          })}>
            <AiOutlineSearch /> <span>Search Card</span>
          </a>
          <a href="/add-card">
            <AiOutlinePlus /> <span>Add Card</span>
          </a>
          <a href="/dictionary-search">
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