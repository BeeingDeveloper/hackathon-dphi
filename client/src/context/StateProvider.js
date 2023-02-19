import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer'


export const StateContext = createContext();

const StateProvider = (props) => {

    const initialState = {
        user: null,
        hackathons: null,
        allUsers: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{state, dispatch}} >
        {props.children}
    </StateContext.Provider>
  )
}

export default StateProvider