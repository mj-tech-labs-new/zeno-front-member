import {memo, useMemo} from 'react'

import {English, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {ChallengeCompletionCardProps} from '@/types/ChallengeTypes'

import CircularProgressBarComponent from '../ProgessBar/CircularProgressBar'

const ChallengeCompletionCard = (props: ChallengeCompletionCardProps) => {
  const {totalAmount} = props

  const cardAmount = useMemo(() => {
    const splittedItems = totalAmount?.toString()?.split('.')
    return {first: splittedItems?.[0], second: splittedItems?.[1] || '00'}
  }, [totalAmount])

  return (
    <ChallengeCardLayout className="max-h-[350px] h-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-text-hint-color text-15 !leading-6 font-normal">
          {English.E59}
        </span>
        <p className="text-tertiary-color text-2xl/6 font-normal">
          {Utility.numberConversion(Number(cardAmount?.first))}.
          <span className="text-secondary-light-color">
            {cardAmount?.second}
          </span>{' '}
          {English.E60}
        </p>
      </div>

      <CircularProgressBarComponent
        usedBalance={1340.31}
        totalAmount={totalAmount}
      />
    </ChallengeCardLayout>
  )
}

export default memo(ChallengeCompletionCard)
