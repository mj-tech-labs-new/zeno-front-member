import {memo, useEffect, useState} from 'react'

import {Utility} from '@/helpers'

const Timer = ({seconds}: {seconds: number}) => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (seconds !== 0) {
      setTimer(seconds)
    }
  }, [seconds])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev - 1 < 0) {
          clearInterval(intervalId)
          window.location.reload()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  return (
    <p className="text-primary-green text-center text_13_utility font-medium">
      {Utility.formatTime(timer)}
    </p>
  )
}

export default memo(Timer)
