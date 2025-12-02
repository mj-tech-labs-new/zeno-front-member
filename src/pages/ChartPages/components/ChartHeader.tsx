import {memo, useMemo} from 'react'

import {BasicSkeleton, DropDown, HeadingComponent} from '@/components'
import {English} from '@/helpers'

import {useChartProvider} from '../context/ChartProvider'
import ChartHeaderStats from './ChartHeaderStats'

const ChartHeader = () => {
  const {
    chartInfo,
    isLoadingCandles,
    selectedToken,
    setSelectedToken,
    otherLoading,
    tokenList,
    isLastCandle,
    totalCandlesCount,
    livePrice,
  } = useChartProvider()

  const TokenArray = useMemo(
    () =>
      Object.entries(tokenList ?? [])?.map(([_, value]) => ({
        title: value,
      })),
    [tokenList]
  )

  return (
    <div className="py-5 px-6 bg-chart-layout-bg rounded">
      <div className="space-y-5">
        <div className="max-w-56">
          {otherLoading.isDropdownLoading && !isLoadingCandles ? (
            <BasicSkeleton className="rounded-lg !h-11" />
          ) : (
            <DropDown
              className="max-h-52"
              dropDownData={TokenArray}
              selectedValue={{title: selectedToken}}
              onSelectValue={(item) => {
                setSelectedToken((data) => {
                  if (data !== item.title) {
                    isLastCandle.current = false
                    totalCandlesCount.current = 0
                    return item.title
                  }
                  return data
                })
              }}
            />
          )}
        </div>
        <div className="flex flex-col lg:flex-row w-full  gap-8 lg:gap-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-[40%]">
            {chartInfo && (
              <div className="flex flex-col gap-1">
                <HeadingComponent
                  className="font-semibold !leading-8"
                  singleLineContent={`${chartInfo?.fullSymbolName?.split('USDT')?.[0]} / ${English.E60}`}
                  variant="x-medium"
                />
                {tokenList && (
                  <span className="text-neutral-primary-color text-xs !leading-5 font-semibold">
                    {tokenList[chartInfo.symbol]}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-chart-red-color text-2xl !leading-8 font-semibold">
                {livePrice} {English.E60}
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
