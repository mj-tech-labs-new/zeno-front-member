import 'react-circular-progressbar/dist/styles.css'

import {memo, useMemo} from 'react'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar'

import {English} from '@/helpers'
import {CircularProgressBarType} from '@/types/ComponentTypes'

const CircularProgressBarComponent = (props: CircularProgressBarType) => {
  const {usedBalance, className = '', totalAmount} = props

  const percentage = useMemo(
    () => Math.ceil(((usedBalance ?? 0) / Number(totalAmount)) * 100),
    [totalAmount, usedBalance]
  )

  return (
    <div className="relative mx-auto">
      <div className="flex flex-col w-full text-center  absolute left-1/2 -translate-x-1/2 top-[calc(50%-17px)]">
        <span className="text-widget-primary-text-color text-sm/6">
          Capital Used
        </span>
        {totalAmount && (
          <p className="text-lg/6 font-normal text-tertiary-color">
            {(usedBalance ?? 0.0).toFixed(2)} {English.E60}
          </p>
        )}
      </div>
      <svg height="0" width="0">
        <defs>
          <linearGradient
id="gradient1" x1="0%"
x2="100%" y1="0%"
y2="100%">
            <stop offset="0%" style={{stopColor: '#737373', stopOpacity: 1}} />
            <stop
              offset="100%"
              style={{stopColor: '#d9d9d9', stopOpacity: 1}}
            />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbar
        background
        className={`w-[205px] h-[205px] ${className}`}
        strokeWidth={8}
        value={100 - percentage}
        styles={buildStyles({
          backgroundColor: 'var(--widget-primary-bg-color)',
          textColor: 'var(--primary-color)',
          trailColor: 'transparent',
          pathColor: 'url(#gradient1)',
          strokeLinecap: 'round',
        })}
      />
    </div>
  )
}

export default memo(CircularProgressBarComponent)
