import {ISeriesApi} from 'lightweight-charts'
import React, {useEffect, useState} from 'react'

import {Utility} from '@/helpers'

import {useChartProvider} from '../context/ChartProvider'

const Tooltip = () => {
  const [candleStickData, setCandleStickData] = useState<any>()

  const [volumeData, setVolumeData] = useState<any>()

  const {
    chartObjectRef,
    isLoadingCandles,
    chartAreaRef,
    volumeSeriesRef,
    chartInfo,
  } = useChartProvider()
  useEffect(() => {
    if (
      !chartObjectRef.current ||
      isLoadingCandles ||
      !chartAreaRef.current ||
      !volumeSeriesRef.current
    )
      return
    chartObjectRef.current.subscribeCrosshairMove((tooltipData) => {
      if (!tooltipData) return
      setCandleStickData(
        tooltipData.seriesData.get(
          chartAreaRef.current as ISeriesApi<'Candlestick'>
        )
      )
      setVolumeData(
        tooltipData?.seriesData?.get(
          volumeSeriesRef.current as ISeriesApi<'Histogram'>
        )
      )
    })
  }, [chartAreaRef, chartObjectRef, isLoadingCandles, volumeSeriesRef])
  return (
    <React.Fragment>
      {candleStickData && (
        <div className="relative flex gap-5 items-center -top-140 left-5 z-100">
          <span className="text-primary-color p-0.5 px-4 rounded-md bg-neutral-active-color">
            {chartInfo?.fullSymbolName.replace('USDT', '')}
          </span>
          <span className="text-primary-color text-[15px]">
            O{' '}
            <span
              className={
                candleStickData?.open < candleStickData?.close
                  ? 'text-primary-green'
                  : 'text-dark-danger-color'
              }
            >
              {candleStickData?.open ?? 0}
            </span>{' '}
          </span>
          <span className="text-primary-color text-[15px]">
            H{' '}
            <span
              className={
                candleStickData?.open < candleStickData?.close
                  ? 'text-primary-green'
                  : 'text-dark-danger-color'
              }
            >
              {candleStickData?.high ?? 0}
            </span>
          </span>
          <span className="text-primary-color text-[15px]">
            C{' '}
            <span
              className={
                candleStickData?.open < candleStickData?.close
                  ? 'text-primary-green'
                  : 'text-dark-danger-color'
              }
            >
              {candleStickData?.close ?? 0}
            </span>
          </span>
          <span className="text-primary-color text-[15px]">
            L{' '}
            <span
              className={
                candleStickData?.open < candleStickData?.close
                  ? 'text-primary-green'
                  : 'text-dark-danger-color'
              }
            >
              {candleStickData?.low ?? 0}
            </span>
          </span>
          <span className="text-primary-color text-[15px]">
            <span>
              <span
                className={
                  ((candleStickData?.close ?? 0) - (candleStickData?.open ?? 0))
                    .toString()
                    .startsWith('-')
                    ? 'text-dark-danger-color mr-2'
                    : 'text-primary-green mr-2'
                }
              >
                {((candleStickData?.close ?? 0) - (candleStickData?.open ?? 0))
                  .toString()
                  .startsWith('-')
                  ? Utility.removeDecimal(
                      (candleStickData?.close ?? 0) -
                        (candleStickData?.open ?? 0),
                      2
                    )
                  : `+${Utility.removeDecimal((candleStickData?.close ?? 0) - (candleStickData?.open ?? 0), 2)}`}
              </span>
              <span
                className={
                  candleStickData?.open < candleStickData?.close
                    ? 'text-primary-green'
                    : 'text-dark-danger-color'
                }
              >
                ({' '}
                {candleStickData?.open < candleStickData?.close
                  ? `+${Utility.removeDecimal((candleStickData?.close ?? 0) / (candleStickData?.open ?? 0), 2)}%`
                  : `-${Utility.removeDecimal((candleStickData?.close ?? 0) / (candleStickData?.open ?? 0), 2)}%`}
                )
              </span>
            </span>
          </span>
        </div>
      )}
      {volumeData && (
        <div className="relative bottom-50 text-primary-color -top-40 left-5 z-100">
          Volume :{' '}
          <span
            className={
              candleStickData?.open < candleStickData?.close
                ? 'text-primary-green'
                : 'text-dark-danger-color'
            }
          >{`${Utility.removeDecimal(volumeData?.value ?? 0, 2)}k`}</span>
        </div>
      )}
    </React.Fragment>
  )
}

export default Tooltip
