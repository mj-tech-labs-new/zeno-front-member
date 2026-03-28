import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  ChallengeIdProp,
  ChallengeInfoDashboardResponseType,
  ChallengeInfoDashboardWithPaginationProps,
  ClosedPnlDataResponse,
  ClosedPnlResponse,
  CreateChallengeProps,
  GetChallengeByIdType,
  GetClosedPnlDetailsPayloadProps,
  TradingStatisticsType,
} from '@/types/ChallengeTypes'
import {PaginationType} from '@/types/CommonTypes'

const challengeInfoDashboardApi = async (
  challengeType: string,
  page: number,
  limit: number,
  totalCount: number
) =>
  new Promise<ChallengeInfoDashboardWithPaginationProps | null>((resolve) => {
    APICall<ChallengeInfoDashboardResponseType>(
      'get',
      Endpoints.getChallengeInfoDashboard(
        challengeType,
        page,
        limit,
        totalCount
      )
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationObject: PaginationType = {
            limit: res?.data?.allChallenge?.limit,
            page: res?.data?.allChallenge?.page,
            total: res?.data?.allChallenge?.total,
            totalPages: res?.data?.allChallenge?.totalPages,
            total_all_count: res?.data?.allChallenge?.total_all_count,
          }
          resolve({
            data: res?.data?.allChallenge?.data,
            pagination: paginationObject,
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

const getChallengeByIdApi = async (props: ChallengeIdProp) =>
  new Promise<GetChallengeByIdType | null>((resolve) => {
    APICall<{allChallenge: GetChallengeByIdType}>(
      'post',
      Endpoints.getChallengeById,
      props
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.allChallenge)
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

const tradingStatisticsApi = async (props: ChallengeIdProp) =>
  new Promise<TradingStatisticsType | null>((resolve) => {
    APICall<TradingStatisticsType>('post', Endpoints.tradingStatistics, props)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data)
        } else {
          resolve(null)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        resolve(null)
        toast.error(error?.data?.message)
      })
  })

const getClosedPnlDetails = async (props: GetClosedPnlDetailsPayloadProps) => {
  let apiPayload: Record<string, string | number> = {
    challenge_id: props.challenge_id,
    limit: 10,
    page: props.page,
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

  return new Promise<ClosedPnlDataResponse | null>((resolve) => {
    APICall<ClosedPnlResponse>(
      'post',
      Endpoints.getClosedPnlDetails,
      apiPayload,
      {}
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationObject: PaginationType = {
            limit: res?.data?.limit,
            page: res?.data?.page,
            total: res?.data?.total,
            totalPages: res?.data?.totalPages,
          }
          resolve({data: res?.data?.data, page: paginationObject})
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

const getTotalEaringsData = async (challengeId: string) => {
  const payload = {challenge_id: challengeId}
  return new Promise<string>((resolve) => {
    APICall<{payout: Pick<CreateChallengeProps, 'released_profit'>}>(
      'post',
      Endpoints.getTotalCurrentEarnings,
      payload
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.payout?.released_profit?.toString() ?? '')
        } else {
          resolve('')
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        resolve('')
        toast.error(error?.data?.message)
      })
  })
}

export {
  challengeInfoDashboardApi,
  getChallengeByIdApi,
  getClosedPnlDetails,
  getTotalEaringsData,
  tradingStatisticsApi,
}
