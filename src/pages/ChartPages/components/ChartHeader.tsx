import {memo, useEffect} from 'react'

import {English, Utility} from '@/helpers'
import {CommonFunction} from '@/services'

import {useChartProvider} from '../context/ChartProvider'
import ChartHeaderStats from './ChartHeaderStats'
import TokenDropdown from './TokenDropdown'

const ChartHeader = () => {
  const {chartInfo, livePrice, chartSocketData} = useChartProvider()

  useEffect(() => {
    if (!chartInfo?.symbol) return
    CommonFunction.addSliceData('addAmountType', {amount: chartInfo.symbol})
  }, [chartInfo?.symbol])
  return (
    <div className="py-[3px] bg-chart-layout-bg rounded">
      <div className="space-y-5">
        <div className="flex flex-col  lg:flex-row w-full lg:justify-between  gap-5 lg:gap-10 lg:overflow-x-auto floating__container">
          <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-4 lg:gap-8 whitespace-nowrap">
            <TokenDropdown />
            <div className="flex flex-col gap-0.5">
              <span
                className={`${Utility.colorGeneratorUtility(Number(chartSocketData?.change ?? 0))} text-lg !leading-5 font-semibold w-44`}
              >
                {Utility.numberConversion(
                  livePrice,
                  Utility.getPricePrecision(livePrice)
                )}{' '}
                {English.E60}
              </span>
              {/* <span className="text-primary-color font-medium leading-tight">
                $ {livePrice}
              </span> */}
            </div>
          </div>

          <ChartHeaderStats />
        </div>
      </div>
    </div>
  )
}

export default memo(ChartHeader)
