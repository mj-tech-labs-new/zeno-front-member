import {memo, useEffect} from 'react'

import {English} from '@/helpers'
import {CommonFunction} from '@/services'

import {useChartProvider} from '../context/ChartProvider'
import ChartHeaderStats from './ChartHeaderStats'
import TokenDropdown from './TokenDropdown'

const ChartHeader = () => {
  const {chartInfo, livePrice} = useChartProvider()

  useEffect(() => {
    if (!chartInfo?.symbol) return
    CommonFunction.addSliceData('addAmountType', {amount: chartInfo.symbol})
  }, [chartInfo?.symbol])
  return (
    <div className="py-5 px-6 bg-chart-layout-bg rounded">
      <div className="space-y-5">
        <div className="flex flex-row w-full  gap-10 overflow-x-auto floating__container">
          <div className="flex flex-row gap-4 lg:gap-8 whitespace-nowrap">
            <TokenDropdown />
            <div className="flex flex-col gap-0.5">
              <span className="text-chart-red-color text-2xl !leading-8 font-semibold w-44">
                {livePrice} {English.E60}
              </span>
              <span className="text-primary-color font-medium leading-tight">
                $ {livePrice}
              </span>
            </div>
          </div>

          <ChartHeaderStats />
        </div>
      </div>
    </div>
  )
}

export default memo(ChartHeader)
