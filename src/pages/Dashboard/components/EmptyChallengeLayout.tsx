import {ChallengeActionButton, DescriptionComponent} from '@/components'
import {English} from '@/helpers'

const EmptyChallengeLayout = () => (
  <div className="flex flex-col h-full justify-center">
    <div className="flex justify-center">
      <div className="space-y-6">
        <DescriptionComponent
          className="text-center"
          multilineContent={[English.E28, English.E29]}
        />
        <ChallengeActionButton />
      </div>
    </div>
  </div>
)

export default EmptyChallengeLayout
