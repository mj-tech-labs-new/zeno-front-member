import ChallengeDashboardHeader from '@/pages/ChallengeDashboard/components/ChallengeDashboardHeader'
import {GeneralProps} from '@/types/CommonTypes'

const ChallengeDashboardLayout = (
  props: Required<Pick<GeneralProps, 'children'>>
) => {
  const {children} = props
  return (
    <div className="h-full w-full">
      <ChallengeDashboardHeader
        step={0}
        currentTime="10 Sept 2025  at  2:16 pm"
        updatedAt="10 Sept 2025 at 4:15 pm"
      />
      <div className="mt-12  min-[1045px]:mt-8 pb-6">{children}</div>
    </div>
  )
}

export default ChallengeDashboardLayout
