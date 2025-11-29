import {Constants, English} from '@/helpers'
import {ChartTimePeriodType} from '@/types/UnionTypes'

import ChartShapes from './components/ChartShapes'
import TrendLines from './components/TrendLines'
import {useChartProvider} from './context/ChartProvider'
import ChartGraphs from './section/ChartGraphs'

const ChartRenderer = () => {
  const {
    selectedIndex,
    setSelectedIndex,
    isLastCandle,
    totalCandlesCount,
    isLoadingCandles,
    currnetLimit,
  } = useChartProvider()
  return (
    <div className="h-full bg-chart-layout w-full">
      <div className="flex flex-col lg:flex-row gap-1 w-full">
        <ChartShapes />
        <div className="flex-1">
          <div className="p-4 flex flex-col-reverse sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex items-center flex-row gap-4">
              <span className="text-neutral-primary-color font-bold text-sm !leading-4">
                {English.E128}
              </span>
              <div className="flex items-center flex-wrap">
                {Constants.ChartTypes.map((chartType) => {
                  const {content, key} = chartType
                  return (
                    <span
                      key={key}
                      className={`py-1.5 px-3 transition-all duration-200 ease-linear  font-bold text-sm !leading-4 rounded-full ${selectedIndex === key ? 'text-primary-color bg-neutral-active-color' : 'text-neutral-primary-color cursor-pointer'}`}
                      onClick={() => {
                        isLastCandle.current = false
                        totalCandlesCount.current = 0
                        currnetLimit.current = 50
                        if (selectedIndex === key) return
                        setSelectedIndex(key as ChartTimePeriodType)
                      }}
                    >
                      {content}
                    </span>
                  )
                })}
              </div>
            </div>
            <span className="bg-neutral-secondary-color py-1.5 px-3 rounded-full text-sm !leading-4 text-chart-text-primary-color w-fit shrink-0">
              {English.E20}
            </span>
          </div>
          <div className="relative h-[563px] w-full overflow-hidden">
            <ChartGraphs />
            {!isLoadingCandles && <TrendLines />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartRenderer
