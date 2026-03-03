import { memo } from 'react'

import { English } from '@/helpers'
import { GeneralProps } from '@/types/CommonTypes'
import { StatsCardProps } from '@/types/ComponentTypes'

const PercentageLabel = (
  props: Pick<
    StatsCardProps,
    'initialContent' | 'secondContent' | 'headingContent'
  > & Pick<GeneralProps, 'layoutClassName'>
) => {
  const { headingContent, initialContent = 0, secondContent = 0, layoutClassName = '' } = props

  return (
    <div className="flex gap-2">
      <p
        className={`text-lg/6 font-normal ${layoutClassName} ${initialContent.toString().startsWith('-') ? 'text-extra-dark-danger-color' : 'text-light-success-color'}`}
      >
        <span>
          {initialContent !== 0 && typeof initialContent !== 'string'
            ? initialContent.toFixed(2)
            : '---'}{' '}
        </span>
        {headingContent !== English.E63 && (
          <span
            className={`px-1 pb-0.5 rounded-md text-primary-color  ${secondContent.toString().startsWith('-') ? 'bg-light-danger-color' : 'bg-extra-dark-success-color'}`}
          >
            (
            {typeof secondContent !== 'string'
              ? (secondContent.toFixed(2) ?? '')
              : ''}
            %)
          </span>
        )}
      </p>
    </div>
  )
}

export default memo(PercentageLabel)
