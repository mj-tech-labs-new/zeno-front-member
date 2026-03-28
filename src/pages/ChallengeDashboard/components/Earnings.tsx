import {toNumber} from 'lodash'
import {useCallback, useEffect, useState} from 'react'

import {BasicSkeleton, Info, TotalPayout} from '@/components'
import WithdrawButton from '@/components/CommonButton/WithdrawButton'
import {English, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import PayoutApi from '@/pages/PayoutPage/api/PayoutApi'

import {getTotalEaringsData} from '../api/ChallengeDashboardApi'
import {useChallengeProvider} from '../context/ChallengeDashboardProvider'

const Earnings = () => {
  const [wallet, setWallet] = useState('')
  const [totalEarningAmt, setTotalEarningAmt] = useState('0')
  const [isLoadingEarning, setIsLoadingEarning] = useState({
    data: true,
    wallet: true,
  })
  const {challengeId} = useChallengeProvider()

  const getTotalEarnings = useCallback((challenge_id: string) => {
    getTotalEaringsData(challenge_id)
      .then((res) => {
        if (res !== '' && res) {
          setTotalEarningAmt(res)
        }
      })
      .finally(() => {
        setIsLoadingEarning((prev) => ({...prev, data: false}))
      })
  }, [])

  useEffect(() => {
    if (challengeId && challengeId !== '') {
      setIsLoadingEarning((prev) => ({...prev, data: true}))
      getTotalEarnings(challengeId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId])

  useEffect(() => {
    setIsLoadingEarning((prev) => ({...prev, wallet: true}))
    PayoutApi.getPayoutWalletAddress()
      .then((res) => {
        setWallet(res)
      })
      .finally(() => {
        setIsLoadingEarning((prev) => ({...prev, wallet: false}))
      })
  }, [])

  return (
    <div className="space-y-6">
      <p className="text-tertiary-color">{English.E448}</p>
      {Object.values(isLoadingEarning).some((item) => item) ? (
        <BasicSkeleton className="h-33! w-full!" />
      ) : (
        <div className="flex gap-4">
          <ChallengeCardLayout className="w-fit!">
            <div className="flex gap-5 items-start justify-between">
              <div className="flex flex-col  gap-2 mb-[18px]">
                <span className="text-15 leading-6! font-light font-switzer! text-text-hint-color">{`${English.E58} ${English.E448}`}</span>
                <span className="text-lg/6 font-switzer! font-light text-tertiary-color">{`${Utility.numberConversion(toNumber(totalEarningAmt))} ${English.E60}`}</span>
              </div>
              <Info
                className="opacity-50"
                singleLineContent={`${English.E58} ${English.E448}`}
              />
            </div>

            {challengeId && (
              <WithdrawButton
                availableAmount={toNumber(totalEarningAmt)}
                challenge_id={challengeId}
                walletAddress={wallet}
                className={
                  parseFloat(totalEarningAmt) <= 0
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }
              />
            )}
          </ChallengeCardLayout>
          <TotalPayout />
        </div>
      )}
    </div>
  )
}

export default Earnings
