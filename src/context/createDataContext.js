import React, { useReducer } from 'react'

// Create a new data context automatically
export default (reducer, actions, initialState) => {
  const Context = React.createContext()

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // actions = { addBlogPost: (dispatch) => { return () => {} } }
    const boundActions = {}
    for (let key in actions) {
      // key === 'addBlogPost' etc
      boundActions[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider
        value={{
          state: state /* can also write as just {{ state }} */,
          ...boundActions
        }}
      >
        {children}
      </Context.Provider>
    )
  }

  return { Context, Provider }
}
