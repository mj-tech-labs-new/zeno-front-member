import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  ApiPaginationProps,
  LeaderBoardApiDataTypes,
  RewardEarning,
  RewardHistoryApiProps,
  RewardHistoryTypes,
  SocialMediaStatus,
} from '@/types/Rewards'

const RewardEarning = async () =>
  new Promise<{data: RewardEarning} | null>((resolve) => {
    APICall('get', Endpoints.getRewardEarnings)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data,
          })
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })

const CheckDailyReward = async () =>
  new Promise<{data: {lastRewardDay: number}} | null>((resolve) => {
    APICall('get', Endpoints.checkDailyReward)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data,
          })
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })

const GetDailyReward = async (props: {id: number}) =>
  new Promise<{data: any} | null>((resolve) => {
    APICall('post', Endpoints.getDailyReward, {day: props?.id})
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data,
          })
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })
const SocialDataCheck = async () =>
  new Promise<{data: SocialMediaStatus} | null>((resolve) => {
    APICall('get', Endpoints.getSocialMediaCheck)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data,
          })
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })

const GetRewards = async (props: {type: number}) => {
  const payload = {
    type: props?.type,
  }

  return new Promise<any>((resolve) => {
    APICall('post', Endpoints.getRewards, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data,
          })
        } else {
          resolve(null)
          toast.error(res?.message)
        }
        toast.success(res?.message)
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })
}
const UpdateRewards = async (props: {type: number}) => {
  const payload = {
    type: props?.type,
  }

  return new Promise<{data: {earn_point: number}} | null>((resolve) => {
    APICall('post', Endpoints.rewardUpdate, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data,
          })
          toast.success(res?.message)
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })
}

const GetRewardHistory = async (props: RewardHistoryApiProps) => {
  let apiPayload: Record<string, any> = {
    order_type: props.order_type,
    order_value: props.order_value,
  }
  if (props.fromDate !== '' && props.toDate !== '') {
    apiPayload = {
      ...apiPayload,
      fromDate: props.fromDate,
      toDate: props.toDate,
    }
  }
  return new Promise<{
    pagination: ApiPaginationProps
    data: RewardHistoryTypes[]
  } | null>((resolve) => {
    APICall(
      'post',
      Endpoints.getRewardHistory(props?.page, props?.limit),
      apiPayload,
      {}
    )
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationData: ApiPaginationProps = {
            limit: res?.data?.limit,
            page: res?.data?.page,
            total: res?.data?.total,
            totalPages: res?.data?.totalPages,
          }
          resolve({pagination: paginationData, data: res?.data?.history})
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })
}

const GetLeaderBoard = async (props: RewardHistoryApiProps) => {
  let apiPayload: Record<string, any> = {
    order_type: props.order_type,
    order_value: props.order_value,
  }
  if (props.fromDate !== '' && props.toDate !== '') {
    apiPayload = {
      ...apiPayload,
      fromDate: props.fromDate,
      toDate: props.toDate,
    }
  }
  return new Promise<{
    pagination: ApiPaginationProps
    data: LeaderBoardApiDataTypes[]
  } | null>((resolve) => {
    APICall(
      'post',
      Endpoints.getLeaderBoard(props?.page, props?.limit),
      apiPayload,
      {}
    )
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationData: ApiPaginationProps = {
            limit: res?.data?.limit,
            page: res?.data?.page,
            total: res?.data?.total,
            totalPages: res?.data?.totalPages,
          }
          resolve({pagination: paginationData, data: res?.data?.history})
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })
}

const RewardApi = {
  RewardEarning,
  SocialDataCheck,
  GetRewards,
  GetLeaderBoard,
  GetRewardHistory,
  UpdateRewards,
  GetDailyReward,
  CheckDailyReward,
}
export default RewardApi
