import {memo, useEffect, useRef} from 'react'

import {useChallengeProvider} from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'

const LinearProgressBar = (props: {percentage: number}) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const {percentage} = props
  const {getChallengeByIdArray} = useChallengeProvider()

  useEffect(() => {
    if (progressBarRef.current === null) return

    progressBarRef.current.style.width = `${percentage}%`
  }, [getChallengeByIdArray, percentage])

  return (
    <div className="relative h-3 rounded-full bg-info-bg-color w-full overflow-hidden">
      <div
        ref={progressBarRef}
        className="bg-light-danger-color h-full absolute left-0 top-0 rounded-full w-0 duration-300 ease-in-out delay-300"
      />
    </div>
  )
}

export default memo(LinearProgressBar)
