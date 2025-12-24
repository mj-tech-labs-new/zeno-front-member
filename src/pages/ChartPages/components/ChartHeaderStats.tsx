import {useEffect, useMemo} from 'react'

import {ImageComponent} from '@/components'
import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {English, Images, SocketEmitter, Utility} from '@/helpers'
import {CandleObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const ChartHeaderStats = () => {
  const {
    isLoadingCandles,
    selectedIndex,
    tokenList,
    selectedToken,
    setChartSocketData,
    chartSocketData,
    chartInfo,
    livePrice,
  } = useChartProvider()
  const {socketRef} = useSocketProvider()

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
        ? Utility.largeNumberNotationConversion(chartSocketData?.volume ?? 1)
        : '---',
    }),
    [chartSocketData]
  )

  const usdtAmount = useMemo(
    () => ({
      priceDiff:
        livePrice && volumeAmount?.priceDiff
          ? Utility.largeNumberNotationConversion(
              (livePrice ?? 0) * Number(chartSocketData?.volume ?? 1)
            )
          : '---',
    }),
    [chartSocketData?.volume, livePrice, volumeAmount?.priceDiff]
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
      {
        img: Images.dollar,
        content: `${English.E373}  (${English.E60})`,
        textContent: usdtAmount ?? 1,
      },
    ],
    [
      chartInfo?.symbol,
      highestAmount,
      lowestAmount,
      observedChange,
      usdtAmount,
      volumeAmount,
    ]
  )

  useEffect(() => {
    if (!socketRef.current || isLoadingCandles) return
    socketRef.current.on(
      SocketEmitter.Emitter[
        selectedIndex as keyof typeof SocketEmitter.Emitter
      ],
      (data) => {
        const findTokenName = tokenList?.find(
          (item) => item?.token_symbol === selectedToken?.token_symbol
        )
        if (!findTokenName) return
        const chartData: CandleObjectType =
          data?.data?.candles?.[findTokenName?.token_symbol]
        if (!chartData) return
        const {change, changeAmount, open, high, low, volume} = chartData
        setChartSocketData((prev) => ({
          change: prev?.change === change ? prev.change : change,
          changeAmount:
            prev?.changeAmount === changeAmount
              ? prev.changeAmount
              : changeAmount,
          high: prev?.high === high ? prev.high : high,
          low: prev?.low === low ? prev.low : low,
          open: prev?.open === open ? prev.open : open,
          volume: prev?.volume === volume ? prev.volume : volume,
        }))
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCandles, selectedIndex, selectedToken, socketRef, tokenList])
  return (
    <div className="flex  w-full  gap-6">
      {ConstantMapData?.map((item, index) => {
        const {content, img, textContent} = item
        return (
          <div
            key={content}
            className="lg:pr-[21px] xl:pr-[42px]  flex flex-col gap-1 border-r border-r-solid border-neutral-secondary-color last:border-none"
          >
            <div className="flex items-center gap-1 text-neutral-primary-color text-xs !leading-5 font-normal ">
              <ImageComponent
                className={`grey__filter shrink-0 ${index === 2 ? '[&>img]:rotate-180' : ''}`}
                imageUrl={img}
              />
              <span className="whitespace-nowrap">{content}</span>
            </div>
            <p
              className={`text-sm !leading-6 font-medium ${index === 0 ? (textContent?.priceDiff?.toString()?.startsWith('-') ? 'text-chart-red-color' : 'text-chart-green-color') : 'text-chart-text-primary-color'}`}
            >
              <span className="whitespace-nowrap">
                {content.includes(English.E122)
                  ? `${textContent?.priceDiff ?? '0.00'}${textContent?.priceDiff ? '' : ''}  ${chartInfo?.symbol ?? ''}`
                  : (textContent?.priceDiff ?? '0.00')}{' '}
              </span>
              {index !== 3 && (
                <span className="whitespace-nowrap">
                  {(textContent as any)?.percentageDiff}
                </span>
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default ChartHeaderStats
