import React, {memo, useCallback, useEffect, useRef} from 'react'
import {v4 as uuidv4} from 'uuid'

import {CoordinateTypeObject, DrawingData} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const TrendLines = () => {
  const {
    tempShape,
    chartObjectRef,
    chartAreaRef,
    firstChartRef,
    isDrawing,
    setTotalShapes,
    setTempShape,
    handleCommonMouseDown,
    handleCommonMouseUp,
    isLoadingCandles,
    selectedTool,
    totalShapes,
  } = useChartProvider()
  const startingPoint = useRef<CoordinateTypeObject | null>(null)

  const commonCoordinatesUtilityFunction = useCallback(
    (
      type: 'initial' | 'addShape',
      startingX: number,
      startingY: number,
      e: MouseEvent
    ) => {
      if (
        !firstChartRef.current ||
        !chartObjectRef.current ||
        !chartAreaRef.current
      )
        return

      const rect = firstChartRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return

      const chart = chartObjectRef.current
      const series = chartAreaRef.current

      const time1 = chart.timeScale().coordinateToTime(startingX)
      const time2 = chart.timeScale().coordinateToTime(x)

      if (!time1 || !time2) return

      const startPrice = series.coordinateToPrice(startingY) ?? 0
      const currentPrice = series.coordinateToPrice(y) ?? 0

      const shape = {
        open_time_iso: time1,
        close_time_iso: time2,
        high: startPrice,
        low: currentPrice,
        id: tempShape?.id ?? uuidv4(),
        selectedShape: 'trend_line' as const,
        initialPoint: startPrice,
        endPoint: currentPrice,
      }

      if (type === 'addShape') {
        setTotalShapes((prev) => [...prev, shape])
        return
      }

      setTempShape(shape)
    },
    [
      chartAreaRef,
      chartObjectRef,
      firstChartRef,
      setTempShape,
      setTotalShapes,
      tempShape?.id,
    ]
  )

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!firstChartRef.current) return
      handleCommonMouseDown()
      const rect = firstChartRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      startingPoint.current = {x, y}
    },
    [firstChartRef, handleCommonMouseDown]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDrawing.current || !startingPoint.current) return
      commonCoordinatesUtilityFunction(
        'initial',
        startingPoint.current.x,
        startingPoint.current.y,
        e
      )
    },
    [commonCoordinatesUtilityFunction, isDrawing]
  )

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!startingPoint.current) return
      handleCommonMouseUp()
      commonCoordinatesUtilityFunction(
        'addShape',
        startingPoint.current.x,
        startingPoint.current.y,
        e
      )
      startingPoint.current = null
    },
    [commonCoordinatesUtilityFunction, handleCommonMouseUp]
  )

  const getLineStyle = useCallback(
    (shape: DrawingData) => {
      if (!chartObjectRef.current || !chartAreaRef.current) return {}

      const chart = chartObjectRef.current
      const series = chartAreaRef.current

      const x1 = chart.timeScale().timeToCoordinate(shape.open_time_iso)
      const x2 = chart.timeScale().timeToCoordinate(shape.close_time_iso)
      const y1 = series.priceToCoordinate(shape.high)
      const y2 = series.priceToCoordinate(shape.low)

      if (x1 === null || x2 === null || y1 === null || y2 === null) return {}

      const dx = x2 - x1
      const dy = y2 - y1
      const length = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      return {
        left: `${x1}px`,
        top: `${y1}px`,
        width: `${length}px`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
      }
    },
    [chartAreaRef, chartObjectRef]
  )

  useEffect(() => {
    if (selectedTool !== 'trend_line' || !firstChartRef.current) return

    const container = firstChartRef.current
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseup', handleMouseUp)

    // eslint-disable-next-line consistent-return
    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    selectedTool,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    firstChartRef,
  ])

  return isLoadingCandles ? null : (
    <React.Fragment>
      {totalShapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute z-40 h-[2px] bg-blue-400 pointer-events-none"
          style={getLineStyle(shape)}
        />
      ))}
      {tempShape && (
        <div
          className="absolute z-50 h-[2px] bg-blue-600 pointer-events-none"
          style={getLineStyle(tempShape)}
        />
      )}
    </React.Fragment>
  )
}

export default memo(TrendLines)
