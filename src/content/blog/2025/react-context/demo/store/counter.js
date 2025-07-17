import { useCallback, useState } from 'react'
import { createStore } from './create-store'

function useHook(initialState = 0) {
  const [count, setCount] = useState(initialState)

  const increaseCount = useCallback(() => {
    setCount((pre) => pre + 1)
  }, [])

  return {
    count,
    increaseCount
  }
}

const counterStore = createStore(useHook)

export const CounterProvider = counterStore.Provider

export const useCounter = counterStore.useStore
