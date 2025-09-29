import {ChallengeActionButton, DescriptionComponent} from '@/components'
import {English} from '@/helpers'

const EmptyChallengeLayout = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <DescriptionComponent multilineContent={[English.E26]} />

      <div className="w-full h-full flex items-center justify-center overflow-y-auto">
        <div className="flex flex-col gap-6">
          <DescriptionComponent
            multilineContent={[English.E28, English.E29]}
            className="text-center"
          />
          <ChallengeActionButton />
        </div>
      </div>
    </div>
  )
}

export default EmptyChallengeLayout
