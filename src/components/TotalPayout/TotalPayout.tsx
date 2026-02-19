import {useEffect, useState} from 'react'

import {English, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import PayoutApi from '@/pages/PayoutPage/api/PayoutApi'

import BasicSkeleton from '../SkeletonComponents/BasicSkeleton'
import Info from '../Tooltips/Info'

const TotalPayout = () => {
  const [totalPayout, setTotalPayout] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    PayoutApi.getPayoutAmount()
      .then((res) => {
        setTotalPayout(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return isLoading ? (
    <BasicSkeleton className="h-52! w-full!" />
  ) : (
    <ChallengeCardLayout className="max-w-72">
      <div className="flex w-full items-center gap-5 justify-between">
        <span className="text-15 !leading-6 text-text-hint-color font-switzer!">
          {English.E100}
        </span>
        <Info className="opacity-50" singleLineContent={English.E100} />
      </div>
      <div className="mt-2">
        <span className="text-lg/6 font-normal text-primary-color font-switzer!">{`${Utility.numberConversion(totalPayout)} ${English.E60}`}</span>
      </div>
    </ChallengeCardLayout>
  )
}

export default TotalPayout
