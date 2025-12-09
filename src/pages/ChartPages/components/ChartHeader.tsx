import {memo, useMemo} from 'react'

import {BasicSkeleton, DropDown, ImageComponent} from '@/components'
import {English, Images} from '@/helpers'

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
  const isMatch = Object.values(tokenList ?? {}).includes(selectedToken)
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
        <div className="flex flex-col lg:flex-row w-full  gap-8 lg:gap-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-[40%]">
            {chartInfo && (
              <div className="flex flex-col justify-center ">
                <div className="max-w-60 flex items-center gap-1 ">
                  <span>
                    <ImageComponent
                      className="w-6 h-6 "
                      imageUrl={Images.bitcoinIcon}
                    />
                  </span>
                  {otherLoading.isDropdownLoading && !isLoadingCandles ? (
                    <BasicSkeleton className="rounded-lg !h-11" />
                  ) : (
                    <DropDown
                      showArrows
                      className="max-h-52 border-none !p-0  "
                      dropDownData={TokenArray}
                      elementId={['chartRendering']}
                      headingClassName="hover:!bg-transparent !text-2xl !font-semibold !font-bureau !leading-8 !text-primary-color"
                      layoutClassName="!font-semibold !leading-8 "
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
                      selectedValue={{
                        title: isMatch
                          ? `${chartInfo?.fullSymbolName?.split('USDT')?.[0]} / ${English.E60}`
                          : selectedToken,
                      }}
                    />
                  )}
                </div>
                <div>
                  {tokenList && (
                    <span className="text-neutral-primary-color text-xs !leading-5 font-semibold">
                      {tokenList[chartInfo.symbol]}
                    </span>
                  )}
                </div>
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
