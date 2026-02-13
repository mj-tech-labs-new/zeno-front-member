import {useEffect, useRef, useState} from 'react'

// import { ImageComponent } from '@/components'
import {Constants, English} from '@/helpers'
import {CommonFunction} from '@/services'
import {ChartTimePeriodType} from '@/types/UnionTypes'

import ChartShapes from './components/ChartShapes'
import Ma5Indicators from './components/Ma5Indicators'
import Ma10Indicators from './components/Ma10Indicators'
import Ma30Indicators from './components/Ma30Indicators'
import Tooltip from './components/Tooltip'
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
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fullScreenContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleFullscreenChange = () => {
      const {fullscreenElement} = document
      setIsFullscreen(!!fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  return (
    <div className="h-full bg-chart-layout w-full  lg:w-3/4 flex-1">
      <div className="flex flex-col lg:flex-row  w-full">
        <ChartShapes />
        <div ref={fullScreenContainer} className="w-full">
          <div className="p-2 flex flex-col-reverse sm:flex-row gap-4 sm:items-center sm:justify-between">
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
                      className={`py-1.5 px-3 transition-all duration-200 ease-linear  font-normal text-xs !leading-4 rounded-full ${selectedIndex === key ? 'text-primary-color bg-neutral-active-color' : 'text-neutral-primary-color cursor-pointer'}`}
                      onClick={() => {
                        isLastCandle.current = false
                        totalCandlesCount.current = 0
                        currnetLimit.current = 200
                        if (selectedIndex === key) return
                        setSelectedIndex(key as ChartTimePeriodType)
                        const payload = {
                          frame: key,
                        }
                        CommonFunction.addSliceData('addTimeFrame', payload)
                      }}
                    >
                      {content}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-neutral-secondary-color py-1.5 px-3 rounded-full text-sm !leading-4 text-chart-text-primary-color font-bold! w-fit shrink-0">
                {English.E434}
              </span>
              {/* <ImageComponent
                className="size-4! cursor-pointer" imageUrl={Images.fullScreen}
                onPressItem={() => {
                  if (!fullScreenContainer.current) return
                  fullScreenContainer.current.requestFullscreen()
                }} /> */}
            </div>
          </div>
          <div
            className={`relative ${isFullscreen ? 'h-full' : 'flex h-[calc(100vh-195px)] lg:h-[calc(100vh-132px)] overflow-hidden'}  `}
          >
            <ChartGraphs />
            <Ma5Indicators />
            <Ma10Indicators />
            <Ma30Indicators />
            <Tooltip />
            {!isLoadingCandles && <TrendLines />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartRenderer
