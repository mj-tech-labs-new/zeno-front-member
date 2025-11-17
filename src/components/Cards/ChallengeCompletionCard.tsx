import {memo, useMemo} from 'react'

import {English, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {useChallengeProvider} from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'
// import { useChallengeProvider } from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'
import {ChallengeCompletionCardProps} from '@/types/ChallengeTypes'

import CircularProgressBarComponent from '../ProgessBar/CircularProgressBar'

const ChallengeCompletionCard = (props: ChallengeCompletionCardProps) => {
  const {totalAmount} = props
  const {getChallengeByIdArray} = useChallengeProvider()

  const cardAmount = useMemo(() => {
    const totalAmountUSDTFormat = Utility.numberConversion(Number(totalAmount))
    const splittedItems = totalAmountUSDTFormat?.toString()?.split('.')
    return {first: splittedItems?.[0], second: splittedItems?.[1] ?? '00'}
  }, [totalAmount])

  return (
    <ChallengeCardLayout className="max-h-[350px] h-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-text-hint-color text-15 !leading-6 font-normal">
          {English.E59}
        </span>
        <p className="text-tertiary-color text-2xl/6 font-normal">
          {cardAmount?.first}.
          <span className="text-secondary-light-color">
            {cardAmount?.second}
          </span>{' '}
          {English.E60}
        </p>
      </div>

      <CircularProgressBarComponent
        totalAmount={totalAmount}
        usedBalance={
          (totalAmount ?? 60000) -
          (getChallengeByIdArray?.[0]?.used_usdt_capital ?? 5340.31)
        }
      />
    </ChallengeCardLayout>
  )
}

export default memo(ChallengeCompletionCard)
