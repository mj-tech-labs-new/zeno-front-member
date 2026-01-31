import dayjs from 'dayjs'
import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {PayoutHistoryPayload} from '@/types/apiTypes/PayoutApiType'

const getPayoutAmount = async () =>
  new Promise<number>((resolve) => {
    APICall('get', Endpoints.getPayouts)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.payout?.[0]?.total_payout)
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
    order_value: 'created_at',
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
      toDate: dayjs(toDate).format('YYYY-MM-DD'),
      fromDate: dayjs(fromDate).format('YYYY-MM-DD'),
    }
  }

  return new Promise<boolean>((resolve) => {
    APICall('post', Endpoints.getPayoutHistory, bodyParams, queryParmas)
      .then((res: any) => {
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
}

const getPayoutWalletAddress = async () =>
  new Promise<string>((resolve) => {
    APICall('post', Endpoints.getPayoutWallet)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.wallet ?? '')
        } else {
          toast.error(res?.message)
          resolve('')
        }
      })
      .catch((e) => {
        resolve('')
        toast.error(e?.data?.message)
      })
  })

const getFundedChallengesData = async () =>
  new Promise<boolean>((resolve) => {
    APICall('post', Endpoints.getFundedChallenges)
      .then((res: any) => {
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
  getPayoutAmount,
  getPayoutHistory,
  getPayoutWalletAddress,
  getFundedChallengesData,
}

export default PayoutApi
