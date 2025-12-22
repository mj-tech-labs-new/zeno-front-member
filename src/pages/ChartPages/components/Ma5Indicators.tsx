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
    liveCandle,
  } = useChartProvider()

  const ma5Ref = useRef<any>(null)
  const period = 5

  // Buffer to keep last N candles
  const bufferRef = useRef<CandleObjectType[]>([])

  const calculateMA5 = useCallback((data: CandleObjectType[]) => {
    const result: (WhitespaceData | {time: Time; value: number})[] = []

    for (let i = 0; i < data.length; i++) {
      const time = (new Date(data[i].close_time_iso).getTime() / 1000) as Time

      if (i < period - 1) {
        result.push({time})
        // eslint-disable-next-line no-continue
        continue
      }

      let sum = 0
      for (let j = i - period + 1; j <= i; j++) {
        sum += Number(data[j].close)
      }

      result.push({
        time,
        value: sum / period,
      })
    }

    return result
  }, [])

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
    if (!ma5Ref.current || isLoadingCandles) return

    const maData = calculateMA5(totalCandleData)
    ma5Ref.current.setData(maData)

    bufferRef.current = totalCandleData.slice(-period)
  }, [totalCandleData, calculateMA5, isLoadingCandles])

  useEffect(() => {
    if (!ma5Ref.current || !liveCandle) return

    const last = bufferRef.current.at(-1)

    if (last && last.close_time_iso === liveCandle.close_time_iso) {
      bufferRef.current[bufferRef.current.length - 1] = liveCandle
    } else {
      bufferRef.current.push(liveCandle)

      if (bufferRef.current.length > period) {
        bufferRef.current.shift()
      }
    }

    if (bufferRef.current.length < period) return

    const sum = bufferRef.current.reduce((acc, c) => acc + Number(c.close), 0)

    ma5Ref.current.update({
      time: (new Date(liveCandle.close_time_iso).getTime() / 1000) as Time,
      value: sum / period,
    })
  }, [liveCandle])

  return null
}

export default Ma5Indicators
