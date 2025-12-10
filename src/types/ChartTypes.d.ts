import {Time} from 'lightweight-charts'
import {Dispatch, SetStateAction} from 'react'

// eslint-disable-next-line import-x/no-cycle
import {
  BuyOrSellApiProps,
  ClosedPnlDataResponsePayload,
  CreateChallengeProps,
  GetClosedPnlDetailsPayloadProps,
  GetTradingCapitalProps,
} from './ChallengeTypes'
import {CommonProps, GeneralProps, PaginationType} from './CommonTypes'
import {ChartShapesType, Methodtype, TradingSortingType} from './UnionTypes'

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

export interface ChartInfoObjectType {
  symbol: string
  fullSymbolName: string
  timeframe: string
  count: number
}

export type ChartSocketHeaderProps = Pick<
  CandleObjectType,
  'change' | 'changeAmount' | 'volume' | 'high' | 'low' | 'open'
>

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
  extends Pick<
      CommonBuyAndSellProp,
      'margin_mode' | 'stop_loss' | 'take_profit'
    >,
    Pick<CreateChallengeProps, 'challenge_id'> {
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
    | 'average_price'
    | 'stop_loss'
    | 'take_profit'
    | 'challenge_id'
    | 'margin_mode'
  > {
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

export interface BuyOrSelProps
  extends Pick<CommonBuyAndSellProp, 'activeIndex'>,
    Pick<CommonBuyAndSellProp, 'margin_mode'> {}

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
  stopLoss?: Omit<StopLossProps, 'marketprice'> &
    Pick<LivePriceSocketType, 'price'>
}

export interface OrderBookObjectType {
  lastUpdateId: number
  bids: number[][]
  asks: number[][]
}
export interface EditStopLossModelProps
  extends Pick<GeneralProps, 'singleLineContent'> {
  item: (OpenPosition | PendingOrder) | null
  apiMethod?: Methodtype
}

export interface OrderHistoryApiProps extends GetClosedPnlDetailsPayloadProps {
  tp_sl?: boolean
}
export type PositionHistoryApiProps = OrderHistoryApiProps
export type TransactionDetailsApiProps = Pick<
  OrderHistoryApiProps,
  'challenge_id' | 'fromDate' | 'order_type' | 'order_value' | 'page' | 'toDate'
>

export interface OrderHistory
  extends Pick<OpenPosition, 'symbol' | 'status' | 'margin_mode' | 'quantity'>,
    Pick<CommonProps, 'created_at'>,
    Pick<GetTradingCapitalProps, 'fee'>,
    Pick<CommonBuyAndSellProp, 'leverage'> {
  average_trading_price: number
  lighten_up_only: sring
  margin_mode: number
  side: string
  transaction_value: number
  order_value: number
  order_price_1: string
  order_price_2: string
  commission_price?: number
}
export interface OrderHistoryApiResponse {
  data: OrderHistory[]
  page: PaginationType
}

export interface PositionHistory
  extends Pick<OrderHistory, 'symbol' | 'margin_mode' | 'side' | 'fee'>,
    Pick<CandleObjectType, 'open_time' | 'close_time'>,
    Pick<OpenPosition, 'quantity' | 'realized_pnl' | 'leverage'>,
    Pick<OrderHistoryApiProps, 'order_type'>,
    Pick<ClosedPnlDataResponsePayload, 'order_side'>,
    Pick<CommonBuyAndSellProp, 'stop_loss' | 'take_profit'> {
  open_price: number
  close_price: number
  total_charge_amount: number
  roe?: string
}

export interface PositionHistoryApiResponse {
  data: PositionHistory[]
  page: PaginationType
}

export interface TransactionDetailHistory
  extends Pick<
      OrderHistory,
      'fee' | 'created_at' | 'side' | 'symbol' | 'margin_mode'
    >,
    Pick<OpenPosition, 'quantity' | 'leverage'>,
    Pick<BuyOrSellApiProps, 'role'> {
  final_price: number
}

export interface TransactionDetailsHistoryResponse {
  data: TransactionDetailHistory[]
  page: PaginationType
}
