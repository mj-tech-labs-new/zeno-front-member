import {ChallengeCompletionCard, ChallengeStatusCard} from '@/components'
import {Constants, English} from '@/helpers'
import ChallengeDashboardLayout from '@/layouts/ChallengeDashboardLayout'

// import ClosedPNL from './sections/ClosedPNL'
import TradingDescriptionSection from './sections/TradingDescriptionSection'

const ChallengeDashboard = () => {
  return (
    <ChallengeDashboardLayout>
      <div className="space-y-12 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4">
          <ChallengeStatusCard content={Constants.StatsData} />
          <ChallengeCompletionCard totalAmount={10000.0} />
          <TradingDescriptionSection type="Trading_Stats" />
        </div>
        <TradingDescriptionSection
          type={English.E64}
          isHeadingType
          singleLineContent={English.E64}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        />
        <TradingDescriptionSection
          type={English.E65}
          isHeadingType
          singleLineContent={English.E65}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        />
        {/* <ClosedPNL /> */}
      </div>
    </ChallengeDashboardLayout>
  )
}

export default ChallengeDashboard
