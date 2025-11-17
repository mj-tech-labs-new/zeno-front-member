// eslint-disable-next-line import-x/no-cycle
import {CommonBuyAndSellProp, OpenPosition} from './ChartTypes'
import {CommonProps, GeneralProps, PaginationType} from './CommonTypes'
import {CloseOrderType} from './UnionTypes'

export interface ChallengePayoutObject {
  amount: string
  type: string
  name?: string
  capital: string
}

export interface ChallengeCardObjectType {
  mainHeading: string
  subHeading: string
  content: string[]
  isUnlock: boolean
  isActive: boolean
}

export interface PayoutProps extends ChallengePayoutObject {
  status: string
  startDate: string
}

export interface ChallengeDashboardHeaderProps {
  step: string
  createdDate: string
  createdTime: string
  updatedDate: string
  updatedTime: string
}

export interface ChallengeCompletionCardProps {
  totalAmount: number | undefined
}

export interface TradingDescriptionSectionProps
  extends Pick<GeneralProps, 'className' | 'layoutClassName'> {
  type: string
}

export interface GetChallengeTypeProps {
  step: number
  total_stage: number
}

export interface ExtendedGetChallengeTypeProps extends GetChallengeTypeProps {
  title: string
  content: string
}

export interface GetTradingCapitalProps extends CommonProps {
  challenge_name: string
  plan_status: number
  fee: number
  capital_fund: number
  step: number
  checked?: boolean
}

export interface CreateChallengeProps extends CommonProps {
  user_id: number
  status: string
  challenge_id: string
  challenge_plan_id: number
  initial_capital: number
  used_usdt_capital: number | null
  equity: number | null
  released_profit: number | null
  unreleased_profit: number | null
  payment_status: number
  challenge_type: string
  current_stage: null
  total_stage: number
  trading_day: number
}

export type ChallengeInfoDashboardProps = CreateChallengeProps & {
  wallet_amount: number
  current_usdt: number
  min_trading_day: number | null
}

export interface ChallengeInfoDashboardWithPaginationProps {
  data: ChallengeInfoDashboardProps[]
  pagination: PaginationType
}

export type CreateChallengePayload = Pick<
  CreateChallengeProps,
  'challenge_plan_id' | 'total_stage'
> & {
  step: number
}

export type ChallengeStageType = CommonProps &
  Pick<GetTradingCapitalProps, 'step'> &
  Pick<ChallengeInfoDashboardProps, 'min_trading_day'> & {
    stage: number
    leverage: number
    profit_target: number
    max_daily_loss: number
    max_total_loss: number
  }

export type GetChallengeByIdType = ChallengeInfoDashboardProps & {
  ChallengeStage: ChallengeStageType[]
  ChallengePlan: GetTradingCapitalProps[]
}

export interface TradingStatisticsType {
  total_buy_order: number
  total_sell_order: number
  total_closed_trade: number
  total_win: number
  total_loss: number
  win_rate_of_closed_trades: number
  total_profit_of_buy_trade: number
  win_rate_of_buy_order: number
  total_profit_of_sell_trade: number
  win_rate_of_sell_order: number
}

export type ChallengeIdProp = Pick<CreateChallengeProps, 'challenge_id'>

export type BuyOrSellApiProps = Pick<CreateChallengeProps, 'challenge_id'> &
  Pick<CommonBuyAndSellProp, 'leverage'> & {
    symbol?: string
    usdt_price: number
    quantity: number
    order_type: string
    order_side: string
  }

export type BuyOrSellApiType = Pick<CreateChallengeProps, 'id' | 'created_at'> &
  BuyOrSellApiProps & {
    userid: string
    total_usdt: number
    usdt_balance_before: number
    usdt_balance_after: number
    wallet_balance_before: number | null
    wallet_balance_after: number | null
    stop_loss: string
    take_profit: string
    leverage: number
    status: string
    tx_hash: string
    duration: number | null
    close_price: number | null
    current_price: number | null
    realized_pnl: number | null
    open_pnl: number | null
    close_time: number | null
    open_time: number | null
    last_close_type: number | null
  }
export interface GetClosedPnlDetailsPayloadProps
  extends Pick<CreateChallengeProps, 'challenge_id'> {
  page: number
  fromDate: string
  toDate: string
  order_type: string
  order_value: string
}

export interface ClosedPnlDataResponsePayload
  extends Pick<CommonProps, 'id'>,
    Pick<CreateChallengeProps, 'challenge_id'>,
    Pick<OpenPosition, 'open_time' | 'symbol' | 'duration' | 'quantity'>,
    Pick<CandleObjectType, 'close_time'> {
  close_price: number
  order_side: string
  open_price: number
  roe: string
  realized_pnl: number
  order_type: string
  totalPages: number
  last_close_type: string
}

export interface ClosedPnlDataResponse {
  data: ClosedPnlDataResponsePayload[]
  page: PaginationType
}
export interface CloseOrderButtonProps
  extends Pick<GeneralProps, 'className'>,
    Partial<Pick<OpenPosition, 'tx_hash'>>,
    Partial<Pick<CreateChallengeProps, 'challenge_id'>> {
  type?: CloseOrderType
  onPerformAction?: (state: boolean) => void
}

interface ChallengeDataSocketType
  extends Pick<CreateChallengeProps, 'equity' | 'unreleased_profit'>,
    Pick<ChallengeStageType, 'max_daily_loss' | 'max_total_loss'> {
  profit_target_amount: number
  max_current_loss: number
  max_daily_loss_amount: number
  daily_drawdown: number
  total_available_profit: number
  unreleased_profit_per: number
}
