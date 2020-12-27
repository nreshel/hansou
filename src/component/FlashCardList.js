import React, { memo, useCallback, useEffect, useContext } from 'react'
import { GlobalContext, GlobalProvider } from '../context/GlobalState'
import { useFetch } from '../hooks/useFetch'
import { app } from '../db/Firebase'
import FlashCard from './FlashCard'
import '../css/FlashCards.css'
function FlashCardList() {
  const { state, setState } = useContext(GlobalContext)
  useFetch();
  const nextCard = useCallback(() => {
    if(state.cards[state.index + 1] !== undefined ) {
      setState({
        ...state,
        card: state.cards[state.index + 1],
        index: state.index + 1
      })
    } else {
      setState({
        ...state,
        card: state.cards[0],
        index: 0
      })
    }
  }, [state.card, state.index, setState])

  const prevCard = useCallback(() => {
    if(state.index >= 0) {
      setState({
        ...state,
        card: state.cards[state.index - 1],
        index: state.index - 1
      })
    } else {
      setState({
        ...state,
        card: state.cards[state.cards.length - 1],
        index: state.cards.length - 1
      })
    }
    console.log(state.index)
  }, [state.cards, state.index, setState])

  const removeCard = useCallback((card) => {
    console.log(card.id)
    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).child(card.id).remove();
    fetchCards();
  }, [state.cards, state.card, state.index])

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
    // return cardList;
  }
  console.log(state.card)
  console.log(state.cards[state.cards.length - 1], "testing")
  return (
    <div className="App">
      <div className="container">
        <h1 class="title">Flashcard app</h1>
        <FlashCard card={state.card} nextCard={nextCard} prevCard={prevCard} removeCard={removeCard} />
        {/* <FlashCard card={Object.values(state.cards)[0]} /> */}
      </div>
    </div>
  )
}

export default memo(FlashCardList);
