import {PositionHistoryApiProps} from './ChartTypes'
import {CommonProps, PaginationType} from './CommonTypes'

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
  followed_X_reward_status: boolean
  followed_X_reward_remain_sec: number
  followed_instagram_reward_status: boolean
  followed_instagram_reward_remain_sec: number
  join_telegram_community_reward_status: boolean
  join_telegram_community_reward_remain_sec: boolean
  join_telegram_group_reward_status: boolean
  join_telegram_group_reward_remain_sec: boolean
  registration_reward_status: boolean
  registration_reward_remain_sec: boolean
  subscribe_youtube_reward_status: boolean
  subscribe_youtube_reward_remain_sec: number
}

export interface RewardHistoryTypes
  extends Pick<CommonProps, '_id' | 'createdAt'> {
  user_id: number
  reward_type: string
  description: string
  earn_point: number
  balance: number
}

export interface RewardHistoryApiResponse extends PaginationType {
  history: RewardHistoryTypes[]
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
export interface LeaderBoardApiResponse extends PaginationType {
  history: LeaderBoardApiDataTypes[]
}

export type RewardHistoryApiProps = Pick<ApiPaginationProps, 'limit' | 'page'> &
  Pick<
    PositionHistoryApiProps,
    'fromDate' | 'order_type' | 'order_value' | 'toDate'
  >

export interface ChartApiData {
  daily_login_points: number
  self_purchased_points: number
  referral_points: number
  referral_purchased_points: number
  challenge_passed_points: number
  registration_points: number
  social_media_points: number
  total_month_points: number
  day: string
}

export interface DailyBonusResponse {
  lastRewardDay: number
  nextRewardDay: number
}

export interface GetDailyRewardResponse {
  point: number
}

export interface UpdateSocialMediaDataType {
  earn_point: number
}
