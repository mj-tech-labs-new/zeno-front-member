import {HeadingComponent, ListingComponent} from '@/components'
import {English} from '@/helpers'
import CreateChallenge from '@/pages/CreateChallenge/CreateChallenge'

const StartYourJourney = () => (
  <div className="bg-primary-black px-4 lg:px-13 pb-6">
    <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:gap-5">
      <div className="hidden lg:w-[275px] lg:h-[206px] lg:flex lg:flex-col lg:justify-end lg:gap-1 rounded -mt-4 sticky top-0">
        <div className="flex items-center gap-3">
          <ListingComponent type="normal_list_type" />
          <HeadingComponent
            className="text-sm !tracking-[-0.14px] text-primary-color"
            singleLineContent={English.E19}
            type="h2"
          />
        </div>
      </div>

      <div className="lg:w-[calc(100%-275px)] lg lg">
        <CreateChallenge />
      </div>
    </div>
  </div>
)

export default StartYourJourney
