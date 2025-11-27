import {useNavigate} from 'react-router-dom'

import {
  CommonButton,
  Divider,
  GoBackButton,
  HeadingComponent,
  ImageComponent,
} from '@/components'
import {English, Images} from '@/helpers'
import {ChallengeDashboardHeaderProps} from '@/types/ChallengeTypes'

import {useChallengeProvider} from '../context/ChallengeDashboardProvider'

const ChallengeDashboardHeader = (props: ChallengeDashboardHeaderProps) => {
  const {createdDate, createdTime, step, updatedDate, updatedTime} = props
  const navigate = useNavigate()
  const {getChallengeByIdArray} = useChallengeProvider()

  return (
    <div className="pt-11 sticky top-0 bg-primary-bg-color z-10">
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
            {step} • Created on {createdDate} at {createdTime}
          </span>
        </div>

        <div className="flex flex-col min-[1045px]:flex-row gap-2">
          <div className="flex w-full md:w-fit gap-2 py-2 px-3 rounded-[10px] bg-button-tertiary-color">
            <ImageComponent
              className="w-4 aspect-square"
              imageUrl={Images.clock}
            />
            <p className="text-sm/6 text-quadraple-color font-medium">
              Last Updated {updatedDate} at {updatedTime}
            </p>
          </div>
          <CommonButton
            className={`${getChallengeByIdArray?.[0]?.status === English.E115 && '!pointer-events-none !opacity-50'} light-danger-btn-type md:!w-fit [&>div]:!h-4 [&>div]:!w-4 !gap-2`}
            imageUrl={Images.stats}
            singleLineContent={English.E56}
            onClick={() => {
              navigate('/chart', {
                state: getChallengeByIdArray?.[0]?.challenge_id,
              })
            }}
          />
        </div>
      </div>
      <Divider className="mt-8 !bg-info-bg-color" />
    </div>
  )
}

export default ChallengeDashboardHeader
