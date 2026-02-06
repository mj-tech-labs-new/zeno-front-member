import {PositionHistoryApiProps} from './ChartTypes'

export interface RewardEarning {
  today_earning: string
  total_earning: string
  season1_earning: string
}

export interface SocialMediaStatus {
  registration_status: string
  registration_date: string
  followed_instagram_status: string
  followed_instagram_date: string
  followed_X_status: string
  followed_X_date: string
  join_telegram_group_status: string
  join_telegram_group_date: string
  join_telegram_community_status: string
  join_telegram_community_date: string
  subscribe_youtube_status: string
  subscribe_youtube_date: string
  server_time: string
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

export interface ChartApiData {
  month: number
  daily_login_points: number
  self_purchased_points: number
  refferal_points: number
  refferal_purchased_points: number
  challenge_passed_points: number
  registration_points: number
  social_media_points: number
  total_month_points: number
}
