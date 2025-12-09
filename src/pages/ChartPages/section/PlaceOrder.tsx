import {useEffect, useState} from 'react'

import {DropDown, HeadingComponent, TabComponent} from '@/components'
import {Constants, English} from '@/helpers'

import {useChartProvider} from '../context/ChartProvider'
import BuySell from './BuySell'
import Limit from './Limit'

const PlaceOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mode, setMode] = useState('isolated')
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
    setSelectedLeverage({title: levArray[0]?.title?.replace('X', '')})
  }, [getChallengeByIdArray, setLeverageValueArray, setSelectedLeverage])

  return (
    <div
      className="my-4 mx-4 overflow-y-auto no-scrollbar "
      id="place_order_container"
    >
      <div className="flex flex-col gap-4">
        <HeadingComponent
          className="!text-[16px]/6 !font-poppins !tracking-normal !text-neutral-primary-color"
          singleLineContent={English.E129}
          type="h2"
        />

        <div className="flex items-center gap-4">
          <DropDown
            className="!max-h-32 mt-2 !overflow-auto !w-full"
            dropDownData={Constants.orderMarginMode}
            elementId={['place_order_container', 'chartRendering']}
            layoutClassName="!h-fit"
            headingClassName="!bg-transparent
        "
            onSelectValue={(data) =>
              setMode(data?.title ?? Constants.orderMarginMode[0])
            }
            selectedValue={{
              title: mode?.toString() ?? Constants?.orderMarginMode[0].title,
            }}
          />
          <DropDown
            className="!max-h-52 mt-2 !overflow-auto !w-full"
            dropDownData={leverageValueArray}
            elementId={['place_order_container', 'chartRendering']}
            onSelectValue={(data) => {
              setSelectedLeverage(data)
            }}
            selectedValue={{
              title: selectedLeverage
                ? `${selectedLeverage.title.replace('X', '') ?? '1'}X`
                : '1X',
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
            <Limit activeIndex={activeIndex} margin_mode={mode?.toString()} />
          ) : (
            <BuySell activeIndex={activeIndex} margin_mode={mode?.toString()} />
          )}
        </TabComponent>
      </div>
    </div>
  )
}

export default PlaceOrder
