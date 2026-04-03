import { CreatePriceLineOptions, LineStyle } from 'lightweight-charts'
import _ from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { TabComponent } from '@/components'
import { useSocketProvider } from '@/GlobalProvider/SocketProvider'
import { Constants, English, SocketEmitter, Utility } from '@/helpers'
import { OpenPosition, PendingOrder } from '@/types/ChartTypes'

import { useChartProvider } from '../context/ChartProvider'
import OpenHistoryTable from './OpenHistoryTable'
import OpenPositionTable from './OpenPositionTable'
import PendingOrderTable from './PendingOrderTable'
import PositionHistoryTable from './PositionHistoryTable'
import TransactionDetailsTable from './TransactionDetailsTable'

const TradesInfo = (props: { challengeId: string }) => {
  const { challengeId } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const [openPosition, setOpenPosition] = useState<OpenPosition[]>([])
  const [pendingOrder, setPendingOrder] = useState<PendingOrder[]>([])
  const currentData = useMemo(
    () => (activeIndex === 0 ? openPosition : pendingOrder),
    [activeIndex, openPosition, pendingOrder]
  )
  const { isLoadingCandles, chartAreaRef, chartInfo } = useChartProvider()
  const { socketRef } = useSocketProvider()
  const [tableHeadingData, setTableHeadingData] = useState(
    Constants.tradesHeadingTypes
  )

  const handleTableHeadingData = useCallback(
    (data: any, key: string, indexNo: number) => {
      setTableHeadingData((prev) => {
        const newTableHeading = prev.map((item, index) =>
          index === indexNo ? { ...item, content: data?.length } : item
        )
        return newTableHeading
      })

      const sortedData = _.orderBy(data, (item) => item.open_time, ['desc'])
      if (key === 'user_open_position') {
        setOpenPosition(data && data?.length > 0 ? sortedData : [])
        return
      }
      setPendingOrder(data && data?.length > 0 ? sortedData : [])
    },
    []
  )

  useEffect(() => {
    const currentSocket = socketRef.current
    if (isLoadingCandles || !currentSocket) return

    let 
    : any

    currentSocket.on(
      `${SocketEmitter.Emitter.user_open_position}_${challengeId}`,
      (data) => {
        clearTimeout(timeout)
        handleTableHeadingData(
          data?.data?.positions ?? [],
          'user_open_position',
          0
        )
        timeout = setTimeout(() => {
          handleTableHeadingData(
            [],
            'user_open_position',
            0
          )
        }, 2000)
      }
    )


    // eslint-disable-next-line consistent-return
    return () => {
      currentSocket?.off(
        `${SocketEmitter.Emitter.user_open_position}_${challengeId}`,
        (data) => {
          handleTableHeadingData(
            data?.data?.positions ?? [],
            'user_open_position',
            0
          )
        }
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCandles, socketRef])

  useEffect(() => {
    const currentSocket = socketRef.current
    if (isLoadingCandles || !currentSocket) return
    let timeout: any
    handleTableHeadingData(
      [],
      'user_pending_positions',
      1
    )
    currentSocket.on(
      `${SocketEmitter.Emitter.user_pending_positions}_${challengeId}`,
      (data) => {
        clearTimeout(timeout)
        handleTableHeadingData(
          data?.data?.positions ?? [],
          'user_pending_positions',
          1
        )
        timeout = setTimeout(() => {
          handleTableHeadingData(
            [],
            'user_open_position',
            0
          )
        }, 2000)
      }

    )

    // eslint-disable-next-line consistent-return
    return () => {
      currentSocket?.off(
        `${SocketEmitter.Emitter.user_pending_positions}_${challengeId}`,
        (data) => {

          handleTableHeadingData(
            data?.data?.positions ?? [],
            'user_pending_positions',
            1
          )
        }
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingCandles, socketRef])


  useEffect(() => {
    const priceline = chartAreaRef?.current

    if (
      isLoadingCandles ||
      !priceline ||
      activeIndex === 1 ||
      activeIndex === 2 ||
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
    <div className="!w-full  lg:!w-[calc(100%-300px)] py-5 px-4 !bg-chart-layout-bg rounded !whitespace-nowrap h-full">
      <TabComponent
        isContentType
        activeIndex={activeIndex}
        className="!w-full !leading-4.5 !gap-3 [&>div]:first:overflow-x-auto"
        headingData={tableHeadingData}
        isDividerType={false}
        type="buttonType"
        setActiveIndex={(index) => {
          setActiveIndex(index)
        }}
      >
        {activeIndex !== 2 &&
          activeIndex !== 3 &&
          activeIndex !== 4 &&
          currentData.length === 0 &&
          !isLoadingCandles ? (
          <span className="font-medium text-chart-text-primary-color text-center !whitespace-nowrap">
            {English.E422}
          </span>
        ) : (
          <React.Fragment>
            {activeIndex === 0 ? (
              <OpenPositionTable
                key="open_position_order"
                challenge_id={challengeId}
                openPosition={openPosition}
                setPosition={(data) => {
                  handleTableHeadingData(data, 'user_open_position', 0)
                }}
              />
            ) : activeIndex === 1 ? (
              <PendingOrderTable
                key="user_pending_positions"
                challenge_id={challengeId}
                pendingOrder={pendingOrder}
                setPendingOrder={(data) => {
                  handleTableHeadingData(data, 'user_pending_position', 1)
                }}
              />
            ) : activeIndex === 2 ? (
              <OpenHistoryTable showHeader />
            ) : activeIndex === 3 ? (
              <PositionHistoryTable showHeader />
            ) : (
              <TransactionDetailsTable showHeader />
            )}
          </React.Fragment>
        )}
      </TabComponent>
    </div>
  )
}

export default memo(TradesInfo)
