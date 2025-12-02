import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import {
  ChallengeCompletionCard,
  ChallengeStatusCard,
  Loader,
} from '@/components'
import {English} from '@/helpers'
import ChallengeDashboardLayout from '@/layouts/ChallengeDashboardLayout'

import {
  getChallengeByIdApi,
  tradingStatisticsApi,
} from './api/ChallengeDashboardApi'
import {useChallengeProvider} from './context/ChallengeDashboardProvider'
import ClosedPNL from './sections/ClosedPNL'
import TradingDescriptionSection from './sections/TradingDescriptionSection'

const ChallengeDashboard = () => {
  const {
    getChallengeByIdArray,
    showLoader,
    setChallengeId,
    challengeId,
    setShowLoader,
    setGetChallengeByIdArray,
    setTradingStatistics,
  } = useChallengeProvider()
  const location = useLocation()
  useEffect(() => {
    setChallengeId(location.state?.challengeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.challengeId])

  useEffect(() => {
    if (!challengeId) return
    setShowLoader(true)
    getChallengeByIdApi({challenge_id: challengeId})
      .then((res) => {
        setGetChallengeByIdArray(res)
      })
      .finally(() => setShowLoader(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId])

  useEffect(() => {
    if (getChallengeByIdArray?.length === 0 || !challengeId) return
    tradingStatisticsApi({
      challenge_id: challengeId,
    }).then((res) => {
      setTradingStatistics(res)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId, getChallengeByIdArray])

  return (
    <ChallengeDashboardLayout>
      <Loader ref={(ref) => ref?.showLoader(showLoader)} />
      <div className="space-y-12 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
          <ChallengeStatusCard />
          <ChallengeCompletionCard
            totalAmount={
              getChallengeByIdArray?.[0]?.ChallengePlan[0].capital_fund ?? 0
            }
          />
          <TradingDescriptionSection type={English.E257} />
        </div>
        <TradingDescriptionSection
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          layoutClassName="[&>h2]:!tracking-[0px]"
          type={English.E64}
        />
        <TradingDescriptionSection
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          layoutClassName="[&>h2]:!tracking-[0px]"
          type={English.E65}
        />
        <ClosedPNL showHeader />
      </div>
    </ChallengeDashboardLayout>
  )
}

export default ChallengeDashboard
