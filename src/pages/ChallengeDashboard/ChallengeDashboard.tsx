import {useMemo} from 'react'

import {
  ChallengeCompletionCard,
  ChallengeStatusCard,
  Loader,
} from '@/components'
import {English} from '@/helpers'
import ChallengeDashboardLayout from '@/layouts/ChallengeDashboardLayout'

import {useChallengeProvider} from './context/ChallengeDashboardProvider'
import ClosedPNL from './sections/ClosedPNL'
import TradingDescriptionSection from './sections/TradingDescriptionSection'

const ChallengeDashboard = () => {
  const {getChallengeByIdArray, showLoader} = useChallengeProvider()
  const showHeader = useMemo(() => false, [])

  return (
    <ChallengeDashboardLayout>
      <Loader ref={(ref) => ref?.showLoader(showLoader)} />
      <div className="space-y-12 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
          <ChallengeStatusCard />
          <ChallengeCompletionCard
            totalAmount={
              getChallengeByIdArray?.[0]?.ChallengePlan[0].capital_fund
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
        <ClosedPNL showHeader={showHeader} />
      </div>
    </ChallengeDashboardLayout>
  )
}

export default ChallengeDashboard
