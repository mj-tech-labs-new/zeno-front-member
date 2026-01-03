import {useMemo} from 'react'

import {SimpleTabProps} from '@/types/ComponentTypes'

import Labels from '../Labels/Labels'

const SimpleTab = (props: SimpleTabProps) => {
  const {tabArray, className = '', selectedIndex, onPressIndex} = props
  const filterType = useMemo(
    () => tabArray.some((item) => item.labelText !== ''),
    [tabArray]
  )

  return (
    <div
      className={`flex items-center flex-wrap gap-x-2 ${filterType ? 'gap-y-10' : 'gap-y-2'} ${className}`}
    >
      {tabArray?.map((item, index) => {
        const {content, labelText = ''} = item
        const isActive = index === selectedIndex
        return (
          <div
            key={`tab_${content}_${index.toString()}`}
            className={`py-2 px-4 bg-info-bg-color/30 rounded-[8px] border border-solid text-tertiary-color font-geist! text-base/6 font-semibold transition-all duration-500 ease-linear relative ${isActive ? 'border-tertiary-color pointer-events-none' : 'border-landing-page-trading-rules-para-text cursor-pointer'} `}
            onClick={(e) => {
              e.stopPropagation()
              onPressIndex(index)
            }}
          >
            {labelText !== '' && (
              <Labels
                className="whitespace-nowrap"
                singleLineContent={labelText}
              />
            )}
            {content}
          </div>
        )
      })}
    </div>
  )
}

export default SimpleTab
