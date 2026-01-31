import {useEffect, useState} from 'react'

import {BasicSkeleton, ChallengeWallet, HeadingComponent} from '@/components'
import {English, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'

import PayoutApi from './api/PayoutApi'
import FundedChallenges from './components/FundedChallenges'
import PayoutHistory from './components/PayoutHistory'

const PayoutPage = () => {
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

  return (
    <div className="flex flex-col gap-8 mt-8 pb-3.5">
      <HeadingComponent singleLineContent={English.E23} variant="medium" />

      <div className=" grid grid-cols-1 md:flex gap-4 ">
        {isLoading ? (
          <BasicSkeleton className="h-52! w-full!" />
        ) : (
          <ChallengeCardLayout className="max-w-72 ">
            <span className="text-15 !leading-6 text-text-hint-color font-switzer!">
              {English.E100}
            </span>
            <div className="mt-2">
              <span className="text-lg/6 font-normal text-primary-color font-switzer!">{`${Utility.numberConversion(totalPayout)} ${English.E60}`}</span>
            </div>
          </ChallengeCardLayout>
        )}
        <ChallengeWallet />
      </div>

      <FundedChallenges />
      <PayoutHistory />
    </div>
  )
}

export default PayoutPage
