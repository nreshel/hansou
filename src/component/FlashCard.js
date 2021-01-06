import React, { memo, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { GlobalContext } from '../context/GlobalState'
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im'
import { GrRotateRight } from 'react-icons/gr'
import '../css/Card.css'

function FlashCard({ card, nextCard, prevCard, removeCard, cardLearned, forgotCard }) {
  const { state, setState } = useContext(GlobalContext)
  const [flip, setFlip] = useState(false)

  console.log(card)
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
  return (
    <div>
      <div style={{"display": "inline-flex", "paddingRight": "1%", "color": "red"}}>{card && state.user ? Object.values(state.user.cards).length : 0}</div>
      <div style={{"display": "inline-flex", "paddingLeft": "1%", "color": "blue"}}>{card && state.user['cards-learned'] ? Object.values(state.user['cards-learned']).length : 0}</div>
      <div className="card-container">
        <div className={`card ${flip ? "card-toggle" : ''}`}>
          <div className="front">
            <div className="rotation-btn">
              <GrRotateRight onClick={() => setFlip(!flip)} />
            </div>
            <button className="del" onClick={() => removeCard(card)} >X</button>
            <div className="eng">{card && card[1].eng}</div>
          </div>
          <div className="back">
            <div className="rotation-btn">
              <GrRotateRight onClick={() => setFlip(!flip)} />
            </div>
            <button className="del" onClick={() => removeCard(card)} >X</button>
            <div className="han" onClick={() => textToSpeech(card[1].han)} >{card && card[1].han}</div>
            <div className="pin">{card && card[1].pin}</div>
          </div>
        </div>
        <ImArrowLeft2 className="left-arrow" onClick={() => prevCard()} />
        <ImArrowRight2 className="right-arrow" onClick={() => nextCard()} />
      </div>
      <button onClick={() => cardLearned(card)} >Done</button>
      <button onClick={() => forgotCard(card)} >Forgot</button>
    </div>
  )
}

FlashCard.propTypes = {
  card: PropTypes.shape({
    eng: PropTypes.string,
    han: PropTypes.string,
    pin: PropTypes.string
  }),
  nextCard: PropTypes.func,
  prevCard: PropTypes.func,
  removeCard: PropTypes.func,
  cardLearned: PropTypes.func,
  forgotCard: PropTypes.func
}

export default memo(FlashCard);
