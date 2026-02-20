import dayjs from 'dayjs'
import {ISeriesApi} from 'lightweight-charts'
import {toNumber} from 'lodash'
import React, {useEffect, useMemo, useState} from 'react'

import {English, Utility} from '@/helpers'
import {
  IndicatorToolTipObject,
  ToolTipObjectType,
  VolumeToolTipObject,
} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const Tooltip = () => {
  const [candleStickData, setCandleStickData] =
    useState<ToolTipObjectType | null>(null)
  const [volumeData, setVolumeData] = useState<VolumeToolTipObject | null>(null)
  const [ma5IndicatorData, setMa5IndicatorData] =
    useState<IndicatorToolTipObject | null>(null)
  const [ma10IndicatorData, setMa10IndicatorData] =
    useState<IndicatorToolTipObject | null>(null)
  const [ma30IndicatorData, setMa30IndicatorData] =
    useState<IndicatorToolTipObject | null>(null)
  const {
    chartObjectRef,
    isLoadingCandles,
    chartAreaRef,
    volumeSeriesRef,
    chartInfo,
    singleCandleData,
    ma5Ref,
    ma10Ref,
    ma30Ref,
  } = useChartProvider()

  const toolTipData = useMemo(() => {
    if (!candleStickData) return null
    const {open, low, high, close, time} = candleStickData
    const timeToMilli = toNumber(time.toString()) * 1000
    const date = dayjs(timeToMilli)
    const candleDate = date.format('YYYY/MM/DD')
    const amplitudeChange = Utility.numberConversion(
      ((high - low) / (low ?? 1)) * 100
    )
    const amountChange = Utility.numberConversion(
      ((close - open) / (open ?? 1)) * 100
    )

    return {
      '': candleDate,
      O: open,
      H: high,
      L: low,
      C: close,
      Change: amountChange,
      Amplitude: amplitudeChange,
    }
  }, [candleStickData])

  const VolumeToolTip = useMemo(() => {
    if (!candleStickData || !volumeData) return null
    const {open, high, low, close} = candleStickData
    const avgPrice = open + high + low + close
    const usdtAmount = avgPrice * volumeData.value
    return {
      [`Vol(${chartInfo?.symbol})`]: Utility.largeNumberNotationConversion(
        volumeData?.value ?? 1
      ),
      [`Vol(${English.E60})`]: Utility.largeNumberNotationConversion(
        volumeData?.value ?? 1 * usdtAmount
      ),
    }
  }, [candleStickData, chartInfo?.symbol, volumeData])

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
        (tooltipData.seriesData.get(
          chartAreaRef.current as ISeriesApi<'Candlestick'>
        ) as ToolTipObjectType) ?? null
      )

      const ma5 = tooltipData.seriesData.get(
        ma5Ref.current as ISeriesApi<'Line'>
      )
      setMa5IndicatorData((ma5 as unknown as IndicatorToolTipObject) ?? null)

      const ma10 = tooltipData.seriesData.get(
        ma10Ref.current as ISeriesApi<'Line'>
      )
      setMa10IndicatorData((ma10 as unknown as IndicatorToolTipObject) ?? null)

      const ma30 = tooltipData.seriesData.get(
        ma30Ref.current as ISeriesApi<'Line'>
      )
      setMa30IndicatorData((ma30 as unknown as IndicatorToolTipObject) ?? null)

      setVolumeData(
        (tooltipData?.seriesData?.get(
          volumeSeriesRef.current as ISeriesApi<'Histogram'>
        ) as VolumeToolTipObject) ?? null
      )
    })
  }, [
    ma5Ref,
    ma10Ref,
    ma30Ref,
    chartAreaRef,
    chartObjectRef,
    isLoadingCandles,
    singleCandleData,
    volumeSeriesRef,
  ])
  return (
    <React.Fragment>
      <div className="absolute font-poppins! flex flex-col gap-2.5 top-3 left-5 z-99">
        {toolTipData?.Change && (
          <div className="flex flex-wrap gap-4 items-center">
            {Object.entries(toolTipData)?.map(([key, value], index) => (
              <div
                key={key}
                className="flex items-center *:text-[10px]/4! *:font-medium! gap-1 flex-wrap text-neutral-primary-color"
              >
                {index !== 0 && <span className="capitalize">{key}</span>}
                <span
                  className={
                    index === 0
                      ? 'text-neutral-primary-color'
                      : Utility.colorGeneratorUtility(
                          toNumber(toolTipData.Change)
                        )
                  }
                >
                  {key === 'Change' || key === 'Amplitude'
                    ? `${value}%`
                    : value}
                </span>
              </div>
            ))}
          </div>
        )}
        {ma5IndicatorData && (
          <div className="flex bg-info-bg-color py-1 px-2 items-center *:text-[10px]/4! *:font-medium! gap-2.5 flex-wrap w-fit rounded-full border border-solid text-blue-line-color border-blue-line-color">
            <span>{English.E511}: </span>
            <span>
              {Utility.numberConversion(
                ma5IndicatorData?.value,
                Utility.getPricePrecision(ma5IndicatorData?.value)
              )}
            </span>
          </div>
        )}
        {ma10IndicatorData && (
          <div className="flex bg-info-bg-color py-1 px-2 items-center *:text-[10px]/4! *:font-medium! gap-2.5 flex-wrap w-fit rounded-full border border-solid text-chart-orange-color border-chart-orange-color">
            <span>{English.E512}: </span>
            <span>
              {Utility.numberConversion(
                ma10IndicatorData?.value,
                Utility.getPricePrecision(ma10IndicatorData?.value)
              )}
            </span>
          </div>
        )}
        {ma30IndicatorData && (
          <div className="flex bg-info-bg-color py-1 px-2 items-center *:text-[10px]/4! *:font-medium! gap-2.5 flex-wrap w-fit rounded-full border border-solid text-purple-line-color border-purple-line-color">
            <span>{English.E513}: </span>
            <span>
              {Utility.numberConversion(
                ma30IndicatorData?.value,
                Utility.getPricePrecision(ma30IndicatorData?.value)
              )}
            </span>
          </div>
        )}
      </div>

      <div className="absolute font-poppins! flex flex-wrap gap-4 items-center  bottom-[114px] left-5 z-99">
        {VolumeToolTip &&
          Object.entries(VolumeToolTip)?.map(([key, value]) => (
            <div
              key={key}
              className="flex gap-1 items-center *:text-[10px]/4 *:font-medium *:tracking-normal"
            >
              <span className="text-neutral-primary-color!">{key}</span>
              <span
                className={Utility.colorGeneratorUtility(
                  toNumber(toolTipData?.Change) ?? 0
                )}
              >
                {value}
              </span>
            </div>
          ))}
      </div>
    </React.Fragment>
  )
}

export default Tooltip
