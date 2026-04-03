import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Loader } from '@/components'
import { useRewardCalculation } from '@/hooks'
import { getUserApi } from '@/pages/AuthPages/api/AuthApi'
import { AppLoaderRef } from '@/types/ComponentTypes'
import { RewardEarning } from '@/types/Rewards'

import ReferralLinkSection from '../../../components/ReferralCode/ReferralLinkSection'
import CardSection from '../Components/CardSection'
import CertificateBarChart from '../Components/CertificateBarChart'
import EarningRewardTable from '../Components/EarningRewardTable'

const Dashboard = () => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const loaderRef = useRef<AppLoaderRef>(null)

  const { earningData } = useRewardCalculation()
  const [referral_code, setReferral_code] = useState<null | string>(null)

  const getReferral = useCallback(() => {
    getUserApi()
      .then((res) => {
        if (!res?.referral_code) return
        setReferral_code(
          `${window.location.origin}/sign-up/?refCode=${res.referral_code ?? ''}`
        )
      })
      .finally(() => {
        loaderRef.current?.showLoader(false)
      })
  }, [])

  useEffect(() => {
    getReferral()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col gap-8 ">
      <Loader ref={loaderRef} />

      <CardSection earnings={earningData as RewardEarning} />

      {referral_code && referral_code !== '' && referral_code !== 'null' && (
        <ReferralLinkSection singleLineContent={referral_code} />
      )}
      <EarningRewardTable />
      <CertificateBarChart />
    </div>
  )
}

export default Dashboard
