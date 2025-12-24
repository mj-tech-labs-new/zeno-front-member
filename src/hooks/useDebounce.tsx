import {useEffect, useState} from 'react'

const useDebounce = (value: string, delay?: number) => {
  const [currentValue, setCurrentValue] = useState(value)
  useEffect(() => {
    setTimeout(() => {
      setCurrentValue(value)
    }, delay ?? 0)
  }, [delay, value])

  return currentValue
}

export default useDebounce
