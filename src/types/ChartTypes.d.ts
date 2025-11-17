import {Time} from 'lightweight-charts'

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

export interface OpenPosition {
  status: string
  user_id: string
  tx_hash: string
  symbol: string
  direction: string
  open_time: string
  duration?: string
  quantity: number
  open_price?: number
  current_price: number
  take_profit: string
  stop_loss: string
  realized_pnl: number
  open_pnl: string
}

export interface PendingOrder
  extends Pick<
    OpenPosition,
    | 'symbol'
    | 'tx_hash'
    | 'quantity'
    | 'take_profit'
    | 'stop_loss'
    | 'realized_pnl'
    | 'open_pnl'
    | 'user_id'
  > {
  order_type: string
  submitted_time: string
  submitted_price: number
  Expiraton?: string
  distance: number
}

export interface CommonBuyAndSellProp
  extends Pick<GeneralProps, 'className'>,
    Pick<LivePriceSocketType, 'price'>,
    Pick<PendingOrder, 'order_type'> {
  text?: number
  activeIndex: number
  total?: number
  quantity: number
  usdt_price?: number
  leverage?: string
}

export type BuyOrSelProps = Pick<CommonBuyAndSellProp, 'activeIndex'>

export interface CommonStopLossProp {
  heading?: string
  subHeading?: string
}
