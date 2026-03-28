import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  ChallengePaymentPayload,
  CreateChallengeProps,
  GetTradingCapitalProps,
} from '@/types/ChallengeTypes'

const getTradingCapitalApi = async (selectedOption: number) =>
  new Promise<GetTradingCapitalProps[]>((resolve) => {
    APICall<{allChallengePlan: GetTradingCapitalProps[]}>(
      'get',
      Endpoints.getTradingCapital(selectedOption)
    )
      .then((res) => {
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
  new Promise<Pick<
    CreateChallengeProps,
    'qrDataURL' | 'transaction_id' | 'wallet_address'
  > | null>((resolve) => {
    APICall<
      Pick<
        CreateChallengeProps,
        'qrDataURL' | 'transaction_id' | 'wallet_address'
      >
    >('post', Endpoints.getPaymentQrCode, props)
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

const getCheckPaymentApi = async (
  props: Pick<CreateChallengeProps, 'transaction_id'>
) => {
  const {transaction_id} = props
  return new Promise<any>((resolve) => {
    APICall<Pick<CreateChallengeProps, 'payment_status'>>(
      'get',
      Endpoints.checkPayment(transaction_id)
    )
      .then((res) => {
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

export {getCheckPaymentApi, getPaymentQrCode, getTradingCapitalApi}
