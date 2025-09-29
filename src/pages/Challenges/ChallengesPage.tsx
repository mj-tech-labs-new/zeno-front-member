import {useState} from 'react'

import {
  ChallengeActionButton,
  HeadingComponent,
  TabComponent,
} from '@/components'
import {Constants, English} from '@/helpers'

import ChallengeDetailCard from './components/ChallengeDetailCard'

const ChallengesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-8 max-h-full overflow-y-auto no-scrollbar pb-8">
      <div className="flex gap-7 flex-col md:flex-row md:justify-between items-start w-full">
        <HeadingComponent singleLineContent={English.E21} variant="medium" />
        <ChallengeActionButton className="!m-0" />
      </div>
      <TabComponent
        isDividerType={false}
        className="!gap-6"
        headingData={Constants.ChallengesTabContent}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 h-fi gap-6">
          {Array.from({length: 4}).map((_, index) => {
            return (
              <ChallengeDetailCard
                key={`challenge-detail-card ${index.toString()}`}
              />
            )
          })}
        </div>
      </TabComponent>
    </div>
  )
}

export default ChallengesPage
