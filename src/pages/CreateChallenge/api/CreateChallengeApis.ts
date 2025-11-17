import {toast} from 'react-toastify'

import {APICall, Endpoints} from '@/services'
import {
  CreateChallengePayload,
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

const createChallengeApi = async (props: CreateChallengePayload) =>
  new Promise<CreateChallengeProps[]>((resolve) => {
    APICall('post', Endpoints.createChallenge, props)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.allChallengeStage)
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

export {createChallengeApi, getChallengeTypeApi, getTradingCapitalApi}
