import {LineSeries, Time} from 'lightweight-charts'
import {useCallback, useEffect} from 'react'

import {CandleObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const MovingAverageIndicator = () => {
  const {totalCandleData, chartObjectRef, isLoadingCandles} = useChartProvider()

  const calculateMovingAverageSeriesData = useCallback(
    (data: CandleObjectType[]) => {
      const result: {time: Time; value: number}[] = []
      const multiplier = 1

      let prevEma: number | null = null

      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        const price = Number(data[i].open) // ✅ better default
        const time = (Number(data[i].close_time) / 1000) as Time

        if (prevEma === null) {
          // Seed EMA using SMA of first window
          let sum = 0
          // eslint-disable-next-line no-plusplus
          for (let j = i + 1; j <= i; j++) {
            sum += Number(data[j].open)
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
    },
    []
  )

  useEffect(() => {
    const chartObj = chartObjectRef.current
    if (!chartObj || !totalCandleData.length || isLoadingCandles) return

    const maData = calculateMovingAverageSeriesData(totalCandleData)

    const maSeries = chartObj.addSeries(LineSeries, {
      color: '#2962FF',
      lineWidth: 1,
    })

    maSeries.setData(maData)

    // eslint-disable-next-line consistent-return
    return () => {
      chartObj.removeSeries(maSeries)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartObjectRef, totalCandleData, isLoadingCandles])

  return null
}

export default MovingAverageIndicator
