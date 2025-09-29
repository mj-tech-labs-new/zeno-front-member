import {
  CommonButton,
  Divider,
  GoBackButton,
  HeadingComponent,
  ImageComponent,
} from '@/components'
import {English, Images} from '@/helpers'
import {ChallengeDashboardHeaderProps} from '@/types/ChallengeTypes'

const ChallengeDashboardHeader = (props: ChallengeDashboardHeaderProps) => {
  const {currentTime, step, updatedAt} = props
  return (
    <div className="">
      <div className="flex flex-col min-[1045px]:flex-row min-[1045px]:items-end gap-8">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex gap-4">
            <GoBackButton />
            <HeadingComponent
              singleLineContent={English.E55}
              variant="medium"
            />
          </div>
          <span className="text-text-hint-color text-sm/6 font-normal">
            {step} • Created on {currentTime} at 2:16 pm
          </span>
        </div>

        <div className="flex flex-col min-[1045px]:flex-row gap-2">
          <div className="flex w-full md:w-fit gap-2 py-2 px-3 rounded-[10px] bg-button-tertiary-color">
            <ImageComponent
              imageUrl={Images.clock}
              className="w-4 aspect-square"
            />
            <p className="text-sm/6 text-quadraple-color font-medium">
              Last Updated {updatedAt}
            </p>
          </div>
          <CommonButton
            singleLineContent={English.E56}
            className="light-danger-btn-type md:!w-fit [&>div]:!h-4 [&>div]:!w-4 !gap-2"
            imageUrl={Images.stats}
          />
        </div>
      </div>
      <Divider className="mt-8 !bg-info-bg-color" />
    </div>
  )
}

export default ChallengeDashboardHeader
