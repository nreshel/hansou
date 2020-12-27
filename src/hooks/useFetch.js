import { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { app } from '../db/Firebase'

export function useFetch() {
  const { state, setState } = useContext(GlobalContext)
  useEffect(() => {
    let dbCards = [];
    let dbCardsDone = []
    let dbCard = {}
    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).on('child_added', snap => {
      if(snap.exists()) {
        dbCards.push({
          id: snap.key,
          eng: snap.val().eng,
          han: snap.val().han,
          pin: snap.val().pin,
          done: snap.val().done
        })
      }
    })

    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards-learned/`).on('child_added', snap => {
      if((snap.val().date - Date.parse(new Date())) < 0) {
        app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards-learned/`).child(snap.key).remove(); // removes from the learned database 
        app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).push().set({ // pushes card to the learning database
          id: snap.val().id,
          eng: snap.val().eng,
          han: snap.val().han,
          pin: snap.val().pin,
          done: snap.val().done
        })
      } else {
        if(snap.exists()) {
          dbCardsDone.push({
            key: snap.key,
            id: snap.val().id,
            eng: snap.val().eng,
            han: snap.val().han,
            pin: snap.val().pin,
            done: snap.val().done,
            date: snap.val().date
          })
        }
      }
    })

    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).orderByKey().limitToFirst(1).on('child_added', snap => {
      if(snap.exists()) {
        dbCard = snap.val()
      }
      setState({
        ...state,
        cards: dbCards,
        cardsDone: dbCardsDone,
        card: dbCard,
        index: 0
      })
    })
  }, [])
}