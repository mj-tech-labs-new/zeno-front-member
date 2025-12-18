import {LineSeries, Time} from 'lightweight-charts'
import {useCallback, useEffect} from 'react'

import {CandleObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const ExponentialIndicators = () => {
  const {
    totalCandleData,
    chartObjectRef,
    isLoadingCandles,
    isCallingCurrent,
    isLastCandle,
  } = useChartProvider()

  // const ema = useCallback(
  //   (data: CandleObjectType[], period: number) => {
  //     const result: { time: Time; value: number }[] = []
  //     const multiplier = 2 / (period + 1)

  //     let prevEma: number | null = null

  //     // eslint-disable-next-line no-plusplus
  //     for (let i = 0; i < data.length; i++) {
  //       const price = Number(data[i].close) // ✅ better default
  //       const time = Math.ceil(Number(data[i].open_time) / 1000) as Time

  //       // eslint-disable-next-line no-continue
  //       if (i < period - 1) continue

  //       if (prevEma === null) {
  //         // Seed EMA using SMA of first window
  //         let sum = 0
  //         // eslint-disable-next-line no-plusplus
  //         for (let j = i - period + 1; j <= i; j++) {
  //           sum += Number(data[j].close)
  //         }
  //         prevEma = sum / period
  //       } else {
  //         prevEma = (price - prevEma) * multiplier + prevEma
  //       }

  //       result.push({
  //         time,
  //         value: prevEma
  //       })
  //     }

  //     return result
  //   },
  //   []
  // )

  const ema = useCallback((data: CandleObjectType[]) => {
    const result: {time: Time; value: number}[] = []
    const multiplier = 1

    let prevEma: number | null = null

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      const price = Number(data[i].close) // ✅ better default
      const time = (Number(data[i].close_time) / 1000) as Time

      if (prevEma === null) {
        // Seed EMA using SMA of first window
        let sum = 0
        // eslint-disable-next-line no-plusplus
        for (let j = i + 1; j <= i; j++) {
          sum += Number(data[j].close)
        }
        prevEma = sum
      } else {
        prevEma = (price - prevEma) * multiplier + prevEma
      }

      result.push({
        time,
        value: prevEma,
      })
    }

    return result
  }, [])

  useEffect(() => {
    const chartObj = chartObjectRef.current
    if (
      !chartObj ||
      !totalCandleData.length ||
      isLoadingCandles ||
      isCallingCurrent.current ||
      isLastCandle.current
    )
      return

    const emaData = ema(totalCandleData)

    const emaSeries = chartObj.addSeries(LineSeries, {
      color: '#ffcc00',
      lineWidth: 1,
    })

    emaSeries.setData(emaData)

    // eslint-disable-next-line consistent-return
    return () => {
      chartObj.removeSeries(emaSeries)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartObjectRef, totalCandleData, isLoadingCandles])

  return null
}

export default ExponentialIndicators
