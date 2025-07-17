import React, { createContext, useContext } from 'react'

export function createStore(useHook) {
  const Context = createContext(null)

  function Provider(props) {
    const { children, initialState } = props

    const value = useHook(initialState)

    return <Context.Provider value={value}>{children}</Context.Provider>
  }

  function useStore() {
    return useContext(Context)
  }

  return {
    Provider,
    useStore
  }
}
