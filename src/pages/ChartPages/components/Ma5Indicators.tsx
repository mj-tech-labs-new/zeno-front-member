/* eslint-disable no-plusplus */
import {LineSeries, Time, WhitespaceData} from 'lightweight-charts'
import {useCallback, useEffect, useRef} from 'react'

import {CandleObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const Ma5Indicators = () => {
  const {
    totalCandleData,
    chartObjectRef,
    isCallingCurrent,
    isLoadingCandles,
    isLastCandle,
    singleCandleData,
  } = useChartProvider()
  const ma5Ref = useRef<any>(null)
  const period = 5
  const ma5 = useCallback((candleData: CandleObjectType[]) => {
    if (candleData.length === 0) return []

    const result: (WhitespaceData | {time: Time; value: number})[] = []

    for (let i = 0; i < candleData.length; i++) {
      const time = (new Date(candleData[i].close_time_iso).getTime() /
        1000) as Time

      if (i < period - 1) {
        result.push({time}) // whitespace
        // eslint-disable-next-line no-continue
        continue
      }

      let sum = 0
      for (let j = i - period + 1; j <= i; j++) {
        sum += Number(candleData[j].close)
      }

      result.push({
        time,
        value: sum / period,
      })
    }

    return result
  }, [])

  const calculateLatestMA5 = (
    candleData: CandleObjectType[]
  ): {time: Time; value: number} | null => {
    if (candleData.length < period) return null

    const lastIndex = candleData.length - 1
    let sum = 0

    for (let i = lastIndex - period + 1; i <= lastIndex; i++) {
      sum += Number(candleData[i].close)
    }

    return {
      time: (new Date(candleData[lastIndex].close_time_iso).getTime() /
        1000) as Time,
      value: sum / period,
    }
  }

  useEffect(() => {
    const chartObj = chartObjectRef.current
    if (!chartObj || isCallingCurrent.current || isLoadingCandles) return
    ma5Ref.current = chartObj.addSeries(LineSeries, {
      color: '#2962FF',
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    })

    // eslint-disable-next-line consistent-return
    return () => {
      if (ma5Ref.current) {
        chartObj.removeSeries(ma5Ref.current)
        ma5Ref.current = null
      }
    }
  }, [chartObjectRef, isCallingCurrent, isLoadingCandles])

  useEffect(() => {
    if (
      !ma5Ref.current ||
      !totalCandleData ||
      !isCallingCurrent ||
      isLoadingCandles
    )
      return

    const ma = ma5(totalCandleData)
    ma5Ref.current.setData(ma)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCandleData])

  useEffect(() => {
    if (!ma5Ref.current || !singleCandleData.current || !isLastCandle.current)
      return
    const newMa5 = calculateLatestMA5(
      singleCandleData.current as unknown as any
    )
    ma5Ref.current.update(newMa5)
  }, [isLastCandle, singleCandleData])

  return null
}

export default Ma5Indicators
