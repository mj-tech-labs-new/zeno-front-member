import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  BuyOrSellApiProps,
  BuyOrSellApiType,
  CloseOrderButtonProps,
} from '@/types/ChallengeTypes'
import {OrderHistoryApiProps, OrderHistoryApiResponse} from '@/types/ChartTypes'
import {PaginationType} from '@/types/CommonTypes'

const buyOrSellApi = async (props: BuyOrSellApiProps) =>
  new Promise<{data: BuyOrSellApiType[]; isNavigateType: boolean}>(
    (resolve) => {
      APICall('post', Endpoints.buyOrSell, props)
        .then((res: any) => {
          if (res?.status === 200 && res?.statusCode === 400) {
            resolve({data: [], isNavigateType: true})
            return
          }
          if (res?.status === 200 && res?.statusCode === 200) {
            resolve({data: res?.data?.buy_order, isNavigateType: false})
          } else {
            resolve({data: [], isNavigateType: false})
            toast.error(res?.message)
          }
        })
        .catch((error) => {
          toast.error(error?.data?.message)
          resolve({data: [], isNavigateType: false})
        })
    }
  )

const closeOrderApi = async (
  props: Omit<CloseOrderButtonProps, 'className'>
) => {
  const {challenge_id, tx_hash, type, apiMethod} = props
  return new Promise<boolean>((resolve) => {
    let payload: Record<string, string> = {
      method: type === 'all_order' ? 'all' : 'single',
    }
    if (challenge_id !== '' && challenge_id) {
      payload = {...payload, challenge_id}
    }
    if (tx_hash !== '' && tx_hash) {
      payload = {...payload, tx_hash}
    }
    APICall(
      apiMethod ?? 'put',
      apiMethod === 'delete' ? Endpoints.deleteOrder : Endpoints.closeOrder,
      {},
      payload
    )
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(true)
          toast.success(res?.data?.message)
        } else {
          toast.error(res?.data?.message)
          resolve(false)
        }
      })
      .catch((e) => {
        toast(e?.data?.message)
        resolve(false)
      })
  })
}

const orderHistoryApi = async (props: OrderHistoryApiProps) => {
  let apiPayload: Record<string, any> = {
    challenge_id: props.challenge_id,
    order_type: props.order_type,
    order_value: props.order_value,
    tp_sl: false,
  }
  if (props.fromDate !== '' && props.toDate !== '') {
    apiPayload = {
      ...apiPayload,
      fromDate: props.fromDate,
      toDate: props.toDate,
    }
  }

  return new Promise<OrderHistoryApiResponse | null>((resolve) => {
    APICall('post', Endpoints.orderHistory(props.page, 10), apiPayload, {})
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

const chartPageApi = {
  buyOrSellApi,
  closeOrderApi,
  orderHistoryApi,
}

export default chartPageApi
