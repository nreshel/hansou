import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase'
import '../css/SignIn.css'

function SignIn() {
  const initialState = {
    signInUser: '',
    singInPass: ''
  }
  const [state, setState] = useState(initialState)
  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(state.signInUser, state.signInPass)
      .then(() => {
        history.push("/")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    setState({
      ...state,
      signInUser: '',
      signInPass: ''
    })
  }
  return (
    <div className="signin-container">
      <h3>Sign In</h3>
      <form >
        <input type="text" name="eng" autocomplete="off" placeholder="Email" value={state.signInUser} onChange={(e)=> setState({...state, signInUser: e.target.value})}/><br/>
        <div className="divider"></div>
        <input type="password" name="eng" autocomplete="off" placeholder="Password" value={state.signInPass} onChange={(e) => setState({...state, signInPass: e.target.value})}/><br/>
        <button className="submit-button" onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  )
}

export default SignIn
