import {Time} from 'lightweight-charts'
import {Dispatch, SetStateAction} from 'react'

// eslint-disable-next-line import-x/no-cycle
import {GeneralProps} from './CommonTypes'
import {ChartShapesType, TradingSortingType} from './UnionTypes'

interface CandleObjectType {
  symbol: string
  open_time: string
  open_time_iso: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  quote_volume: number
  trades: number
  close_time: string
  close_time_iso: string
  change: string
  changeAmount: string
}

export interface ChartInfoObjectType
  extends Pick<
    CandleObjectType,
    'change' | 'changeAmount' | 'volume' | 'high' | 'low' | 'open'
  > {
  symbol: string
  fullSymbolName: string
  timeframe: string
  count: number
}

export interface ChartObjectProps {
  high: number
  low: number
  open: number
  close: number
  volume: number
}

export interface ChartSwitchProps {
  activeType: TradingSortingType
  setActiveType: (value: TradingSortingType) => void
}

// Chart Drawing Types & Props
export interface DrawingData extends Pick<CandleObjectType, 'high' | 'low'> {
  open_time_iso: Time
  close_time_iso: Time
  id: string
  selectedShape: ChartShapesType
  inputType?: string
  initialPoint?: number
  endPoint?: number
}

export interface CoordinateTypeObject {
  x: number
  y: number
}

export interface LivePriceSocketType extends Pick<CandleObjectType, 'symbol'> {
  price: number
  timestamp: string
}

export interface OpenPosition
  extends Pick<CommonBuyAndSellProp, 'stop_loss' | 'take_profit'> {
  status: string
  user_id: number
  tx_hash: string
  symbol: string
  direction: string
  open_time: string
  duration?: string
  quantity: number
  current_price: number
  realized_pnl: number
  open_pnl: number
  est_liq_price: number
  margin_ratio: number
  marginBalance: number
  return_on_equity: number
  average_price: number
  open: number
  leverage: number
}

export interface PendingOrder
  extends Pick<
      OpenPosition,
      | 'symbol'
      | 'tx_hash'
      | 'quantity'
      | 'realized_pnl'
      | 'open_pnl'
      | 'user_id'
      | 'leverage'
      | 'direction'
    >,
    Pick<OpenPosition, 'stop_loss' | 'take_profit'> {
  order_type: string
  submitted_time: string
  submitted_price: number
  position_margin: number
  distance: number
}
export interface StopLossProps {
  marketprice: number
  id: number
  status?: string
  quantity?: number
}

export interface CommonBuyAndSellProp
  extends Pick<GeneralProps, 'className'>,
    Pick<LivePriceSocketType, 'price'>,
    Pick<PendingOrder, 'order_type'> {
  checked?: boolean
  setChecked?: Dispatch<SetStateAction<boolean>>
  text?: number
  activeIndex: number
  total?: number
  quantity: number
  usdt_price?: number
  leverage?: number
  setInputValues?: () => void
  margin_mode?: string
  stop_loss?: (Pick<StopLossProps, 'id' | 'quantity' | 'status'> &
    Pick<LivePriceSocketType, 'price'>)[]
  take_profit?: (Pick<StopLossProps, 'id' | 'quantity' | 'status'> &
    Pick<LivePriceSocketType, 'price'>)[]
}

export type BuyOrSelProps = Pick<CommonBuyAndSellProp, 'activeIndex'>

export interface CommonStopLossProp {
  heading?: string
  subHeading?: string
  marketPrice?: number
  quantity?: number
  BuyOrSellType?: string
  setStopLoss: (
    value: Pick<CommonBuyAndSellProp, 'stop_loss'> &
      Pick<CommonBuyAndSellProp, 'take_profit'>
  ) => void
  resetValue?: number
  total?: number
}

export interface OrderBookObjectType {
  lastUpdateId: number
  bids: number[][]
  asks: number[][]
}
