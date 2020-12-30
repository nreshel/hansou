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
  console.log(location.state);
  /**
   * Filters card based on english input
   */
  const filterCards = () => location.state.cardSearch.filter(card => card.eng.includes(state.searchValue));

  /**
   * Removes the card from the cards database
   */
  const removeCard = (card) => {
    console.log(card.id);
    
    if(location.state.cards.includes(card)) {
      console.log("this is in cards")
      app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/${card.id}`).remove()
      let newCards = location.state.cards.filter(cardValue => cardValue !== card)
      console.log(newCards)
      setState({
        ...state,
        cards: newCards,
        cardSearch: [...newCards, ...location.state.cardsDone],
        cardsDone: location.state.cardsDone,
        card: location.state.card,
        index: location.state.index
      })
    } if(location.state.cardsDone.includes(card)) {
      console.log("this is in cardsDone")
      app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards-learned/${card.id}`).remove()
      let newCardsLearned = location.state.cardsDone.filter(cardValue => cardValue !== card)
      console.log(newCardsLearned)
      setState({
        ...state,
        cards: location.state.cards,
        cardSearch: [...location.state.cards, ...newCardsLearned],
        cardsDone: newCardsLearned,
        card: location.state.card,
        index: location.state.index
      })
    }
  }
  
  /**
   * When chinese word is click converts text to speech output
   */
  const textToSpeech = (word) => {
    if (!window.speechSynthesis) {
      alert('Your browser doesn\'t support text to speech.\nTry Chrome 33+ :)');
    } else {
      const utterance = new SpeechSynthesisUtterance();

      utterance.text = word;
      utterance.lang = "zh";

      speechSynthesis.speak(utterance);
    }
  }
  console.log(filterCards)
  return (
    <div className="search-div">
      <input className="search-box" name="search" type="text" placeholder="search card in english..." autocomplete="off" value={state.searchValue} onChange={(e) => (setState({ ...state, searchValue: e.target.value}, filterCards()))} />
      <div className="search-container">
        {!state.searchValue && location.state.cardSearch ? location.state.cardSearch.map(card => {
          return (
            <div className="card-search-container">
              <div className="search-card">
                <button className="del" onClick={() => removeCard(card)} >X</button>
                <div className="eng-search">{card.eng}</div>
                <div className="pin-search">{card.pin}</div>
                <div className="han-search" onClick={() => textToSpeech(card.han)} >{card.han}</div>
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
