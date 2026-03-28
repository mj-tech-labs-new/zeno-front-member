import {memo, useMemo} from 'react'

import {English, ToolTipContent, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {useChallengeProvider} from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'

import CircularProgressBarComponent from '../ProgessBar/CircularProgressBar'
import Info from '../Tooltips/Info'

const ChallengeCompletionCard = () => {
  const {getChallengeByIdArray} = useChallengeProvider()
  const totalAmount = useMemo(
    () => parseFloat(getChallengeByIdArray?.current_usdt.toString() ?? '0'),
    [getChallengeByIdArray]
  )

  const cardAmount = useMemo(() => {
    const totalAmountUSDTFormat = Utility.numberConversion(totalAmount)
    const splittedItems = totalAmountUSDTFormat?.toString()?.split('.')
    return {first: splittedItems?.[0], second: splittedItems?.[1] ?? '00'}
  }, [totalAmount])

  return (
    <ChallengeCardLayout className="max-h-[350px] h-full flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-5">
          <span className="text-text-hint-color text-15 !leading-6 font-normal">
            {`${English.E58} ${English.E440} ${English.E481}`}
          </span>
          <Info singleLineContent={ToolTipContent.T1} />
        </div>
        <p className="text-tertiary-color text-2xl/6 font-normal">
          {cardAmount?.first}.
          <span className="text-secondary-light-color">
            {cardAmount?.second}
          </span>{' '}
          {English.E60}
        </p>
      </div>

      <CircularProgressBarComponent
        GetChallengeByIdType={getChallengeByIdArray}
      />
    </ChallengeCardLayout>
  )
}

export default memo(ChallengeCompletionCard)
