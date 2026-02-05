import {English} from '@/helpers'
import {RewardEarning} from '@/types/Rewards'

import DashboardSectionLayout from '../sections/DashboardSectionLayout'
import DashboardCard from './DashboardCard'

const CardSection = (props: {earnings: RewardEarning}) => {
  const {earnings} = props
  const EarningCards = [
    {
      heading: English.E491,
      tooltip: '',
      title: `${earnings?.total_earning ?? 0} ${English.E490}`,
    },
    {
      heading: English.E472,
      tooltip: '',
      title: `${earnings?.today_earning ?? 0} ${English.E490}`,
    },
    {
      heading: English.E473,
      tooltip: '',
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
            infoContent={item.heading}
            title={item.heading}
          />
        ))}
      </div>
    </DashboardSectionLayout>
  )
}

export default CardSection
