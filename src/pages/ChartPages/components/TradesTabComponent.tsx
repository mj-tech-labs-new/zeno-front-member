/* eslint-disable consistent-return */
import {Fragment, memo, useEffect, useMemo, useRef, useState} from 'react'

import {BasicSkeleton} from '@/components'
import {English, Utility} from '@/helpers'
import {ChartSwitchProps, OrderBookObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const TradesTabComponent = (props: Pick<ChartSwitchProps, 'activeType'>) => {
  const {isLoadingCandles, chartInfo, livePrice} = useChartProvider()
  const {activeType} = props
  const [isLoadingOrderBook, setIsLoadingOrderBook] = useState(true)
  const [bookings, setBookings] = useState<OrderBookObjectType | null>(null)
  const webSocketRef = useRef<WebSocket | null>(null)
  const tradesToMap = useMemo(() => {
    const buyOrders = bookings?.asks?.map((item) => ({
      price: item[0],
      amount: item[1],
      type: 'buy',
    }))
    const sellOrders = bookings?.asks?.map((item) => ({
      price: item[0],
      amount: item[1],
      type: 'sell',
    }))
    return activeType === 'buy_sell_type'
      ? [...(buyOrders ?? []), ...(sellOrders ?? [])]
      : activeType === 'buy_type'
        ? buyOrders
        : sellOrders
  }, [activeType, bookings?.asks])

  const maxNumber = useMemo(
    () =>
      [...(bookings?.asks ?? []), ...(bookings?.bids ?? [])]
        ?.map((numbers) => numbers?.[1] ?? 0 * (numbers?.[0] ? numbers[0] : 0))
        .reduce(
          (accumulator, currentValue) => Math.max(accumulator, currentValue),
          -Infinity
        ),
    [bookings?.asks, bookings?.bids]
  )

  useEffect(() => {
    if (isLoadingCandles || !chartInfo?.fullSymbolName) return
    const SYMBOL = chartInfo?.fullSymbolName
    if (webSocketRef.current) {
      webSocketRef.current.close()
    }
    const webSocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${SYMBOL.toLowerCase()}@depth5@100ms`
    )
    webSocketRef.current = webSocket

    webSocket.addEventListener('error', () => {
      setIsLoadingOrderBook(false)
    })

    webSocket.addEventListener('open', () => {
      setIsLoadingOrderBook(false)
    })

    webSocket.addEventListener('message', (data) => {
      const bidData = JSON.parse(data?.data)
      setBookings(bidData)
    })

    return () => {
      webSocket.removeEventListener('close', () => {
        setBookings(null)
        setIsLoadingOrderBook(false)
      })
      webSocket.removeEventListener('error', () => {
        setIsLoadingOrderBook(false)
      })
    }
  }, [chartInfo?.fullSymbolName, isLoadingCandles])

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 px-4 mt-3">
        {[
          `${English.E140} (${English.E60})`,
          `${English.E141} ${chartInfo?.symbol}`,
          English.E133,
        ].map((item) => (
          <div key={item} className="flex flex-col gap-1">
            <span className="text-xs font-semibold !leading-5 text-neutral-primary-color text-center">
              {item}
            </span>
          </div>
        ))}
      </div>
      {isLoadingOrderBook && !isLoadingCandles ? (
        <div className="space-y-4">
          {Array.from({length: 5}).map((_, index) => (
            <div
              key={`order_loading_${index.toString()}`}
              className="h-7 w-full mt-5"
            >
              <BasicSkeleton />
            </div>
          ))}
        </div>
      ) : (
        tradesToMap?.map((trade, tradeIndex) => {
          const {amount, price, type} = trade
          const finalAmount = amount * price
          return (
            <Fragment key={`trade_${trade?.type}_${tradeIndex?.toString()}`}>
              {activeType === 'buy_sell_type' && tradeIndex === 5 && (
                <p className="text-primary-color my-8 font-medium bg-neutral-secondary-color py-3 rounded !leading-6 text-center text-2xl">
                  {Utility.numberConversion(livePrice)}{' '}
                </p>
              )}
              <div className="relative grid grid-cols-3 gap-2 last:mb-0 mb-2 mt-2 *:text-neutral-tertiary-color *:text-xs *:!leading-5 *:text-center py-1">
                <div
                  className={`absolute right-0 h-full ${type === 'buy' ? 'bg-chart-green-color' : 'bg-chart-red-color'} opacity-15`}
                  style={{
                    width: `${finalAmount > maxNumber ? 100 : (finalAmount / maxNumber) * 100}%`,
                  }}
                />
                <span
                  className={`font-semibold ${type !== 'buy' ? '!text-chart-red-color' : '!text-chart-green-color'}`}
                >
                  {Utility.numberConversion(price)}
                </span>
                <span>{amount}</span>
                <span>{Utility.numberConversion(finalAmount)}</span>
              </div>
            </Fragment>
          )
        })
      )}
    </div>
  )
}

export default memo(TradesTabComponent)
