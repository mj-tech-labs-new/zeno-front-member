import {English} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {useChallengeProvider} from '@/pages/ChallengeDashboard/context/ChallengeDashboardProvider'

import Accordian from '../Accordian/Accordian'
import HeadingComponent from '../HeadingComponent/HeadingComponent'
import Info from '../Tooltips/Info'

const ChallengeStatusCard = () => {
  const {getChallengeByIdArray} = useChallengeProvider()

  return (
    <ChallengeCardLayout className="max-h-[350px] h-full bg-linear-to-t from-linear-gr-bg1-color to-linear-gr-bg2-color">
      <div className="flex justify-between items-center mb-6">
        <HeadingComponent
          className="!tracking-[0px]"
          singleLineContent={English.E57}
          type="h3"
        />
        <Info />
      </div>
      <div className="flex flex-col gap-6 h-[calc(100%-48px)] overflow-y-auto no-scrollbar">
        {getChallengeByIdArray?.[0]?.ChallengeStage?.map((contentItem) => {
          const {stage, step} = contentItem

          return (
            <div
              key={stage}
              className={`flex ${getChallengeByIdArray?.[0]?.current_stage === stage ? 'gap-1 sm:gap-2 lg:gap-4' : ''}`}
            >
              {getChallengeByIdArray?.[0]?.current_stage === stage ? (
                <div className="w-1 rounded-full h-full bg-linear-to-b from-secondary-light-color to-primary-color border" />
              ) : null}
              <div
                className={`flex flex-col ${getChallengeByIdArray?.[0]?.current_stage === stage ? 'gap-3' : 'gap-2'} h-full`}
              >
                <div className="flex items-center gap-4">
                  <p
                    className={`${getChallengeByIdArray?.[0]?.current_stage === stage ? 'text-tertiary-color' : 'text-secondary-light-color'} text-base/6 font-normal`}
                  >
                    {English.E255} {stage}
                  </p>
                  {getChallengeByIdArray?.[0]?.current_stage === stage ? (
                    <span className="text-primary-color uppercase px-1 rounded-sm bg-dark-success-color">
                      {English.E58}
                    </span>
                  ) : null}
                </div>
                <Accordian
                  isDirectType
                  className={`!gap-0.5 [&>div]:!mt-0 ${getChallengeByIdArray?.[0]?.current_stage !== stage && '[&>div>p]:!opacity-50 [&>p]:!opacity-50'}`}
                  multilineContent={
                    step === 2
                      ? stage === 1
                        ? [English.E252]
                        : stage === 2
                          ? [English.E253]
                          : getChallengeByIdArray?.[0]?.current_stage
                            ? [English.E254]
                            : [English.E256]
                      : stage === 1
                        ? [English.E252]
                        : stage === 2
                          ? [English.E254]
                          : ['']
                  }
                  singleLineContent={
                    step === 2 && stage === 2 ? English.E251 : ''
                  }
                />
              </div>
            </div>
          )
        })}
      </div>
    </ChallengeCardLayout>
  )
}

export default ChallengeStatusCard
