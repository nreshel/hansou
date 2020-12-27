import React, { useContext } from 'react';
import { GlobalContext, GlobalProvider } from '../context/GlobalState'
import { useLocation } from "react-router-dom";
function AddFlashCard() {
  // const { state, setState } = useContext(GlobalContext);
  let location = useLocation();
  console.log(location)
  return (
    <div>
      
    </div>
  )
}

export default AddFlashCard;
