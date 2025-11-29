import {CreatePriceLineOptions, LineStyle} from 'lightweight-charts'
import React, {memo, useEffect, useMemo, useState} from 'react'

import {TabComponent} from '@/components'
import {useSocketProvider} from '@/GlobalProvider/SocketProvider'
import {Constants, SocketEmitter, Utility} from '@/helpers'
import ClosedPNL from '@/pages/ChallengeDashboard/sections/ClosedPNL'
import {OpenPosition, PendingOrder} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'
import OpenPositionTable from './OpenPositionTable'
import PendingOrderTable from './PendingOrderTable'

const TradesInfo = (props: {challengeId: string}) => {
  const {challengeId} = props
  const [activeIndex, setActiveIndex] = useState(0)
  const [socketEventKey, setSocketEventKey] =
    useState<keyof typeof SocketEmitter.Emitter>('user_open_position')
  const [openPosition, setOpenPosition] = useState<OpenPosition[]>([])
  const [pendingOrder, setPendingOrder] = useState<PendingOrder[]>([])
  const currentData = useMemo(
    () => (activeIndex === 0 ? openPosition : pendingOrder),
    [activeIndex, openPosition, pendingOrder]
  )
  const {isLoadingCandles, chartAreaRef, chartInfo} = useChartProvider()
  const {socketRef} = useSocketProvider()

  useEffect(() => {
    const currentSocket = socketRef.current
    if (isLoadingCandles || !currentSocket) return
    const socketEventName = `${SocketEmitter.Emitter[socketEventKey]}_${challengeId}`

    const handler = (data: any) => {
      if (socketEventKey === 'user_open_position') {
        setOpenPosition(data?.data?.positions)
        return
      }

      setPendingOrder(data?.data?.positions)
    }

    currentSocket.on(socketEventName, handler)

    // eslint-disable-next-line consistent-return
    return () => {
      setSocketEventKey((data) => data)
      setOpenPosition([])
      setPendingOrder([])
      currentSocket?.off(socketEventName, handler)
    }
  }, [challengeId, isLoadingCandles, socketEventKey, socketRef])

  useEffect(() => {
    const priceline = chartAreaRef?.current

    if (
      isLoadingCandles ||
      !priceline ||
      activeIndex === 1 ||
      openPosition?.length === 0
    ) {
      return
    }

    const chartSymbol = chartInfo?.fullSymbolName?.replace('USDT', '')

    const matchedPositions = openPosition.filter((item) => {
      const itemSymbol = item?.symbol?.replace('USDT', '')
      return itemSymbol === chartSymbol
    })

    const createdLines = matchedPositions.map((item) => {
      const config: CreatePriceLineOptions = {
        price: item?.average_price ?? 0,
        color: item?.open_pnl?.toString()?.startsWith('-')
          ? '#ef5350'
          : '#34c759',
        lineWidth: 1,
        lineStyle: LineStyle.Solid,
        axisLabelVisible: true,
        title: Utility.removeDecimal(item?.open_pnl).toString(),
      }

      return priceline.createPriceLine(config)
    })

    // eslint-disable-next-line consistent-return
    return () => {
      createdLines.forEach((line) => {
        priceline.removePriceLine(line)
      })
    }
  }, [
    pendingOrder,
    isLoadingCandles,
    chartAreaRef,
    activeIndex,
    openPosition,
    chartInfo,
  ])

  return (
    <div className="!w-full py-5 px-4 !bg-chart-layout-bg rounded !whitespace-nowrap">
      <TabComponent
        activeIndex={activeIndex}
        className="!w-full"
        headingData={Constants.tradesHeadingTypes}
        isCorruptedTabIndex={3}
        isDividerType={false}
        type="buttonType"
        setActiveIndex={(index) => {
          setActiveIndex(index)
          setSocketEventKey(
            index === 0 ? 'user_open_position' : 'user_pending_positions'
          )
        }}
      >
        {currentData?.length === 0 && !isLoadingCandles ? (
          <span className="font-medium text-chart-text-primary-color text-center !whitespace-nowrap">
            No Orders
          </span>
        ) : (
          <React.Fragment>
            {activeIndex === 0 ? (
              <OpenPositionTable
                key="open_position_order"
                challenge_id={challengeId}
                openPosition={openPosition}
                setPosition={setOpenPosition}
              />
            ) : activeIndex === 1 ? (
              <PendingOrderTable
                key="pending_order"
                challenge_id={challengeId}
                pendingOrder={pendingOrder}
                setPendingOrder={setPendingOrder}
              />
            ) : (
              <ClosedPNL showHeader />
            )}
          </React.Fragment>
        )}
      </TabComponent>
    </div>
  )
}

export default memo(TradesInfo)
