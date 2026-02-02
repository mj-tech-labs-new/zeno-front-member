import {useEffect, useState} from 'react'

import {ChallengeWallet, HeadingComponent} from '@/components'
import TotalPayout from '@/components/TotalPayout/TotalPayout'
import {English} from '@/helpers'

import PayoutApi from './api/PayoutApi'
import FundedChallenges from './components/FundedChallenges'
import PayoutHistory from './components/PayoutHistory'

const PayoutPage = () => {
  const [wallet, setWallet] = useState('')
  const [isLoadingWallet, setIsLoadingWallet] = useState(true)
  useEffect(() => {
    setIsLoadingWallet(true)
    PayoutApi.getPayoutWalletAddress()
      .then((res) => {
        setWallet(res)
      })
      .finally(() => {
        setIsLoadingWallet(false)
      })
  }, [])

  return (
    <div className="flex flex-col gap-8 mt-8 pb-3.5">
      <HeadingComponent singleLineContent={English.E23} variant="medium" />

      <div className=" grid grid-cols-1 md:flex gap-4 ">
        <TotalPayout />
        <ChallengeWallet
          isLoadingWallet={isLoadingWallet}
          onChangeWallet={setWallet}
          walletAddress={wallet}
        />
      </div>

      <FundedChallenges address={wallet} />
      <PayoutHistory />
    </div>
  )
}

export default PayoutPage
