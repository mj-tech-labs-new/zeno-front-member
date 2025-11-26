import {memo} from 'react'

import {English} from '@/helpers'
import {StatsCardProps} from '@/types/ComponentTypes'

const PercentageLabel = (
  props: Pick<
    StatsCardProps,
    'initialContent' | 'secondContent' | 'headingContent'
  >
) => {
  const {headingContent, initialContent = 0, secondContent = 0} = props

  return (
    <div className="flex gap-2">
      <p
        className={`text-lg/6 font-normal flex items-center gap-2 ${headingContent === English.E61 ? (initialContent.toString().startsWith('-') ? 'text-extra-dark-danger-color' : 'text-light-success-color') : 'text-primary-color'}`}
      >
        <span>
          {initialContent >= 0 && headingContent !== English.E63 && '+'}
          {initialContent.toFixed(2)}
        </span>
        {headingContent !== English.E63 && (
          <span
            className={`px-[5px] pb-0.5 text-sm rounded-md text-primary-color ${headingContent === English.E61 ? (secondContent.toString().startsWith('-') ? 'bg-light-danger-color' : 'bg-extra-dark-success-color') : 'bg-landing-page-trading-rules-para-text'}`}
          >
            ({secondContent >= 0 && '+'}
            {secondContent.toFixed(2) ?? ''}%)
          </span>
        )}
      </p>
    </div>
  )
}

export default memo(PercentageLabel)
