import {English} from '@/helpers'
import {RewardEarning} from '@/types/Rewards'

import DashboardSectionLayout from '../sections/DashboardSectionLayout'
import DashboardCard from './DashboardCard'

const CardSection = (props: {earnings: RewardEarning}) => {
  const {earnings} = props
  const EarningCards = [
    {
      heading: English.E472,
      tooltip:
        'Points earned from completed reward activities today (00:00–23:59 UTC)',
      title: `${earnings?.today_earning ?? 0} ${English.E490}`,
    },
    {
      heading: English.E491,
      tooltip:
        'Total reward points earned by you across all activities since joining Zeno Traders.',
      title: `${earnings?.total_earning ?? 0} ${English.E490}`,
    },

    {
      heading: English.E473,
      tooltip:
        'Points earned during Season 1 of the Zeno Rewards Program only.',
      title: `${earnings?.season1_earning ?? 0} ${English.E490}`,
    },
  ]
  return (
    <DashboardSectionLayout singleLineContent={English.E448}>
      <div
        className={`grid  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-4 `}
      >
        {EarningCards?.map((item, index) => (
          <DashboardCard
            key={`card_${index + 1}`}
            content={item.title}
            infoContent={item.tooltip}
            title={item.heading}
          />
        ))}
      </div>
    </DashboardSectionLayout>
  )
}

export default CardSection
