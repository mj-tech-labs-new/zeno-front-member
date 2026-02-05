

import { English } from '@/helpers'

import DailyBonusCard from '../components/DailyBonusCard'
import DashboardSectionLayout from '../components/DashboardSectionLayout'

const DailyLoginBonus = () =>
// const [DashboardData, setDashboardData] = useState()

(
  <DashboardSectionLayout singleLineContent={English.E477}>
    <div
      className={`grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-2 md:gap-4 `}
    >
      {Array.from({ length: 31 })?.map((__, index) => (


        <DailyBonusCard
          key={index + 1}
          content={`index${index + 1}`}
          infoContent={`index${index + 1}`}
          title={`index${index + 1}`}
        />
      )

      )}
    </div>

  </DashboardSectionLayout>
)


export default DailyLoginBonus