import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  ApiPaginationProps,
  ChartApiData,
  DailyBonusResponse,
  GetDailyRewardResponse,
  LeaderBoardApiDataTypes,
  LeaderBoardApiResponse,
  RewardEarning,
  RewardHistoryApiProps,
  RewardHistoryApiResponse,
  RewardHistoryTypes,
  SocialMediaStatus,
  UpdateSocialMediaDataType,
} from '@/types/Rewards'

const RewardEarning = async () =>
  new Promise<{data: RewardEarning} | null>((resolve) => {
    APICall<{data: RewardEarning}>('get', Endpoints.getRewardEarnings)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data)
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
  new Promise<{
    data: DailyBonusResponse
  } | null>((resolve) => {
    APICall<DailyBonusResponse>('get', Endpoints.checkDailyReward)
      .then((res) => {
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
  new Promise<GetDailyRewardResponse | null>((resolve) => {
    APICall<GetDailyRewardResponse>('post', Endpoints.getDailyReward, {
      day: props?.id,
    })
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data)
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
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data?.all_status,
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

  return new Promise<{data: UpdateSocialMediaDataType} | null>((resolve) => {
    APICall<UpdateSocialMediaDataType>('post', Endpoints.getRewards, payload)
      .then((res) => {
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
}
const UpdateRewards = async (props: {type: number}) => {
  const payload = {
    type: props?.type,
  }

  return new Promise<{data: UpdateSocialMediaDataType} | null>((resolve) => {
    APICall<UpdateSocialMediaDataType>('post', Endpoints.rewardUpdate, payload)
      .then((res) => {
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
}

const GetChartRewardStats = async (props: {year: number; month: number}) =>
  new Promise<{data: ChartApiData[]} | null>((resolve) => {
    APICall<{chartData: ChartApiData[]}>(
      'post',
      Endpoints.rewardStatusBarChart,
      {
        year: props?.year,
        month: props?.month,
      }
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve({
            data: res?.data?.chartData,
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

const GetRewardHistory = async (props: RewardHistoryApiProps) => {
  let apiPayload: Record<string, any> = {
    order_type: 'DESC',
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
    APICall<RewardHistoryApiResponse>(
      'post',
      Endpoints.getRewardHistory(props?.page, props?.limit),
      apiPayload,
      {}
    )
      .then((res) => {
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

const getTotalRewardHistory = async () => {
  const payload = {
    order_value: 'created_at',
    order_type: 'ASC',
  }
  return new Promise<RewardHistoryTypes[]>((resolve) => {
    APICall<RewardHistoryApiResponse>(
      'post',
      Endpoints.getAllRewardExport,
      payload
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.history)
        } else {
          toast.error(res?.message)
          resolve([])
        }
      })
      .catch((e) => {
        toast.error(e?.data?.message)
        resolve([])
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
    APICall<LeaderBoardApiResponse>(
      'post',
      Endpoints.getLeaderBoard(props?.page, props?.limit),
      apiPayload,
      {}
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationData: ApiPaginationProps = {
            limit: res?.data?.limit,
            page: res?.data?.page,
            total: res?.data?.total,
            totalPages: res?.data?.totalPages,
          }
          resolve({
            pagination: paginationData,
            data: res?.data?.history,
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
  GetChartRewardStats,
  getTotalRewardHistory,
}
export default RewardApi
