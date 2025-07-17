import { useEffect, useRef, useState } from 'react'

export default function useRequest(fn) {
  const unMountedRef = useRef()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useEffect(() => {
    setLoading(true)
    unMountedRef.current = false
    const promise = fn()

    promise
      .then((res) => {
        if (!unMountedRef.current) {
          setData(res)
          console.log('optimize-hook res', res)
        }
      })
      .finally(() => {
        if (!unMountedRef.current) {
          console.log('optimize-hook finally')
          setLoading(false)
        }
      })

    return () => {
      if (promise && promise.abort) {
        promise.abort('component destroy')
      }

      unMountedRef.current = true
    }
  }, [])

  return {
    loading,
    data
  }
}
