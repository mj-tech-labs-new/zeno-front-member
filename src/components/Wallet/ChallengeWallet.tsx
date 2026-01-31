import {memo} from 'react'

import {English, Utility} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'

import BasicSkeleton from '../SkeletonComponents/BasicSkeleton'
import ChangeWalletBtn from './ChangeWalletBtn'

interface ChallengeWalletProps {
  isLoadingWallet: boolean
  walletAddress: string
  onChangeWallet: (value: string) => void
}

const ChallengeWallet = (props: ChallengeWalletProps) => {
  const {isLoadingWallet, walletAddress, onChangeWallet} = props

  return isLoadingWallet ? (
    <BasicSkeleton className="h-33! w-full!" />
  ) : (
    <ChallengeCardLayout className="max-w-72">
      <span className="text-15 !leading-6 text-text-hint-color font-switzer!">
        {English.E440}
      </span>
      <div className="mt-2">
        <p className="text-lg/6 font-normal text-primary-color font-switzer!">
          {Utility.generateTrimmedWallet(walletAddress, 10)}
        </p>
        <span className="text-13 leading-6! text-text-hint-color font-light font-switzer">
          {English.E379}
        </span>
      </div>

      <ChangeWalletBtn onPressClose={onChangeWallet} wallet={walletAddress} />
    </ChallengeCardLayout>
  )
}

export default memo(ChallengeWallet)
