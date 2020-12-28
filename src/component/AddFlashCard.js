import React, { useState, useContext } from 'react';
import { GlobalContext, GlobalProvider } from '../context/GlobalState';
import { useLocation } from "react-router-dom";
import { GrRotateRight } from 'react-icons/gr';
import { app } from '../db/Firebase';
import '../css/AddCard.css';
import '../css/FlashCards.css';
function AddFlashCard() {
  const { state, setState } = useContext(GlobalContext);
  const [card, setCard] = useState({
    eng: '',
    pin: '',
    han: ''
  })
  const [flip, setFlip] = useState(false)
  let location = useLocation();
  console.log(state)

  const onChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value
    })
  }

  /**
   * Submits inputted text boxes and makes it into a cards and adds it to the learning database
   */
  const onSubmit = (e) => {
    e.preventDefault();
    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).push().set({eng: card.eng, pin: card.pin, han: card.han, done: 0});
    setCard({
      ...card, 
      eng: '',
      pin: '',
      han: ''
    });
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
  return (
    <div className="add-card-container">
      <div className="card-container">
        <div className={`card ${flip ? "card-toggle" : ''}`}>
          <div className="front">
            <div className="rotation-btn">
              <GrRotateRight onClick={() => setFlip(!flip)} />
            </div>
            <div className="eng">{card.eng}</div>
          </div>
          <div className="back">
            <div className="rotation-btn">
              <GrRotateRight onClick={() => setFlip(!flip)} />
            </div>
            <div className="han" onClick={() => textToSpeech(card.han)}>{card.han}</div>
            <div className="pin">{card.pin}</div>
          </div>
        </div>
      </div>
      <div className="form-div">
        <form onSubmit={onSubmit}>
          <input type="text" name="eng" autocomplete="off" placeholder="input english..." value={card.eng} onChange={onChange}/><br/>
          <input type="text" name="pin" autocomplete="off" placeholder="input pinyin..." value={card.pin} onChange={onChange}/><br/>
          <input type="text" name="han" autocomplete="off" placeholder="input hanzi..." value={card.han} onChange={onChange}/><br/>
          <input type="submit" value="submit" className="btn" />
        </form>
      </div>
    </div>
  )
}

export default AddFlashCard;
