import {English} from '@/helpers'
import ChallengeCardLayout from '@/layouts/ChallengeDashboardCardLayout'
import {ChallengeStatusCardProps} from '@/types/ChallengeTypes'

import Accordian from '../Accordian/Accordian'
import HeadingComponent from '../HeadingComponent/HeadingComponent'
import Info from '../Tooltips/Info'

const ChallengeStatusCard = (props: ChallengeStatusCardProps) => {
  const {content} = props
  return (
    <ChallengeCardLayout className="max-h-[350px] h-full bg-linear-to-t from-linear-gr-bg1-color to-linear-gr-bg2-color">
      <div className="flex justify-between items-center mb-6">
        <HeadingComponent singleLineContent={English.E57} />
        <Info />
      </div>
      <div className="flex flex-col gap-6 h-[calc(100%-48px)] overflow-y-auto no-scrollbar">
        {content?.map((contentItem) => {
          const {content, mainHeading, subHeading, isActive} = contentItem
          return (
            <div
              className={`flex ${isActive ? 'gap-1 sm:gap-2 lg:gap-4' : ''}`}
              key={mainHeading}
            >
              {isActive && (
                <div className="w-1 rounded-full h-full bg-linear-to-b from-secondary-light-color to-primary-color" />
              )}
              <div
                className={`flex flex-col ${isActive ? 'gap-3' : 'gap-2'} h-full`}
              >
                <div className="flex items-center gap-4">
                  <p
                    className={`${isActive ? 'text-tertiary-color' : 'text-secondary-light-color'} text-base/6 font-normal`}
                  >
                    {mainHeading}
                  </p>
                  {isActive && (
                    <span className="text-primary-color uppercase px-1 rounded-sm bg-dark-success-color">
                      {English.E58}
                    </span>
                  )}
                </div>
                <Accordian
                  singleLineContent={subHeading}
                  multilineContent={content}
                  isDirectType
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
