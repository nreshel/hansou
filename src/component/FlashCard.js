import React, { memo, useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im'
import { GrRotateRight } from 'react-icons/gr'
import '../css/Card.css';

function FlashCard({ card, nextCard, prevCard, removeCard }) {
  const { state, setState } = useContext(GlobalContext)
  console.log(card)
  const [flip, setFlip] = useState(false)
  return (
    <div>
      <div style={{"display": "inline-flex", "paddingRight": "1%", "color": "red"}}>{card && Object.values(state.cards).length}</div>
      <div style={{"display": "inline-flex", "paddingLeft": "1%", "color": "blue"}}>{card && state.cardsDone.length}</div>
      <div className="card-container">
        <div className={`card ${flip ? "card-toggle" : ''}`}>
          <div className="front">
            <div className="rotation-btn">
              <GrRotateRight onClick={() => setFlip(!flip)} />
            </div>
            <button className="del" onClick={() => removeCard(card)}>X</button>
            <div className="eng">{card && card.eng}</div>
          </div>
          <div className="back">
            <div className="rotation-btn">
              <GrRotateRight onClick={() => setFlip(!flip)} />
            </div>
            <button className="del" onClick={() => removeCard(card)}>X</button>
            <div className="han">{card && card.han}</div>
            <div className="pin">{card && card.pin}</div>
          </div>
        </div>
        <ImArrowLeft2 className="left-arrow" onClick={() => prevCard()} />
        <ImArrowRight2 className="right-arrow" onClick={() => nextCard()} />
      </div>
      <button>Done</button>
      <button>Forgot</button>
    </div>
  )
}

export default memo(FlashCard);
