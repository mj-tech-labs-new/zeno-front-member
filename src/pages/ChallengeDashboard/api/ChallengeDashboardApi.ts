import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  BuyOrSellApiProps,
  ChallengeIdProp,
  ChallengeInfoDashboardWithPaginationProps,
  ClosedPnlDataResponse,
  GetCertificateWithPaginationProps,
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
    APICall(
      'get',
      Endpoints.getChallengeInfoDashboard(
        challengeType,
        page,
        limit,
        totalCount
      )
    )
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationObject: PaginationType = {
            limit: res?.data?.allChallenge?.limit,
            page: res?.data?.allChallenge?.page,
            total: res?.data?.allChallenge?.total,
            totalPages: res?.data?.allChallenge?.totalPages,
            totalCount: res?.data?.allChallenge?.total_all_count,
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
  new Promise<GetChallengeByIdType[]>((resolve) => {
    APICall('post', Endpoints.getChallengeById, props)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.allChallenge)
        } else {
          resolve([])
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve([])
      })
  })

const tradingStatisticsApi = async (props: ChallengeIdProp) =>
  new Promise<TradingStatisticsType | null>((resolve) => {
    APICall('post', Endpoints.tradingStatistics, props)
      .then((res: any) => {
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
    APICall('post', Endpoints.getClosedPnlDetails, apiPayload, {})
      .then((res: any) => {
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

const getCertificatesApi = async (type: string, page: number, limit: number) =>
  new Promise<GetCertificateWithPaginationProps | null>((resolve) => {
    APICall('get', Endpoints.getCertificate(type, page, limit))
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationObject: PaginationType = {
            limit: res?.data?.allChallenge?.limit,
            page: res?.data?.allChallenge?.page,
            total: res?.data?.allChallenge?.total,
            totalPages: res?.data?.allChallenge?.totalPages,
            totalCount: res?.data?.allChallenge?.total_all_count,
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
        resolve(null)
        toast.error(error?.data?.message)
      })
  })
const downloadCertificateApi = async (
  props: Pick<BuyOrSellApiProps, 'challenge_id'>
) => {
  const payload = {challenge_id: props?.challenge_id}

  return new Promise<any>((resolve) => {
    APICall('post', Endpoints.downloadCertificate, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res.data)
        } else {
          toast.error(res?.message)
          resolve(null)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })
}

export {
  challengeInfoDashboardApi,
  downloadCertificateApi,
  getCertificatesApi,
  getChallengeByIdApi,
  getClosedPnlDetails,
  tradingStatisticsApi,
}
