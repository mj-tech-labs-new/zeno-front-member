import {useEffect, useState} from 'react'

import {DropDown, HeadingComponent, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'

import {useChartProvider} from '../context/ChartProvider'
import BuySell from './BuySell'
import Limit from './Limit'

const PlaceOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const {
    getChallengeByIdArray,
    leverageValueArray,
    setLeverageValueArray,
    selectedLeverage,
    setSelectedLeverage,
  } = useChartProvider()

  useEffect(() => {
    const currentStage = getChallengeByIdArray?.[0]?.current_stage ?? 0
    if (!getChallengeByIdArray?.[0]) return

    const stages = getChallengeByIdArray[0].ChallengeStage[currentStage]

    if (!stages) return

    const levArray = Array.from({length: stages.leverage}).map((_, index) => ({
      title: (index + 1).toString(),
    }))
    setLeverageValueArray(levArray)
    setSelectedLeverage(levArray[0])
  }, [getChallengeByIdArray, setLeverageValueArray, setSelectedLeverage])

  return (
    <div className="my-4 mx-4 overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-4">
        <HeadingComponent
          className="!text-[16px]/6 !font-poppins !tracking-normal !text-neutral-primary-color"
          singleLineContent={English.E129}
          type="h2"
        />

        <div className="flex items-center gap-4">
          <DropDown
            className="!max-h-32 mt-2 !overflow-auto !w-full"
            dropDownData={[{title: 'Isolated'}]}
            layoutClassName="!h-fit"
            onSelectValue={() => 'Isolated'}
            selectedValue={{title: 'Isolated'}}
          />
          <DropDown
            className="!max-h-52 mt-2 !overflow-auto !w-full"
            dropDownData={leverageValueArray}
            selectedValue={selectedLeverage ?? {title: '1'}}
            onSelectValue={(data) => {
              setSelectedLeverage(data)
            }}
          />
        </div>

        <TabComponent
          activeIndex={activeIndex}
          className="!font-bold !text-[14px] !leading-4 !text-chart-text-primary-color !gap-4 !font-dmsansm [&>div]:!gap-2.5"
          headingData={Constants.PlaceOrderTab}
          setActiveIndex={setActiveIndex}
          type="buttonType"
        >
          {activeIndex === 0 ? (
            <Limit activeIndex={activeIndex} />
          ) : (
            <BuySell activeIndex={activeIndex} />
          )}
        </TabComponent>
      </div>
    </div>
  )
}

export default PlaceOrder
