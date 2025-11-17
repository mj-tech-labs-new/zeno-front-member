import {toast} from 'react-toastify'

import {APICall, CommonFunction, Endpoints} from '@/services'
import {Store} from '@/store'
import {
  GetUserApiProps,
  LoginApiProps,
  RegisterApiProps,
  UpdateApiProps,
} from '@/types/apiTypes/AuthApiPayloadType'

const registerApi = async (props: RegisterApiProps) => {
  const payload = {...props}
  return new Promise<boolean>((resolve) => {
    APICall('post', Endpoints.registerUser, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 201) {
          resolve(true)

          const newPayload = {
            token: res?.data?.token,
            userData: res?.data?.user,
          }

          CommonFunction.addSliceData('addUserToken', newPayload)
        } else {
          resolve(false)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(false)
      })
  })
}

const loginApi = async (props: LoginApiProps) => {
  const payload = {...props}
  return new Promise<boolean>((resolve) => {
    APICall('post', Endpoints.loginUser, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(true)
          toast.success(res?.message)

          const newPayload = {
            token: res?.data?.token,
            userData: res?.data?.user,
          }

          CommonFunction.addSliceData('addUserToken', newPayload)
        } else {
          resolve(false)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(false)
      })
  })
}

const updateUserDataApi = async (props: UpdateApiProps) => {
  const payload = {...props}
  return new Promise<boolean>((resolve) => {
    APICall('put', Endpoints.updateUser, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(true)
          const newPayload = {
            token: Store.getState()?.userData?.user?.token,
            userData: res?.data?.user,
          }

          CommonFunction.addSliceData('addUserToken', newPayload)
        } else {
          resolve(false)
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve(false)
      })
  })
}

const getUserApi = async () =>
  new Promise<GetUserApiProps | null>((resolve) => {
    APICall('get', Endpoints.getUser)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.user)
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

export {getUserApi, loginApi, registerApi, updateUserDataApi}
