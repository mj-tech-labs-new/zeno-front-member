import {ChallengeActionButton, DescriptionComponent} from '@/components'
import {English} from '@/helpers'

const EmptyChallengeLayout = () => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-center">
      <div className="gap-6">
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
