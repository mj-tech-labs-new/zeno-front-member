import {HeadingComponent} from '@/components'
import {English} from '@/helpers'

import EmptyChallengeLayout from './components/EmptyChallengeLayout'

const Dashboard = () => {
  return (
    <div className="h-full w-full">
      <HeadingComponent singleLineContent={English.E21} variant="medium" />
      <div className="mt-4 h-[calc(100%-40px)] overflow-y-auto">
        <EmptyChallengeLayout />
      </div>
    </div>
  )
}

export default Dashboard
