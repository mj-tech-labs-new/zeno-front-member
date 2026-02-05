import {useRef, useState} from 'react'

import {HeadingComponent, Loader, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'
import {AppLoaderRef} from '@/types/ComponentTypes'

import DailyLoginBonus from './sections/DailyLoginBonus'
import Dashboard from './sections/Dashboard'
import HowToEarn from './sections/HowToEarn'
import LeaderBoard from './sections/LeaderBoard'
import RewardHistory from './sections/RewardHistory'
// import RewardHistory from './sections/RewardHistory'

const Rewards = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const loaderRef = useRef<AppLoaderRef>(null)

  return (
    <div className="flex flex-col h-full gap-8 pt-8 space-y-10">
      <Loader ref={loaderRef} />
      <HeadingComponent singleLineContent={English.E459} variant="medium" />
      {/* <div className="flex flex-col gap-5 justify-center items-center h-full">
      <DescriptionComponent
        className="font-bold! text-3xl text-primary-color!"
        singleLineContent={English.E55}
      />
      <DescriptionComponent
        className="text-base!"
        singleLineContent={English.E273}
      />
    </div> */}
      {/* <CertificateTab
        activeIndex={activeIndex}
        setLoader={(value) => {
          loaderRef.current?.showLoader(value)
        }}
      /> */}
      <TabComponent
        activeIndex={activeIndex}
        headingData={Constants.CertificateTabHeading}
        isCorruptedTabIndex={1}
        setActiveIndex={(value) => {
          setActiveIndex(value)
        }}
      >
        <div>
          {activeIndex === 0 ? (
            <Dashboard />
          ) : activeIndex === 1 ? (
            <DailyLoginBonus />
          ) : activeIndex === 2 ? (
            <RewardHistory />
          ) : activeIndex === 3 ? (
            <HowToEarn />
          ) : activeIndex === 4 ? (
            <LeaderBoard />
          ) : null}
        </div>
      </TabComponent>
    </div>
  )
}

export default Rewards
