import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  BuyOrSellApiProps,
  BuyOrSellApiType,
  CloseOrderButtonProps,
} from '@/types/ChallengeTypes'

const buyOrSellApi = async (props: BuyOrSellApiProps) =>
  new Promise<{data: BuyOrSellApiType[]; isNavigateType: boolean}>(
    (resolve) => {
      APICall('post', Endpoints.buyOrSell, props)
        .then((res: any) => {
          if (res?.status === 200 && res?.statusCode === 400) {
            resolve({data: [], isNavigateType: true})
          }
          if (res?.status === 200 && res?.statusCode === 200) {
            resolve(res?.data?.buy_order)
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
      apiMethod,
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

const chartPageApi = {
  buyOrSellApi,
  closeOrderApi,
}

export default chartPageApi
