import {useState} from 'react'

import {
  ChallengeOptionCards,
  DescriptionComponent,
  HeadingComponent,
} from '@/components'
import {Constants, English} from '@/helpers'

import CreateChallengeCardLayout from '../layout/CreateChallengeCardLayout'

const CreateChallengeContainer = () => {
  const [selectedOption, setSelectedOption] = useState(0)
  return (
    <CreateChallengeCardLayout>
      <div className="space-y-10">
        <div className="flex flex-col gap-y-2">
          <HeadingComponent singleLineContent={English.E27} variant="small" />
          <DescriptionComponent multilineContent={[English.E31]} />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          {Constants.ChallengeOptions?.map((item, index) => {
            const {content, title} = item
            return (
              <ChallengeOptionCards
                multilineContent={[content]}
                singleLineContent={title}
                key={title}
                onPressItem={() => {
                  setSelectedOption(index)
                }}
                className={
                  index === selectedOption
                    ? 'bg-info-bg-color border-tertiary-color'
                    : 'border-info-bg-color cursor-pointer'
                }
              />
            )
          })}
        </div>
      </div>
    </CreateChallengeCardLayout>
  )
}

export default CreateChallengeContainer
