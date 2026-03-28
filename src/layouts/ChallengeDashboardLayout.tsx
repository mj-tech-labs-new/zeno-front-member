import dayjs from 'dayjs'

import {English} from '@/helpers'
import ChallengeDashboardHeader from '@/pages/ChallengeDashboard/components/ChallengeDashboardHeader'
import {useChallengeProvider} from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'
import {GeneralProps} from '@/types/CommonTypes'

const ChallengeDashboardLayout = (
  props: Required<Pick<GeneralProps, 'children'>>
) => {
  const {children} = props
  const {getChallengeByIdArray} = useChallengeProvider()

  return (
    <div className="min-h-full w-full">
      <ChallengeDashboardHeader
        createdDate={dayjs(getChallengeByIdArray?.createdAt)
          .format('D MMMM YYYY')
          .toString()}
        createdTime={dayjs(getChallengeByIdArray?.createdAt)
          .format('h:mm A')
          .toString()}
        step={
          getChallengeByIdArray?.ChallengePlan[0].step === 1
            ? English.E32
            : English.E34
        }
        updatedDate={dayjs(getChallengeByIdArray?.updatedAt)
          .format('D MMMM YYYY')
          .toString()}
        updatedTime={dayjs(getChallengeByIdArray?.updatedAt)
          .format('h:mm A')
          .toString()}
      />
      <div className="mt-12 min-[1045px]:mt-8 pb-6">{children}</div>
    </div>
  )
}

export default ChallengeDashboardLayout
