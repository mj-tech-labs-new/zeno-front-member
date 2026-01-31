import {memo, useEffect, useState} from 'react'

import {BasicSkeleton, CommonTableComponent, EmptyComponent} from '@/components'
import WithdrawButton from '@/components/CommonButton/WithdrawButton'
import {Constants, English, Utility} from '@/helpers'
import {FundedChallengeType} from '@/types/apiTypes/PayoutApiType'

import PayoutApi from '../api/PayoutApi'
import PayoutLayout from '../layout/PayoutLayout'

const FundedChallenges = (props: {address: string}) => {
  const {address} = props
  const [totalFundedChallenges, setTotalFundedChallenges] = useState<
    FundedChallengeType[]
  >([])
  const [isLoadingFundedChallenge, setIsLoadingFundedChallenge] = useState(true)

  useEffect(() => {
    PayoutApi.getFundedChallengesData()
      .then((res) => {
        setTotalFundedChallenges(res)
      })
      .finally(() => {
        setIsLoadingFundedChallenge(false)
      })
  }, [])

  return (
    <PayoutLayout singleLineContent={English.E442}>
      <CommonTableComponent
        layoutClassName="bg-tertiary-bg-color  border! border-solid! border-info-bg-color!"
        tableHeading={Constants.FundedAccountHeading}
      >
        {isLoadingFundedChallenge ? (
          <BasicSkeleton type="tableSkeleton" />
        ) : totalFundedChallenges.length === 0 ? (
          <EmptyComponent isTableType />
        ) : (
          totalFundedChallenges?.map((item, index) => {
            const {challenge_id, challenge_name, released_profit} = item
            return (
              <tr
                key={`funded_challenge__${index.toString()}`}
                className="*:px-6 border-b border-info-bg-color border-solid *:py-6 *:whitespace-nowrap *:text-sm *:leading-5 *:font-light *:font-inter *:text-secondary-light-color"
              >
                <td className="py-4 px-6 text-sm/5 font-normal font-inter! text-tertiary-color ">
                  {challenge_id}
                </td>
                <td className="py-4 px-6 text-secondary-light-color text-sm/5">
                  {challenge_name}
                </td>
                <td className="py-4 px-6 text-secondary-light-color text-sm/5">
                  {Utility.numberConversion(released_profit ?? 0)}
                </td>
                <td align="center" className="py-4 px-6">
                  {released_profit !== 0 && released_profit ? (
                    <WithdrawButton
                      availableAmount={released_profit ?? 0}
                      challenge_id={challenge_id}
                      walletAddress={address}
                    />
                  ) : (
                    '---'
                  )}
                </td>
              </tr>
            )
          })
        )}
      </CommonTableComponent>
    </PayoutLayout>
  )
}

export default memo(FundedChallenges)
