import {useMemo} from 'react'

import {StatsCardProps} from '@/types/ComponentTypes'

const PercentageLabel = (
  props: Pick<StatsCardProps, 'initialContent' | 'secondContent'>
) => {
  const {initialContent, secondContent} = props
  const difference = useMemo(() => {
    return initialContent === '---'
      ? '---'
      : Number(secondContent) - Number(initialContent)
  }, [initialContent, secondContent])
  const percentage = useMemo(() => {
    return initialContent === '---'
      ? '---'
      : (Number(secondContent) / Number(initialContent) / 100).toFixed(2)
  }, [initialContent, secondContent])
  return (
    <div className="flex gap-2">
      <p
        className={`text-lg/6 font-normal ${initialContent === '---' ? 'text-primary-color' : 'text-light-success-color'}`}
      >
        {difference}{' '}
        <span
          className={` px-1 pb-0.5 rounded-md text-primary-color ${initialContent === '---' ? 'bg-dropdown-bg-color' : 'bg-extra-dark-success-color '}`}
        >
          ({percentage}%)
        </span>
      </p>
    </div>
  )
}

export default PercentageLabel
