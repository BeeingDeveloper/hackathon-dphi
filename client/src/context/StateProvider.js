import React, { createContext, useReducer, useState } from 'react'
import { reducer } from './reducer'


export const StateContext = createContext();

const StateProvider = (props) => {

    const initialState = {
        user: null,
        hackathons: null,
        allUsers: null
    }


    const [activeAlert, setActiveAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');
    const [isPositive, setIsPositive] = useState(false);



    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{state, dispatch, activeAlert, setActiveAlert, alertMsg, setAlertMsg, isPositive, setIsPositive}} >
        {props.children}
    </StateContext.Provider>
  )
}

export default StateProvider