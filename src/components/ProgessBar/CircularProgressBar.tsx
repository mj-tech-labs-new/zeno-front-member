import 'react-circular-progressbar/dist/styles.css'

import {memo, useMemo} from 'react'

import {English} from '@/helpers'
import {CircularProgressBarType} from '@/types/ComponentTypes'

const CircularProgressBarComponent = (props: CircularProgressBarType) => {
  const {usedBalance, className = '', totalAmount, GetChallengeByIdType} = props

  const realisedProfit = useMemo(
    () => GetChallengeByIdType?.released_profit,
    [GetChallengeByIdType?.released_profit]
  )

  return (
    <div className="relative mx-auto">
      <div className="flex flex-col w-full text-center  absolute left-1/2 -translate-x-1/2 top-[calc(50%-17px)]">
        <span
          className={` text-sm/6 ${realisedProfit === null || !realisedProfit ? ' text-widget-primary-text-color' : ' text-primary-color'} `}
        >
          Capital Used
        </span>
        {totalAmount && (
          <p
            className={`text-lg/6  ${realisedProfit === null || !realisedProfit ? 'font-normal text-tertiary-color' : 'font-semibold text-primary-color'} `}
          >
            {(usedBalance ?? 0.0).toFixed(2)} {English.E60}
          </p>
        )}
      </div>
      {/* <svg height="0" width="0">
        <defs>
          <linearGradient
            id="gradient1" x1="0%"
            x2="100%" y1="0%"
            y2="100%">
            <stop offset="0%" style={{ stopColor: '#737373', stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: '#d9d9d9', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
      </svg> */}

      {/* <CircularProgressbar
        background
      
        strokeWidth={8}
        value={100 - percentage}
        styles={buildStyles({
          backgroundColor: 'var(--widget-primary-bg-color)',
          textColor: 'var(--primary-color)',
          trailColor: 'transparent',
          pathColor: 'url(#gradient1)',
          strokeLinecap: 'round',
        })}
      /> */}
      <div
        className={`h-[200px] w-[200px] rounded-full  ${realisedProfit === null || !realisedProfit ? 'bg-widget-primary-bg-color! border-18 border-linear-gr-bg4-color' : realisedProfit > 0 ? 'bg-extra-dark-success-color!' : 'bg-light-danger-color!'} ${className}`}
      />
    </div>
  )
}

export default memo(CircularProgressBarComponent)
