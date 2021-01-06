import React, { useState } from 'react'
import "../css/RegSignToggle.css"


function RegSignToggle() {
  const [state, setState] = useState({
    toggleUser: '',
    togglePass: ''
  })
  return (
    <div className="toggle-container">
      <h4>Hansou - Flashcards</h4>
      <h2><a href="/register" className="register-toggle-btn">Register</a> &bull; <a href="/sign-in" className="signin-toggle-btn">Sign In</a></h2>
    </div>
  )
}

export default RegSignToggle