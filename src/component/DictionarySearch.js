import React, { memo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { app } from '../db/Firebase'
import { GoPlus } from 'react-icons/go'
import '../css/DictionarySearch.css'

function DictionarySearch() {
  const [searchValue, setSearchValue] = useState('')
  const [searchedList, setSearchedList] = useState([])
  const { state } = useLocation()
  console.log(searchedList)

  const getFilteredDictionary = (e) => {
    let fetchCards = []
    const keycode = (e.keyCode ? e.keyCode : e.which)
    if(searchValue.match(/(\p{Script=Hani})+/gu) && keycode === 13){
      console.log('enter press here! ')
      app.database().ref('/chinese-dictionary-simplified/').orderByKey().startAt(searchValue).endAt(searchValue +"\uf8ff").once('value', (snapshot) => {
        if(snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(([key, value]) => {
            fetchCards.push({
              id: key,
              description: value.description,
              jyut: value.jyutping,
              pin: value.pinyin,
              char: value.word
            })
          })
          setSearchedList(fetchCards)
        } else {
          alert("This query does not match what's in the dictionary, please try again with a different query")
          setSearchValue('')
        }
      })
    }
  }
  
  /**
   * adds cards to the flashcard deck
   */
  const addCard = (card) => {
    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).push().set(card);
    alert("card has been added")
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
    <div className="intial-container">
      <input className="search-box" name="search" type="text" placeholder="search card in chinese..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyPress={(e) => getFilteredDictionary(e)} autocomplete="off" />
      <div className="dictionary-search-container">
        {searchValue.match(/(\p{Script=Hani})+/gu) && searchedList && searchedList.length !== 0 ? searchedList.map(card => {
          return (
            <div className="dictionary-card-search-container">
              <div className="dictionary-search-card">
                <div className="add-card" onClick={() => addCard({eng: card.description[0], pin: card.pin[0].replace(/[\[\]']+/g,''), han: card.id})} >
                  <GoPlus />
                </div>
                <div className="eng-dictionary-search">{card.description[0]}</div>
                <div className="pin-dictionary-search">{card.pin[0].replace(/[\[\]']+/g,'')}</div>
                <div className="han-dictionary-search" onClick={() => textToSpeech(card.id)} >{card.id}</div>
              </div>
            </div>
          )
        }) : (
          <div className="initial-container">Try to search for a word!</div>
        )}
      </div>
    </div>
  )
}

export default memo(DictionarySearch)
