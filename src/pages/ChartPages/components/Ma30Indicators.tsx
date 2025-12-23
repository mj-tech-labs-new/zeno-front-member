/* eslint-disable no-plusplus */
import {LineSeries, Time, WhitespaceData} from 'lightweight-charts'
import {useCallback, useEffect, useRef} from 'react'

import {CandleObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const Ma30Indicators = () => {
  const {
    totalCandleData,
    chartObjectRef,
    isCallingCurrent,
    isLoadingCandles,
    singleCandleData,
    isLastCandle,
    liveCandle,
  } = useChartProvider()

  const ma30Ref = useRef<any>(null)
  const bufferRef = useRef<CandleObjectType[]>([])
  const period = 30

  const calculateMA30 = useCallback((data: CandleObjectType[]) => {
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

  const calculateLatestMA30 = (
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

    ma30Ref.current = chartObj.addSeries(LineSeries, {
      color: '#965fc4',
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
    })

    // eslint-disable-next-line consistent-return
    return () => {
      if (ma30Ref.current) {
        chartObj.removeSeries(ma30Ref.current)
        ma30Ref.current = null
      }
    }
  }, [chartObjectRef, isCallingCurrent, isLoadingCandles])

  useEffect(() => {
    if (!ma30Ref.current || isLoadingCandles) return

    const maData = calculateMA30(totalCandleData)
    ma30Ref.current.setData(maData)

    bufferRef.current = totalCandleData.slice(-period)
  }, [totalCandleData, calculateMA30, isLoadingCandles])

  useEffect(() => {
    if (!ma30Ref.current || !liveCandle) return

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

    ma30Ref.current.update({
      time: (new Date(liveCandle?.close_time_iso).getTime() / 1000) as Time,
      value: sum / period,
    })
  }, [liveCandle])

  useEffect(() => {
    if (!ma30Ref.current || !singleCandleData.current || !isLastCandle.current)
      return
    const newMa5 = calculateLatestMA30(
      singleCandleData.current as unknown as any
    )
    ma30Ref.current.update(newMa5)
  }, [isLastCandle, singleCandleData])
  return null
}

export default Ma30Indicators
