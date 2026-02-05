import {PositionHistoryApiProps} from './ChartTypes'

export interface RewardEarning {
  today_earning: string
  total_earning: string
  season1_earning: string
}

export interface SocialMediaStatus {
  registration_status: string
  followed_instagram_status: string
  followed_twitter_status: string
  join_telegram_group_status: string
  join_telegram_community_status: string
  subscribe_youtube_status: string
}

export interface RewardHistoryTypes {
  id: number
  user_id: number
  created_at: string
  reward_type: string
  description: string
  earn_point: number
  balance: number
}

export interface ApiPaginationProps {
  limit: number
  page: number
  total: number
  totalPages: number
}
export interface LeaderBoardApiDataTypes {
  owner_id: number
  owner_type: string
  name: string
  email: string
  country: string
  total_earn_point: number
  total_rewards: number
}

export type RewardHistoryApiProps = Pick<ApiPaginationProps, 'limit' | 'page'> &
  Pick<
    PositionHistoryApiProps,
    'fromDate' | 'order_type' | 'order_value' | 'toDate'
  >
