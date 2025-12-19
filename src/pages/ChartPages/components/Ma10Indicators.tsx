/* eslint-disable no-plusplus */
import {LineSeries, Time, WhitespaceData} from 'lightweight-charts'
import {useCallback, useEffect, useRef} from 'react'

import {CandleObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const Ma10Indicators = () => {
  const {totalCandleData, chartObjectRef, isCallingCurrent, isLoadingCandles} =
    useChartProvider()
  const ma10Ref = useRef<any>(null)

  const period = 10

  const ma10 = useCallback((candleData: CandleObjectType[]) => {
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

  useEffect(() => {
    const chartObj = chartObjectRef.current
    if (!chartObj || isCallingCurrent.current || isLoadingCandles) return
    ma10Ref.current = chartObj.addSeries(LineSeries, {
      color: '#f7931a',
      lineWidth: 1,
      priceLineVisible: false,
    })

    // eslint-disable-next-line consistent-return
    return () => {
      if (ma10Ref.current) {
        chartObj.removeSeries(ma10Ref.current)
        ma10Ref.current = null
      }
    }
  }, [chartObjectRef, isCallingCurrent, isLoadingCandles])

  useEffect(() => {
    if (!ma10Ref.current || !totalCandleData) return

    const ma = ma10(totalCandleData)
    ma10Ref.current.setData(ma)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCandleData])

  return null
}

export default Ma10Indicators
