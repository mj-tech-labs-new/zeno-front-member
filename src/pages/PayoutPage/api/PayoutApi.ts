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
    bodyParams = {...bodyParams, challenge_name}
  }
  if (payment_status !== '' && payment_status !== 'None') {
    bodyParams = {...bodyParams, payment_status}
  }

  if (toDate !== '' && toDate !== '') {
    bodyParams = {...bodyParams, toDate, fromDate}
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

const PayouApi = {getPayoutAmount, getPayoutHistory}

export default PayouApi
