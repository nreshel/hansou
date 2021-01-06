import { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { app } from '../db/Firebase'

export function useFetch(user) {
  const { state, setState } = useContext(GlobalContext)
  useEffect(() => {
    let dbCards = [];
    let dbCardsDone = []
    let dbCard = {}
    app.database().ref(`/users/${user}/cards-learned/`).on('child_added', snap => {
      if((snap.val().date - Date.parse(new Date())) < 0) {
        app.database().ref(`/users/${user}/cards-learned/`).child(snap.key).remove(); // removes from the learned database 
        app.database().ref(`/users/${user}/cards/`).push().set({ // pushes card to the learning database
          id: snap.key,
          eng: snap.val().eng,
          han: snap.val().han,
          pin: snap.val().pin,
          done: snap.val().done
        })
      }
    })
    app.database().ref(`/users/${user}/`).on('value', snap => {
      setState({
        ...state,
        user: snap.val()
      })
    })
  }, [])
}