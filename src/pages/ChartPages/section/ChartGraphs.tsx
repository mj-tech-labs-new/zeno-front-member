import {
  CandlestickSeries,
  createChart,
  HistogramSeries,
  Time,
} from 'lightweight-charts'
import { memo, useCallback, useEffect } from 'react'

import { SocketEmitter } from '@/helpers'
import { CandleObjectType } from '@/types/ChartTypes'
import { ChartUtils } from '@/utils'

import { useChartProvider } from '../context/ChartProvider'

const ChartGraphs = () => {
  const {
    isLoadingCandles,
    totalCandleData,
    chartAreaRef,
    chartObjectRef,
    firstChartRef,
    volumeSeriesRef,
    socketRef,
    selectedIndex,
    selectedToken,
    tokenList,
    getCandleHistory,
    currnetLimit,
    isCallingCurrent,
  } = useChartProvider()

  const calculateDataAndUpdateChart = useCallback(
    (items: CandleObjectType[]) => {
      const candlestickData = items?.map((item) => {
        const { close, high, low, open, close_time_iso } = item
        return {
          close: Number(close),
          high: Number(high),
          low: Number(low),
          open: Number(open),
          time: (new Date(close_time_iso).getTime() / 1000) as Time,
        }
      })

      chartAreaRef.current?.setData(candlestickData)

      const volumeData = totalCandleData.map((item) => {
        const { volume, close, open, close_time_iso } = item
        const isUp = Number(close) > Number(open)

        return {
          time: (new Date(close_time_iso).getTime() / 1000) as Time,
          value: Number(volume),
          color: isUp ? '#31413C' : '#4A2C25',
        }
      })
      volumeSeriesRef.current?.setData(volumeData)
    },
    [chartAreaRef, totalCandleData, volumeSeriesRef]
  )

  const handleChartRendering = useCallback(() => {
    if (firstChartRef.current === null) return
    if (chartObjectRef.current) {
      chartObjectRef.current.remove()
      chartObjectRef.current = null
    }

    const chartObj = createChart(firstChartRef.current, ChartUtils.chartOptions)
    chartObjectRef.current = chartObj

    // Add candlestick series
    const chartArea = chartObj.addSeries(
      CandlestickSeries,
      ChartUtils.seriesOptions
    )
    chartObj.priceScale('right')
    chartAreaRef.current = chartArea
    chartArea.priceScale().applyOptions({
      scaleMargins: {
        top: 0.25,
        bottom: 0.23,
      },
    })
    chartObj.timeScale().applyOptions({ barSpacing: 10 })
    chartObj.timeScale().fitContent()

    // Add volume series (histogram)
    const volumeSeries = chartObj.addSeries(HistogramSeries, {
      priceFormat: {
        type: 'custom',
        formatter: (value: number) => `${value}K`,
      },
      priceScaleId: '',
    })
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0,
        bottom: 0,
      },
    })
    volumeSeriesRef.current = volumeSeries
    volumeSeriesRef.current.moveToPane(2)
    const volumePane = chartObjectRef.current.panes()?.[1]
    volumePane.setHeight(120)
  }, [chartAreaRef, chartObjectRef, firstChartRef, volumeSeriesRef])

  useEffect(() => {
    if (isLoadingCandles) return
    handleChartRendering()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCandles])

  useEffect(() => {
    if (isLoadingCandles || !socketRef.current) return

    socketRef.current.on(
      SocketEmitter.Emitter[
      selectedIndex as keyof typeof SocketEmitter.Emitter
      ],
      (data) => {
        const findTokenName = Object.entries(tokenList ?? {}).find(
          ([_, value]) => value === selectedToken
        )
        if (!findTokenName) return
        const chartSocketData: CandleObjectType =
          data?.data?.candles?.[findTokenName?.[0]]
        if (
          !chartSocketData ||
          !chartAreaRef.current ||
          !volumeSeriesRef.current
        )
          return
        const { open, high, low, close, volume, close_time_iso } = chartSocketData
        const currentCandle = {
          close: Number(close),
          high: Number(high),
          low: Number(low),
          open: Number(open),
          time: (new Date(close_time_iso).getTime() / 1000) as Time,
        }
        const currentCandleVolume = {
          time: (new Date(close_time_iso).getTime() / 1000) as Time,
          value: Number(volume),
          color: Number(close) > Number(open) ? '#31413C' : '#4A2C25',
        }
        if (!currentCandle || !currentCandleVolume) return
        chartAreaRef.current.update(currentCandle)
        volumeSeriesRef.current.update(currentCandleVolume)
      }
    )
  }, [
    tokenList,
    chartAreaRef,
    isLoadingCandles,
    selectedIndex,
    selectedToken,
    socketRef,
    volumeSeriesRef,
  ])

  chartObjectRef.current
    ?.timeScale()
    .subscribeVisibleTimeRangeChange((timeRange) => {
      if (!timeRange) return

      const firstVisibleBar = chartObjectRef.current
        ?.timeScale()
        .coordinateToLogical(0)
      if (!firstVisibleBar) return

      if (firstVisibleBar < 10) {
        currnetLimit.current += 10
        const tokenToUse = Object.entries(tokenList ?? {}).find(
          ([_, value]) => value === selectedToken
        )
        getCandleHistory(
          tokenToUse ? tokenToUse?.[0] : 'BTC',
          currnetLimit.current
        )
      }
    })

  useEffect(() => {
    if (!isLoadingCandles && !isCallingCurrent) return
    calculateDataAndUpdateChart(totalCandleData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCallingCurrent, isLoadingCandles, totalCandleData])

  return <div ref={firstChartRef} style={{ width: '100%', height: '100%' }} />
}

export default memo(ChartGraphs)
