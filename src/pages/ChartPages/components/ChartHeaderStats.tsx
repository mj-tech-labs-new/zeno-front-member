import { toNumber } from 'lodash'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { ImageComponent } from '@/components'
import { useSocketProvider } from '@/GlobalProvider/SocketProvider'
import { English, Images, SocketEmitter, Utility } from '@/helpers'
import { CandleObjectType } from '@/types/ChartTypes'
import { StorageProps } from '@/types/CommonTypes'

import { useChartProvider } from '../context/ChartProvider'

const ChartHeaderStats = () => {
  const {
    isLoadingCandles,
    tokenList,
    setChartSocketData,
    chartSocketData,
    chartInfo,
    setTotalTokenData,
  } = useChartProvider()
  const { socketRef } = useSocketProvider()
  const chartDetails = useSelector((state: StorageProps) => state.chartData)
  const observedChange = useMemo(
    () => ({
      priceDiff: chartSocketData?.changeAmount ?? '---',
      percentageDiff: chartSocketData?.change
        ? `${Number(chartSocketData?.change ?? 0).toFixed(2)}%`
        : '---',
    }),
    [chartSocketData?.change, chartSocketData?.changeAmount]
  )

  const highestAmount = useMemo(
    () => ({
      priceDiff: chartSocketData?.high
        ? Utility.numberConversion(chartSocketData.high)
        : '---',
      percentageDiff:
        chartSocketData?.high && chartSocketData?.open
          ? `(${Utility.numberConversion(((chartSocketData.high - chartSocketData.open) / chartSocketData.open) * 100)}%)`
          : '',
    }),
    [chartSocketData?.high, chartSocketData?.open]
  )
  const lowestAmount = useMemo(
    () => ({
      priceDiff: chartSocketData?.low ? `-${chartSocketData.low}` : '---',
      percentageDiff:
        chartSocketData?.low && chartSocketData?.open
          ? `(${Utility.numberConversion(((chartSocketData.low - chartSocketData.open) / chartSocketData.open) * 100)} %)`
          : '---',
    }),
    [chartSocketData?.low, chartSocketData?.open]
  )
  const volumeAmount = useMemo(
    () => ({
      priceDiff: chartSocketData?.volume
        ? (chartSocketData?.volume ?? 1)
        : '---',
    }),
    [chartSocketData]
  )

  const ConstantMapData = useMemo(
    () => [
      {
        img: Images.clock,
        content: English.E119,
        textContent: observedChange,
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
        content: `${English.E122} (${chartInfo?.symbol})`,
        textContent: volumeAmount ?? 0,
      },
    ],
    [
      chartInfo?.symbol,
      highestAmount,
      lowestAmount,
      observedChange,
      volumeAmount,
    ]
  )

  useEffect(() => {
    if (!socketRef.current || isLoadingCandles) return
    socketRef.current.on(SocketEmitter.Emitter['1d'], (data) => {
      const findTokenName = tokenList?.find(
        (item) => item?.token_symbol === chartDetails?.selectedToken?.name
      )
      if (!findTokenName) return
      const chartData: CandleObjectType =
        data?.data?.candles?.[findTokenName?.token_symbol]
      if (!chartData) return
      const { change, changeAmount, open, high, low, volume, close } = chartData
      setChartSocketData(() => ({
        change,
        changeAmount,
        high,
        low,
        open,
        close,
        volume,
      }))
      setTotalTokenData(data?.data?.candles)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chartDetails?.selectedToken?.name,
    isLoadingCandles,
    socketRef,
    tokenList,
  ])
  return (
    <div className="flex lg:justify-end overflow-x-auto lg:overflow-hidden floating__container  w-full   gap-6">
      {ConstantMapData?.map((item, index) => {
        const { content, img, textContent } = item
        return (
          <div
            key={content}
            className="lg:pr-[21px] xl:pr-[42px]   border-r border-r-solid border-neutral-secondary-color last:border-none"
          >
            <div className="flex flex-col gap-1 pr-2">
              <div className="flex items-center gap-1 text-neutral-primary-color text-xs !leading-5 font-normal ">
                <ImageComponent
                  className={`grey__filter shrink-0 ${index === 2 ? '[&>img]:rotate-180' : ''}`}
                  imageUrl={img}
                />
                <span className="whitespace-nowrap">{content}</span>
              </div>
              <p
                className={`text-xs !leading-5 font-medium ${index === 0 ? (textContent?.priceDiff?.toString()?.startsWith('-') ? 'text-chart-red-color' : 'text-chart-green-color') : 'text-chart-text-primary-color'}`}
              >
                <span className="whitespace-nowrap">
                  {content.includes(English.E122) ||
                    content.includes(English.E373)
                    ? `${textContent?.priceDiff !== '---' ? (Utility.largeNumberNotationConversion(toNumber(textContent?.priceDiff ?? 1)) ?? '0.00') : '---'}${textContent?.priceDiff ? '' : ''}  ${chartInfo?.symbol ?? ''}`
                    : (textContent?.priceDiff ?? '0.00')}{' '}
                </span>
                {index !== 3 && (
                  <span className="whitespace-nowrap">
                    {(textContent as any)?.percentageDiff}
                  </span>
                )}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ChartHeaderStats
