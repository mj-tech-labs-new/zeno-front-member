import {useMemo} from 'react'

import {English, Utility} from '@/helpers'
import {StatsCardProps} from '@/types/ComponentTypes'

import PercentageLabel from '../PercentageLabel/PercentageLabel'
import LinearProgressBar from '../ProgessBar/LinearProgressBar'
import Info from '../Tooltips/Info'

const StatsDescription = (props: StatsCardProps) => {
  const {
    headingContent,
    infoContent,
    initialContent,
    secondContent,
    type,
    className = '',
    thirdContent = 0,
  } = props

  const percentage = useMemo(
    () => ((Number(secondContent) / Number(initialContent)) * 100).toFixed(2),
    [initialContent, secondContent]
  )

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex gap-4 items-center ${!(type === English.E259) && 'justify-between'}`}
      >
        <span className="text-text-hint-color text-15 !leading-6">
          {headingContent}
        </span>
        {type !== English.E65 && (
          <Info className={className} singleLineContent={infoContent} />
        )}
      </div>

      {type === English.E257 && (
        <PercentageLabel
          headingContent={headingContent}
          initialContent={initialContent}
          secondContent={secondContent}
        />
      )}

      {type === English.E65 && (
        <div>
          <span className="text-tertiary-color tex-lg/6 font-normal">
            {headingContent === English.E72
              ? (initialContent ?? 0)
              : `${initialContent.toFixed(2) ?? 0.0} %`}
          </span>

          <span>
            {!(
              headingContent === English.E72 || headingContent === English.E73
            ) && (
              <p className="text-text-hint-color text-13 !leading-6 font-normal">
                {English.E80}: {secondContent.toFixed(2) ?? 0.0}%
              </p>
            )}
          </span>

          {(headingContent === English.E72 ||
            headingContent === English.E73) && (
            <p className="text-13 leading-6 text-tertiary-color flex gap-2">
              <span className="text-light-success-color">
                {headingContent === English.E72
                  ? `${secondContent ?? 0} ${English.E74}`
                  : `${secondContent ?? 0} ${English.E76}`}
              </span>
              <span>/</span>
              <span className="text-light-danger-color">
                {headingContent === English.E72
                  ? `${thirdContent ?? 0} ${English.E75}`
                  : `${thirdContent ?? 0} ${English.E77}`}
              </span>
            </p>
          )}
        </div>
      )}

      {(type === English.E64 || type === English.E259) && (
        <div className="flex flex-col gap-6">
          <p className="text-lg/6 text-tertiary-color font-normal capitalize">
            <span
              className={
                headingContent === English.E66 || headingContent === English.E68
                  ? secondContent >= 0
                    ? 'text-light-success-color'
                    : 'text-light-danger-color'
                  : 'text-light-danger-color'
              }
            >
              {headingContent !== English.E66
                ? Utility.numberConversion(secondContent)
                : secondContent}
            </span>{' '}
            /{' '}
            {headingContent !== English.E66
              ? Utility.numberConversion(initialContent)
              : initialContent}{' '}
            {headingContent === English.E66 ? English.E67 : English.E60}
          </p>

          {type === English.E64 && (
            <LinearProgressBar percentage={Number(percentage)} />
          )}
        </div>
      )}
    </div>
  )
}

export default StatsDescription
