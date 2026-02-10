/* eslint-disable consistent-return */
import axios from 'axios'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {English, Utility} from '@/helpers'
import {ChartSwitchProps, OrderBookObjectType} from '@/types/ChartTypes'

import {useChartProvider} from '../context/ChartProvider'

const TradesTabComponent = ({
  activeType,
}: Pick<ChartSwitchProps, 'activeType'>) => {
  const {
    chartInfo,
    isLoadingCandles,
    livePrice,
    selectedToken,
    chartSocketData,
  } = useChartProvider()
  const wsRef = useRef<WebSocket | null>(null)
  const bufferRef = useRef<any[]>([])
  const firstURef = useRef<number | null>(null)
  const orderBookRef = useRef({
    bids: new Map<string, string>(),
    asks: new Map<string, string>(),
    lastUpdateId: 0,
  })
  const [bookings, setBookings] = useState<OrderBookObjectType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const max = useMemo(() => {
    if (!bookings) return {buy: 1, sell: 1}
    return {
      buy: Math.max(...bookings.bids.map(([p, q]) => +p * +q)),
      sell: Math.max(...bookings.asks.map(([p, q]) => +p * +q)),
    }
  }, [bookings])

  const updateUI = useCallback(() => {
    const ob = orderBookRef.current
    setBookings({
      bids: [...ob.bids.entries()].slice(0, 20),
      asks: [...ob.asks.entries()].slice(0, 20),
    })
  }, [])

  const restartEvent = useCallback(() => {
    wsRef.current = null
    bufferRef.current = []
    firstURef.current = null
    orderBookRef.current = {
      bids: new Map(),
      asks: new Map(),
      lastUpdateId: 0,
    }
  }, [])

  const applyUpdate = useCallback(
    (e: any) => {
      const ob = orderBookRef.current
      if (e.u < ob.lastUpdateId) return

      if (e.U > ob.lastUpdateId + 1) {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        return restartEvent()
      }

      e.b.forEach(([p, q]: string[]) =>
        Number(q) === 0 ? ob.bids.delete(p) : ob.bids.set(p, q)
      )

      e.a.forEach(([p, q]: string[]) =>
        Number(q) === 0 ? ob.asks.delete(p) : ob.asks.set(p, q)
      )

      ob.lastUpdateId = e.u
    },
    [restartEvent]
  )

  const syncSnapshot = useCallback(
    async (symbol: string) => {
      const res = await axios.get(
        `https://api.binance.com/api/v3/depth?symbol=${symbol}USDT&limit=2000`
      )
      if (res) {
        setIsLoading(false)
      }
      const ob = orderBookRef.current
      ob.lastUpdateId = res.data.lastUpdateId
      ob.bids = new Map(res.data.bids)
      ob.asks = new Map(res.data.asks)

      bufferRef.current
        .filter((e) => e.u > ob.lastUpdateId)
        .forEach(applyUpdate)

      bufferRef.current = []
      updateUI()
    },
    [applyUpdate, updateUI]
  )

  const tradesToMap = useMemo(() => {
    if (!bookings) return []

    const buys = bookings.bids.slice(0, 7).map(([p, q]) => ({
      price: +p,
      amount: +q,
      total: +p * +q,
      type: 'buy',
    }))

    const sells = bookings.asks.slice(0, 7).map(([p, q]) => ({
      price: +p,
      amount: +q,
      total: +p * +q,
      type: 'sell',
    }))

    if (activeType === 'buy_type') return buys
    if (activeType === 'sell_type') return sells
    return [...sells, ...buys]
  }, [activeType, bookings])

  useEffect(() => {
    if (isLoadingCandles || !chartInfo?.symbol) return
    restartEvent()

    const symbol = chartInfo.fullSymbolName.toUpperCase()
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth`
    )
    wsRef.current = ws
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data)
      bufferRef.current.push(data)

      if (!firstURef.current) {
        firstURef.current = data.U
        syncSnapshot(
          typeof selectedToken === 'string'
            ? selectedToken
            : (selectedToken?.token_symbol ?? 'BTC')
        )
        return
      }

      applyUpdate(data)
      updateUI()
    }

    return () => ws.close()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chartInfo?.fullSymbolName,
    chartInfo?.symbol,
    isLoadingCandles,
    selectedToken,
  ])

  return (
    <div className="w-full lg:w-[256px]  h-full overflow-y-auto  relative no-scrollbar">
      {isLoading ? (
        <div
          className={`absolute  h-full w-full     bg-primary-bg-color/50  backdrop-blur-xs z-[99999] `}
        >
          <div className="binanceSpin absolute   left-1/2  top-1/2 -translate-y-1/2 -translate-x-1/2 " />
        </div>
      ) : (
        <React.Fragment>
          <div className="grid grid-cols-3 mt-3 text-neutral-primary-color mb-1">
            {[English.E140, English.E105, English.E133].map((item, index) => (
              <div
                key={item}
                className={`text-xs font-semibold text-center flex ${index !== 2 ? 'justify-normal' : 'justify-center'}`}
              >
                <span>{item}</span>
                <span>
                  {index !== 1 ? `(${English.E60})` : `(${chartInfo?.symbol})`}
                </span>
              </div>
            ))}
          </div>

          {tradesToMap.map((t, i) => {
            const width =
              (t.total / (t.type === 'buy' ? max.buy : max.sell)) * 100

            return (
              <Fragment key={i}>
                {activeType === 'buy_sell_type' && i === 7 && (
                  <p
                    className={`${Utility.colorGeneratorUtility(Number(chartSocketData?.change ?? 0))} text-[22px] !leading-5 font-semibold my-5`}
                  >
                    {Utility.numberConversion(livePrice)}
                  </p>
                )}

                <div className="relative space-y-1 grid grid-cols-3 gap-7 text-xs py-1 text-neutral-tertiary-color">
                  <div
                    style={{width: `${width}%`}}
                    className={`absolute right-0 h-full transition-all duration-300 ease-linear ${
                      t.type === 'buy'
                        ? 'bg-chart-green-color'
                        : 'bg-chart-red-color'
                    } opacity-15`}
                  />

                  <span
                    className={
                      t.type === 'buy'
                        ? 'text-chart-green-color'
                        : 'text-chart-red-color'
                    }
                  >
                    {Utility.numberConversion(t.price)}
                  </span>
                  <span>{t.amount}</span>
                  <span>{Utility.numberConversion(t.total)}</span>
                </div>
              </Fragment>
            )
          })}
        </React.Fragment>
      )}
    </div>
  )
}

export default TradesTabComponent
