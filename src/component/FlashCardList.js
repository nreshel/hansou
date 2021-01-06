import React, { memo, useCallback, useEffect, useContext } from 'react'
import { useLocation } from "react-router-dom";
import { GlobalContext, GlobalProvider } from '../context/GlobalState'
import { useFetch } from '../hooks/useFetch'
import { app } from '../db/Firebase'
import FlashCard from './FlashCard'
import '../css/FlashCards.css'
function FlashCardList() {
  const { state, setState } = useContext(GlobalContext)
  // useFetch();
  console.log(Object.entries(state.user.cards || {}))
  const nextCard = useCallback(() => {
    if(Object.entries(state.user.cards)[state.index + 1] !== undefined ) {
      setState({
        ...state,
        index: state.index + 1
      })
    } else {
      setState({
        ...state,
        index: 0
      })
    }
  }, [state.user.cards, state.index, setState])

  const prevCard = useCallback(() => {
    if(state.index > 0) {
      setState({
        ...state,
        // card: state.cards[state.index - 1],
        index: state.index - 1
      })
    } else {
      setState({
        ...state,
        // card: state.cards[state.cards.length - 1],
        index: Object.entries(state.user.cards).length - 1
      })
    }
  }, [state.user.cards, state.index, setState])

  const removeCard = useCallback((card) => {
    console.log(card[0])
    let filteredKeys = Object.keys(state.user.cards).filter(key => key !== card[0]);
    let filteredObject = Object.keys(state.user.cards)
      .filter(key => !filteredKeys.includes(key))
      .forEach(key => delete state.user.cards[key]);
    setState({
      ...state,
      cards: filteredObject
    })
    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).child(card[0]).remove();
    // fetchCards();
  }, [state.user.cards, state.index, setState])

  const fetchCards = () => {
    let cardList = []
    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).on('child_added', snap => {
      cardList.push({
        id: snap.key,
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin,
        done: snap.val().done,
        date: snap.val().date
      })
      setState({
        ...state,
        cards: cardList,
        card: state.cards[state.index - 1],
        index: state.index - 1
      })
    })
  }

  const cardLearned = useCallback((card) => {
    console.log(card, "testing")

      var day = new Date();
      console.log(day);

      var nextDay = new Date(day);
      const tomorrow = nextDay.setDate(day.getDate() + (card.done ? card.done + 1 : 1));
      console.log(card, tomorrow);
      app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards-learned/`).child(card[0]).push()
      app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards-learned/`).child(card[0]).set({
        id: card[0],
        eng: card[1].eng,
        pin: card[1].pin,
        han: card[1].han,
        done: card[1].done ? card[1].done + 1 : 1,
        date: tomorrow
      });
      app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).child(card[0]).remove();
      let done = { ...state.user['cards-learned'], [card[0]]: {...card[1]} }
      let filteredKeys = Object.keys(state.user.cards).filter(key => key !== card[0]);
      let filteredObject = Object.keys(state.user.cards)
        .filter(key => !filteredKeys.includes(key))
        .forEach(key => delete state.user.cards[key]);
      setState({
        ...state,
        cards: filteredObject,
        ['cards-learned']: Object.assign(state.user['cards-learned'], {[card[0]]: card[1]}),
        index: 1
      });
    },
    [state.user.cards, state.user.cardsDone, state.index, setState],
  )

  const forgotCard = useCallback((card) => {
    console.log(card[0])
      app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).child(card[0]).set({
        id: card[0],
        eng: card[1].eng,
        pin: card[1].pin,
        han: card[1].han,
        done: 0,
        date: 0
      })
      let newState = state.user.cards
      newState[card[0]]['done'] = 0
      newState[card[0]]['date'] = 0
      setState({
        ...state,
        cards: newState,
        index: state.index
      })
    }, [state.user.cards, state.index, setState])

  return (
    <div className="App">
      <div className="container">
        <h1 class="title">Flashcard app</h1>
        <FlashCard card={Object.entries(state.user.cards || {})[state.index]} nextCard={nextCard} prevCard={prevCard} removeCard={removeCard} cardLearned={cardLearned} forgotCard={forgotCard} />
      </div>
    </div>
    
  )
}

export default memo(FlashCardList);
