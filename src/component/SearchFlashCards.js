import React, { useState } from 'react'
import { app } from '../db/Firebase'
import { useLocation } from "react-router-dom";
import '../css/SearchCard.css'

function SearchFlashCards() {
  const [state, setState] = useState({
    filteredList: [],
    searchValue: '',
    cards: [],
    cardsDone: [],
  })
  let location = useLocation();
  console.log(location.state.cardSearch);
  /**
   * Filters card based on english input
   */
  const filterCards = () => location.state.cardSearch.filter(card => card.eng.includes(state.searchValue));
  return (
    <div className="search-div">
      <input className="search-box" name="search" type="text" placeholder="search card in english..." autocomplete="off" value={state.searchValue} onChange={(e) => (setState({ ...state, searchValue: e.target.value}, filterCards(e)))} />
      <div className="search-container">
        {!state.searchValue && location.state.cardSearch ? location.state.cardSearch.map(card => {
          return (
            <div className="card-search-container">
              <div className="search-card">
                <button className="del">X</button>
                <div className="eng-search">{card.eng}</div>
                <div className="pin-search">{card.pin}</div>
                <div className="han-search">{card.han}</div>
              </div>
            </div>
          )
        }) : [...filterCards()].map(card => {
          return (
            <div className="card-search-container">
              <div className="search-card">
                <button className="del">X</button>
                <div className="eng-search">{card.eng}</div>
                <div className="pin-search">{card.pin}</div>
                <div className="han-search">{card.han}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchFlashCards
