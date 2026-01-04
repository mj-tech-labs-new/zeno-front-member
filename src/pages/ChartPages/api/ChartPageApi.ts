import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  BuyOrSellApiProps,
  BuyOrSellApiType,
  CloseOrderButtonProps,
} from '@/types/ChallengeTypes'
import {
  OrderHistoryApiProps,
  OrderHistoryApiResponse,
  PositionHistoryApiProps,
  PositionHistoryApiResponse,
  ReverceOrderApiProps,
  TransactionDetailsApiProps,
  TransactionDetailsHistoryResponse,
} from '@/types/ChartTypes'
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

const OpenHistoryApi = async (props: OrderHistoryApiProps) => {
  let apiPayload: Record<string, any> = {
    challenge_id: props.challenge_id,
    order_type: props.order_type,
    order_value: props.order_value,
    tp_sl: props.tp_sl,
  }
  if (props.fromDate !== '' && props.toDate !== '') {
    apiPayload = {
      ...apiPayload,
      fromDate: props.fromDate,
      toDate: props.toDate,
    }
  }

  return new Promise<OrderHistoryApiResponse | null>((resolve) => {
    APICall('post', Endpoints.openHistory(props.page, 10), apiPayload, {})
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

const PositionHistoryApi = async (props: PositionHistoryApiProps) => {
  let apiPayload: Record<string, any> = {
    challenge_id: props.challenge_id,
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

  return new Promise<PositionHistoryApiResponse | null>((resolve) => {
    APICall('post', Endpoints.pendingHistory(props.page, 10), apiPayload, {})
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

const TransactionDetailsHistoryApi = async (
  props: TransactionDetailsApiProps
) => {
  let apiPayload: Record<string, any> = {
    challenge_id: props.challenge_id,
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

  return new Promise<TransactionDetailsHistoryResponse | null>((resolve) => {
    APICall(
      'post',
      Endpoints.transactionDetailHistory(props.page, 10),
      apiPayload,
      {}
    )
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

const ReverceOrderApi = async (props: ReverceOrderApiProps) => {
  const queryPayload = {
    method: props?.method,
    tx_hash: props?.tx_hash,
    challenge_id: props?.challenge_id,
  }
  return new Promise<any>((resolve) => {
    APICall('post', Endpoints.reverseOrder, {}, queryPayload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          toast.success(res?.message)
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
  OpenHistoryApi,
  PositionHistoryApi,
  TransactionDetailsHistoryApi,
  ReverceOrderApi,
}

export default chartPageApi
