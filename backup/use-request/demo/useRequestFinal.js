import { useRef, useState } from 'react'
import { useCompareEffect } from '@slsanyi/hooks'

export default function useRequest(fn, params) {
  const unMountedRef = useRef()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  useCompareEffect(() => {
    setLoading(true)
    unMountedRef.current = false
    const promise = fn(params)

    promise
      .then((res) => {
        if (!unMountedRef.current) {
          setData(res)
          console.log('optimize-hook-final res', res)
        }
      })
      .finally(() => {
        if (!unMountedRef.current) {
          console.log('optimize-hook-final finally')
          setLoading(false)
        }
      })

    return () => {
      if (promise && promise.abort) {
        promise.abort('component destroy')
      }

      unMountedRef.current = true
    }
  }, [params])

  return {
    loading,
    data
  }
}
