import {CommonProps, PaginationType} from '../CommonTypes'

export interface PayoutHistoryPayload {
  order_value: string
  order_type: string
  challenge_name: string
  payment_status: string
  fromDate: string
  toDate: string
  limit: number
  page: number
  search_value: string
  search_type: string
}

export interface FundedChallengeType extends Pick<CommonProps, '_id'> {
  challenge_id: string
  challenge_name: string
  released_profit: number | null
}

export interface PayoutHistoryData {
  payout_id: string
  challenge_id: string
  date: string
  amount: number
  payment_status: number
  payment_method: string
  wallet_address: string
  tx_hash: null | string
}

export interface PayoutHistoryApi {
  data: PayoutHistoryData[]
  pagination: PaginationType | null
}
