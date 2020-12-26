import { useEffect, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { app } from '../db/Firebase'

export function useFetch() {
  const { state, setState } = useContext(GlobalContext)
  let dbCards = [];
  let dbCardsDone = []
  let dbCard = []
  useEffect(async () => {
    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).on('child_added', snap => {
      if(snap.exists()) {
        dbCards.push({
          id: snap.key,
          eng: snap.val().eng,
          han: snap.val().han,
          pin: snap.val().pin,
          done: snap.val().done
        })
        // setState({
        //   ...state,
        //   cards : {
        //     id: snap.key,
        //     eng: snap.val().eng,
        //     han: snap.val().han,
        //     pin: snap.val().pin,
        //     done: snap.val().done
        //   }
        // })
      }
      // setState({
      //   ...state,
      //   cards: snap.val(),
      //   // card: Object.values(snap.val())[0]
      // })
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
          // setState({ // pushes card learned entities to dbCardsDone
          //   ...state,
          //   cardsDone: {
          //     key: snap.key,
          //     id: snap.val().id,
          //     eng: snap.val().eng,
          //     han: snap.val().han,
          //     pin: snap.val().pin,
          //     done: snap.val().done,
          //     date: snap.val().date
          //   }
          // })
        }
        // this.setState({
        //   cardsDone: dbCardsDone.filter(cardDone => cardDone.date - Date.parse(new Date()) > 0), // gets all entities from dbCardsDone and saves it into state
        //   cardSearch: [...dbCards, ...dbCardsDone]
        // })
      }
    })

    app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).orderByKey().limitToFirst(1).on('child_added', snap => {
      if(snap.exists()) {
        dbCard.push({
          card: snap.val()
        })
        // setState({
        //   ...state,
        //   card: snap.val()
        // })
      }
      setState({
        cards: dbCards,
        cardsDone: dbCardsDone,
        card: dbCard
      })
    })
  }, [])
  // useEffect(() => {
  //   app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards-learned/`).on('child_added', snap => {
  //     if((snap.val().date - Date.parse(new Date())) < 0) {
  //       app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards-learned/`).child(snap.key).remove(); // removes from the learned database 
  //       app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).push().set({ // pushes card to the learning database
  //         id: snap.val().id,
  //         eng: snap.val().eng,
  //         han: snap.val().han,
  //         pin: snap.val().pin,
  //         done: snap.val().done
  //       })
  //     } else {
  //       if(snap.exists()) {
  //         setState({ // pushes card learned entities to dbCardsDone
  //           ...state,
  //           cardsDone: {
  //             key: snap.key,
  //             id: snap.val().id,
  //             eng: snap.val().eng,
  //             han: snap.val().han,
  //             pin: snap.val().pin,
  //             done: snap.val().done,
  //             date: snap.val().date
  //           }
  //         })
  //       }
  //       // this.setState({
  //       //   cardsDone: dbCardsDone.filter(cardDone => cardDone.date - Date.parse(new Date()) > 0), // gets all entities from dbCardsDone and saves it into state
  //       //   cardSearch: [...dbCards, ...dbCardsDone]
  //       // })
  //     }
  //   })
  // }, [])

  
  // useEffect(() => {
  //   app.database().ref(`/users/CaIqDM8rMUgjpiqPEqGV1MzVN9S2/cards/`).orderByKey().limitToFirst(1).on('child_added', snap => {
  //     if(snap.exists()) {
  //       setState({
  //         ...state,
  //         card: snap.val()
  //       })
  //     }
  //   })
  // }, [])

}