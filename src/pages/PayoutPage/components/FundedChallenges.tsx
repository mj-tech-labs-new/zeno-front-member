import {memo, useEffect, useState} from 'react'

import {BasicSkeleton, CommonTableComponent, EmptyComponent} from '@/components'
import WithdrawButton from '@/components/CommonButton/WithdrawButton'
import {Constants, English} from '@/helpers'

import PayoutApi from '../api/PayoutApi'
import PayoutLayout from '../layout/PayoutLayout'

const FundedChallenges = () => {
  const [totalFundedChallenges, setTotalFundedChallenges] = useState<any[]>([])
  const [isLoadingFundedChallenge, setIsLoadingFundedChallenge] = useState(true)

  useEffect(() => {
    PayoutApi.getFundedChallengesData()
      .then(() => {
        setTotalFundedChallenges([])
      })
      .finally(() => {
        setIsLoadingFundedChallenge(false)
      })
  }, [])

  return (
    <PayoutLayout singleLineContent={English.E442}>
      <CommonTableComponent tableHeading={Constants.FundedAccountHeading}>
        {isLoadingFundedChallenge ? (
          <BasicSkeleton type="tableSkeleton" />
        ) : totalFundedChallenges.length !== 0 ? (
          <EmptyComponent isTableType />
        ) : (
          Array.from({length: 1})?.map((_, index) => (
            <tr key={`funded_challenge__${index.toString()}`}>
              <td className="py-4 px-6 text-sm/5 font-normal font-inter! text-tertiary-color ">
                P-2025-001
              </td>
              <td className="py-4 px-6 text-secondary-light-color text-sm/5">
                Stage 1
              </td>
              <td className="py-4 px-6 text-secondary-light-color text-sm/5">
                10,000 USDT
              </td>
              <td align="center" className="py-4 px-6">
                <WithdrawButton availableAmount={2000} />
              </td>
            </tr>
          ))
        )}
      </CommonTableComponent>
    </PayoutLayout>
  )
}

export default memo(FundedChallenges)
