import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase from 'firebase';
import { app } from '../db/Firebase'
import { Link } from 'react-router-dom';
import { databaseUser } from '../db/Firebase'
import '../css/Register.css'


function Register() {
  const initialState = {
    regUser: '',
    regPass: ''
  }
  const [state, setState] = useState(initialState)
  const history = useHistory();

  const onChange = (e) => {
    setState({[e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    app.auth().createUserWithEmailAndPassword(state.regUser, state.regPass)
      .then((userCreds) => {
        return (        
          app.database().ref('/users/' + userCreds.user.uid).set({
            email: userCreds.user.email,
            uid: userCreds.user.uid,
          }),
          history.push("/")
        )
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
    setState({
      ...state,
      regUser: '',
      regPass: ''
    })
  }
  return (
    <div className="register-container">
      <h3>Register</h3>
      <form >
        <input type="text" name="eng" autocomplete="off" placeholder="Email" value={state.regUser} onChange={(e)=> setState({...state, regUser: e.target.value})}/><br/>
        <div className="divider"></div>
        <input type="password" name="eng" autocomplete="off" placeholder="Password" value={state.regPass} onChange={(e) => setState({...state, regPass: e.target.value})}/><br/>
        <button className="submit-button" onClick={(e) => onSubmit(e)}>Submit</button>
      </form>
    </div>
  )
}

export default Register
