
import { Constants, English } from '@/helpers'

import DashboardCard from './DashboardCard'
import DashboardSectionLayout from './DashboardSectionLayout'

const CardSection = () => (
    <DashboardSectionLayout singleLineContent={English.E448}>
        <div
            className={`grid  'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-4 `}
        >
            {Constants.certificateCard?.map((item, index) => (


                <DashboardCard
                    key={`card_${index+1}`}
                    content={item.title}
                    infoContent={item.heading}
                    title={item.heading}
                />
            )

            )}
        </div>

    </DashboardSectionLayout>
)

export default CardSection