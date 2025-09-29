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
    type,
    secondContent,
    subType = '',
    isProgressBarType = false,
    className = '',
  } = props
  const percentage = useMemo(() => {
    return ((Number(secondContent) / Number(initialContent)) * 100).toFixed(2)
  }, [initialContent, secondContent])
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <span className="text-text-hint-color text-15 !leading-6">
          {headingContent}
        </span>
        <Info singleLineContent={infoContent} className={className} />
      </div>
      {type === 'lablelType' && (
        <PercentageLabel
          initialContent={initialContent}
          secondContent={secondContent}
        />
      )}

      {(type === 'normalType' ||
        type === 'winLossType' ||
        type === 'longShortType' ||
        type === 'normalMoneyType') && (
        <div>
          <span className="text-tertiary-color tex-lg/6 font-normal">
            {Utility.numberConversion(Number(initialContent))}{' '}
            {type === 'normalMoneyType' && English.E60}
          </span>
          {subType === 'win_rate' && (
            <p className="text-text-hint-color text-13 !leading-6 font-normal">
              {English.E80}: {Utility.numberConversion(0)}%
            </p>
          )}
          {(type === 'winLossType' || type === 'longShortType') &&
            subType === '' && (
              <p className="text-13 leading-6">
                <span className="text-light-success-color">
                  0 {type === 'longShortType' ? English.E74 : English.E76}
                </span>{' '}
                /{' '}
                <span className="text-light-danger-color">
                  {type === 'longShortType' ? English.E75 : English.E77}
                </span>
              </p>
            )}
        </div>
      )}

      {(type === 'winProgressType' || type === 'lossProgressType') && (
        <div className="flex flex-col gap-6">
          <p className="text-lg/6 text-tertiary-color font-normal capitalize">
            <span
              className={`${type === 'winProgressType' ? 'text-light-success-color' : 'text-light-danger-color'}`}
            >
              {subType.includes('money')
                ? Utility.numberConversion(Number(secondContent))
                : secondContent}
            </span>{' '}
            /{' '}
            {subType.includes('money')
              ? `${(subType === 'loss_money' ? '-' : '') + Utility.numberConversion(Number(initialContent))}`
              : initialContent}{' '}
            {subType.includes('money') ? English.E60 : English.E67}
          </p>
          {isProgressBarType && (
            <LinearProgressBar percentage={Number(percentage)} />
          )}
        </div>
      )}
    </div>
  )
}

export default StatsDescription
