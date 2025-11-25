import {memo, useEffect, useMemo} from 'react'

import {BasicSkeleton, DropDown, ImageComponent} from '@/components'
import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {English, Images, SocketEmitter, Utility} from '@/helpers'
import {CandleObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const ChartHeader = () => {
  const {
    chartInfo,
    isLoadingCandles,
    setChartInfo,
    selectedIndex,
    selectedToken,
    setSelectedToken,
    otherLoading,
    tokenList,
    isLastCandle,
    totalCandlesCount,
    livePrice,
  } = useChartProvider()
  const {socketRef} = useSocketProvider()
  const isMatch = Object.values(tokenList ?? {}).includes(selectedToken)
  useEffect(() => {
    if (!socketRef.current) return
    socketRef.current.on(
      SocketEmitter.Emitter[
        selectedIndex as keyof typeof SocketEmitter.Emitter
      ],
      (data) => {
        const findTokenName = Object.entries(tokenList ?? {}).find(
          ([_, value]) => value === selectedToken
        )
        if (!findTokenName) return
        const chartSocketData: CandleObjectType =
          data?.data?.candles?.[findTokenName?.[0]]
        if (!chartSocketData) return
        const {change, changeAmount, volume, high, low, open} = chartSocketData
        setChartInfo((prev) =>
          prev ? {...prev, change, changeAmount, volume, high, low, open} : null
        )
      }
    )
  }, [selectedIndex, selectedToken, setChartInfo, socketRef, tokenList])

  const change = useMemo(
    () => ({
      priceDiff: chartInfo?.changeAmount ?? '---',
      percentageDiff: chartInfo?.change
        ? `${Number(chartInfo?.change).toFixed(2)}%`
        : '---',
    }),
    [chartInfo?.change, chartInfo?.changeAmount]
  )

  const highestAmount = useMemo(
    () => ({
      priceDiff: chartInfo?.high
        ? Utility.numberConversion(chartInfo.high)
        : '---',
      percentageDiff:
        chartInfo?.high && chartInfo?.open
          ? `(${Utility.numberConversion(((chartInfo.high - chartInfo.open) / chartInfo.open) * 100)}%)`
          : '',
    }),
    [chartInfo?.high, chartInfo?.open]
  )
  const lowestAmount = useMemo(
    () => ({
      priceDiff: chartInfo?.low ? `-${chartInfo.low}` : '---',
      percentageDiff:
        chartInfo?.low && chartInfo?.open
          ? `(${Utility.numberConversion(((chartInfo.low - chartInfo.open) / chartInfo.open) * 100)} %)`
          : '---',
    }),
    [chartInfo?.low, chartInfo?.open]
  )
  const volumeAmount = useMemo(
    () => ({
      priceDiff: chartInfo?.volume
        ? `${chartInfo?.volume} ${chartInfo?.symbol}`
        : '---',
    }),
    [chartInfo?.symbol, chartInfo?.volume]
  )

  const ConstantMapData = useMemo(
    () => [
      {
        img: Images.clock,
        content: English.E119,
        textContent: change,
      },
      {
        img: Images.sharpArrow,
        content: English.E120,
        textContent: highestAmount,
      },
      {
        img: Images.sharpArrow,
        content: English.E121,
        textContent: lowestAmount,
      },
      {
        img: Images.barChart,
        content: English.E122,
        textContent: volumeAmount,
      },
    ],
    [change, highestAmount, lowestAmount, volumeAmount]
  )

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
                <div className="max-w-40 ">
                  {otherLoading.isDropdownLoading && !isLoadingCandles ? (
                    <BasicSkeleton className="rounded-lg !h-11" />
                  ) : (
                    <DropDown
                      className="max-h-52 border-none !p-0  "
                      dropDownData={TokenArray}
                      headingClassName="hover:!bg-transparent !text-2xl !font-semibold !font-bureau !leading-8 !text-primary-color"
                      layoutClassName="!font-semibold !leading-8 "
                      showArrows={false}
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

          <div className="grid grid-cols-1 lg:grid-cols-4 w-full lg:w-[60%] gap-6">
            {ConstantMapData?.map((item, index) => {
              const {content, img, textContent} = item
              return (
                <div
                  key={content}
                  className={`lg:pr-[21px] xl:pr-[42px]  flex flex-col gap-1 ${index !== 3 ? 'border-r border-r-solid border-neutral-secondary-color' : ''}`}
                >
                  <div className="flex items-center gap-1 text-neutral-primary-color text-xs !leading-5 font-normal ">
                    <ImageComponent
                      className={`grey__filter ${index === 0 || index === 3 ? 'w-3' : 'w-2'}${index === 2 ? 'rotate-180' : ''}`}
                      imageUrl={img}
                    />
                    <span>{content}</span>
                  </div>
                  <p
                    className={`text-sm !leading-6 font-medium ${index !== 3 ? (textContent?.priceDiff?.toString()?.startsWith('-') ? 'text-chart-red-color' : 'text-chart-green-color') : 'text-chart-text-primary-color'}`}
                  >
                    <span>{textContent?.priceDiff} </span>
                    {index !== 3 && (
                      <span>{(textContent as any)?.percentageDiff}</span>
                    )}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ChartHeader)
