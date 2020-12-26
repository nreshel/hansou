import React, { memo, useCallback, useEffect, useContext } from 'react'
import { GlobalContext, GlobalProvider } from '../context/GlobalState'
import { useFetch } from '../hooks/useFetch'
import { app } from '../db/Firebase'
import FlashCard from './FlashCard'
import '../css/FlashCards.css'
function FlashCardList() {
  const { state, setState } = useContext(GlobalContext)
  useFetch();
  let getCard = useCallback((card) => {
      return Object.values(card[0] || {})[0]
    }, [state.card])
  console.log(getCard(state.card))
    return (
      <div className="App">
        <div className="container">
          <h1 class="title">Flashcard app</h1>
          <FlashCard card={getCard(state.card)} />
          {/* <FlashCard card={Object.values(state.cards)[0]} /> */}
        </div>
      </div>
    )
}

export default memo(FlashCardList);
