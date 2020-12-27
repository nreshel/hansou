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
  }, [state.card, state.index])

  const prevCard = useCallback(() => {
    if(state.cards[state.index - 1] >= 0) {
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
  }, [state.cards, state.index])
  console.log(state.card)
  console.log(state.cards[state.cards.length - 1], "testing")
  return (
    <div className="App">
      <div className="container">
        <h1 class="title">Flashcard app</h1>
        <FlashCard card={state.card} nextCard={nextCard} prevCard={prevCard} />
        {/* <FlashCard card={Object.values(state.cards)[0]} /> */}
      </div>
    </div>
  )
}

export default memo(FlashCardList);
