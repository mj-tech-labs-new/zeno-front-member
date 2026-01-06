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
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center flex-wrap floating__container gap-x-2 ${
          filterType ? 'gap-y-10' : 'gap-y-2'
        }`}
      >
        {tabArray.map((item, index) => {
          const {content, labelText = ''} = item
          const isActive = index === selectedIndex

          return (
            <div
              key={`tab_${content}_${index}`}
              className={`py-2 ${labelText ? 'rounded-tl-none!' : ''} px-4 shrink-0! whitespace-nowrap bg-info-bg-color/30 rounded-[8px] border text-tertiary-color font-geist! text-base/6 font-medium relative ${
                isActive
                  ? 'border-tertiary-color pointer-events-none'
                  : 'border-landing-page-trading-rules-para-text cursor-pointer'
              }`}
              onClick={(e) => {
                e.stopPropagation()
                onPressIndex(index)
              }}
            >
              {labelText && (
                <Labels
                  className="whitespace-nowrap"
                  id="label_text"
                  singleLineContent={labelText}
                />
              )}

              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SimpleTab
