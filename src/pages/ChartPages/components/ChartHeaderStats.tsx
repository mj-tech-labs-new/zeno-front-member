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
  } = useChartProvider()
  const {socketRef} = useSocketProvider()

  const observedChange = useMemo(
    () => ({
      priceDiff: chartSocketData?.changeAmount ?? '---',
      percentageDiff: chartSocketData?.change
        ? `${Number(chartSocketData?.change).toFixed(2)}%`
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
        ? `${Number(Utility.largeNumberNotationConversion(chartSocketData?.volume))}`
        : '---',
    }),
    [chartSocketData?.volume]
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
        content: English.E122,
        textContent: volumeAmount,
      },
    ],
    [highestAmount, lowestAmount, observedChange, volumeAmount]
  )

  useEffect(() => {
    if (!socketRef.current || isLoadingCandles) return
    socketRef.current.on(
      SocketEmitter.Emitter[
        selectedIndex as keyof typeof SocketEmitter.Emitter
      ],
      (data) => {
        const findTokenName = Object.entries(tokenList ?? {}).find(
          ([_, value]) => value === selectedToken
        )
        if (!findTokenName) return
        const chartData: CandleObjectType =
          data?.data?.candles?.[findTokenName?.[0]]
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
              className={`text-sm !leading-6 font-medium ${index === 0 ? (textContent?.priceDiff?.toString()?.startsWith('-') ? 'text-chart-red-color' : 'text-chart-green-color') : 'text-chart-text-primary-color'}`}
            >
              <span>
                {content === English.E122
                  ? `${textContent?.priceDiff}k  ${chartInfo?.symbol}`
                  : textContent?.priceDiff}{' '}
              </span>
              {index !== 3 && (
                <span>{(textContent as any)?.percentageDiff}</span>
              )}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default ChartHeaderStats
