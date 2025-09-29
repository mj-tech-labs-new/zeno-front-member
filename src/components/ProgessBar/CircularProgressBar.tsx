import 'react-circular-progressbar/dist/styles.css'

import {memo, useMemo} from 'react'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar'

import {English} from '@/helpers'
import {CircularProgressBarType} from '@/types/ComponentTypes'

const CircularProgressBarComponent = (props: CircularProgressBarType) => {
  const {usedBalance, className = '', totalAmount} = props

  const percentage = useMemo(() => {
    return (usedBalance / Number(totalAmount)) * 100
  }, [totalAmount, usedBalance])

  return (
    <div className="relative mx-auto">
      <div className="flex flex-col w-full text-center  absolute left-1/2 -translate-x-1/2 top-[calc(50%-17px)]">
        <span className="text-widget-primary-text-color text-sm/6">
          Capital Used
        </span>
        <p className="text-lg/6 font-normal text-tertiary-color">
          {usedBalance} {English.E60}
        </p>
      </div>
      <svg width="0" height="0">
        <defs>
          <linearGradient
id="gradient1" x1="0%"
y1="0%" x2="100%"
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
        value={percentage}
        strokeWidth={8}
        background
        styles={buildStyles({
          backgroundColor: 'var(--widget-primary-bg-color)',
          textColor: 'var(--primary-color)',
          trailColor: 'transparent',
          pathColor: 'url(#gradient1)',
          strokeLinecap: 'round',
        })}
        className={`w-[205px] h-[205px] ${className}`}
      />
    </div>
  )
}

export default memo(CircularProgressBarComponent)
