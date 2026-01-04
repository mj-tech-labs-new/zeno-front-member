import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  ChallengePaymentPayload,
  CreateChallengeProps,
  GetChallengeTypeProps,
  GetTradingCapitalProps,
} from '@/types/ChallengeTypes'

const getChallengeTypeApi = async () =>
  new Promise<GetChallengeTypeProps[]>((resolve) => {
    APICall('get', Endpoints.getChallengeType)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data.allChallengeStage)
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

const getTradingCapitalApi = async (selectedOption: number) =>
  new Promise<GetTradingCapitalProps[]>((resolve) => {
    APICall('get', Endpoints.getTradingCapital(selectedOption))
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.allChallengePlan)
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

const getPaymentQrCode = async (props: ChallengePaymentPayload) =>
  new Promise<CreateChallengeProps | null>((resolve) => {
    APICall('post', Endpoints.getPaymentQrCode, props)
      .then((res: any) => {
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
const getCheckPaymentApi = async (
  props: Pick<CreateChallengeProps, 'transaction_id'>
) => {
  const {transaction_id} = props
  return new Promise<any>((resolve) => {
    APICall('get', Endpoints.checkPayment(transaction_id))
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res)
        }
        resolve(null)
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(null)
      })
  })
}

export {
  getChallengeTypeApi,
  getCheckPaymentApi,
  getPaymentQrCode,
  getTradingCapitalApi,
}
