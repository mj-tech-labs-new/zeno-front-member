import dayjs from 'dayjs'
import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  FundedChallengeType,
  PayoutHistoryApi,
  PayoutHistoryData,
  PayoutHistoryPayload,
} from '@/types/apiTypes/PayoutApiType'
import {PaginationType} from '@/types/CommonTypes'

const getPayoutAmount = async () =>
  new Promise<number>((resolve) => {
    APICall<{payout: number}>('get', Endpoints.getPayouts)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.payout)
        } else {
          toast.error(res?.message)
          resolve(0)
        }
      })
      .catch((e) => {
        resolve(0)
        toast.error(e?.data?.message)
      })
  })

const getPayoutHistory = async (props: PayoutHistoryPayload) => {
  const {
    challenge_name,
    toDate,
    fromDate,
    limit,
    page,
    payment_status,
    search_type,
    search_value,
  } = props

  let bodyParams: Record<string, number | string> = {
    order_value: 'createdAt',
    order_type: 'DESC',
  }
  let queryParmas: Record<string, string | number> = {limit, page}

  if (search_value !== '') {
    queryParmas = {search_type, search_value}
  }

  if (challenge_name !== '' && challenge_name !== 'None') {
    bodyParams = {
      ...bodyParams,
      challenge_name: challenge_name === 'One Step' ? 2 : 3,
    }
  }
  if (payment_status !== '' && payment_status !== 'None') {
    bodyParams = {
      ...bodyParams,
      payment_status: payment_status === 'Paid' ? 1 : 0,
    }
  }

  if (toDate !== '' && toDate && fromDate !== '' && fromDate) {
    bodyParams = {
      ...bodyParams,
      toDate: `${dayjs(toDate ?? '').format('YYYY-MM-DD')} 23:59:59`,
      fromDate: `${dayjs(fromDate ?? '').format('YYYY-MM-DD')}  00:00:00`,
    }
  }

  return new Promise<PayoutHistoryApi | null>((resolve) => {
    APICall<{payout_history: PayoutHistoryApi['data']} & PaginationType>(
      'post',
      Endpoints.getPayoutHistory,
      bodyParams,
      queryParmas
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          const paginationObject: PaginationType = {
            limit: res?.data?.limit,
            page: res?.data?.page,
            total: res?.data?.total,
            totalPages: res?.data?.totalPages,
          }
          resolve({
            data: res?.data?.payout_history ?? [],
            pagination: paginationObject,
          })
        } else {
          toast.error(res?.message)
          resolve(null)
        }
      })
      .catch((e) => {
        resolve(null)
        toast.error(e?.data?.message)
      })
  })
}

const getPayoutWalletAddress = async () =>
  new Promise<string>((resolve) => {
    APICall<Pick<PayoutHistoryData, 'wallet_address'>>(
      'get',
      Endpoints.getPayoutWallet
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.wallet_address ?? '')
        } else {
          resolve('')
        }
      })
      .catch((e) => {
        resolve('')
        toast.error(e?.data?.message)
      })
  })

const getFundedChallengesData = async () =>
  new Promise<FundedChallengeType[]>((resolve) => {
    APICall<{challenges: FundedChallengeType[]}>(
      'get',
      Endpoints.getFundedChallenges
    )
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.challenges)
        } else {
          toast.error(res?.message)
          resolve([])
        }
      })
      .catch((e) => {
        resolve([])
        toast.error(e?.data?.message)
      })
  })

const updatePayoutWallet = async (content: string) =>
  new Promise<boolean>((resolve) => {
    const payload = {wallet_address: content}
    APICall('post', Endpoints.updateWallet, payload)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(true)
        } else {
          toast.error(res?.message)
          resolve(false)
        }
      })
      .catch((e) => {
        resolve(false)
        toast.error(e?.data?.message)
      })
  })
const payoutRequest = async (challenge_id: string, amount: number) =>
  new Promise<boolean>((resolve) => {
    const payload = {challenge_id, withdraw_amount: amount}
    APICall('post', Endpoints.payoutRequest, payload)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(true)
        } else {
          toast.error(res?.message)
          resolve(false)
        }
      })
      .catch((e) => {
        resolve(false)
        toast.error(e?.data?.message)
      })
  })

const PayoutApi = {
  payoutRequest,
  updatePayoutWallet,
  getPayoutAmount,
  getPayoutHistory,
  getPayoutWalletAddress,
  getFundedChallengesData,
}

export default PayoutApi
