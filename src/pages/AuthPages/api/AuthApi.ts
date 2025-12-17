import {toast} from 'react-toastify'

import {APICall, CommonFunction, Endpoints} from '@/services'
import {Store} from '@/store'
import {
  forgotPasswordApiProps,
  GetUserApiProps,
  LoginApiProps,
  RegisterApiProps,
  SetNewPasswordApiProps,
  UpdateApiProps,
  VerifyOtpProps,
} from '@/types/apiTypes/AuthApiPayloadType'

const registerApi = async (props: RegisterApiProps) => {
  let payload: Record<string, number | string> = {
    name: props?.name,
    email: props?.email,
    password: props?.password,
    user_signup_type: props?.user_signup_type,
  }
  if (props?.referral_code !== '' && props?.referral_code) {
    payload = {...payload, referral_code: props?.referral_code}
  }
  const header = {Authorization: `${props?.token}`}
  return new Promise<string | null>((resolve) => {
    APICall('post', Endpoints.registerUser, payload, {}, header)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 201) {
          resolve(res?.data?.token)
          toast.success(res?.message)
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

const loginApi = async (props: LoginApiProps) => {
  const payload = {...props}
  return new Promise<boolean>((resolve) => {
    APICall('post', Endpoints.loginUser, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(true)
          const newPayload = {
            token: res?.data?.token,
            userData: res?.data?.user,
            loggedIn: Date.now(),
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
            loggedIn: Store.getState()?.userData?.user?.loggedIn,
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
const forgotPasswordApi = async (props: forgotPasswordApiProps) => {
  const payload = {...props}
  return new Promise<forgotPasswordApiProps | null>((resolve) => {
    APICall('post', Endpoints.forgotPassword, payload)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data)
          toast.success(res?.message)
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
const setNewPasswordApi = async (props: SetNewPasswordApiProps) => {
  const payload = {otp: props?.otp, new_password: props?.new_password}
  const header = {Authorization: `${props?.token}`}
  return new Promise<any>((resolve) => {
    APICall('post', Endpoints.setNewPassword, payload, {}, header)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res)
          toast.success(res?.message)
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

const verifyOtpApi = async (props: VerifyOtpProps) => {
  const payload = {otp: props?.otp}
  const header = {Authorization: `${props?.token}`}
  return new Promise<any>((resolve) => {
    APICall('post', Endpoints.verifyOtp, payload, {}, header)
      .then((res: any) => {
        if (res?.status === 200 && res?.statusCode === 201) {
          const newPayload = {
            token: res?.data?.token,
            userData: res?.data?.user,
            loggedIn: Date.now(),
          }

          CommonFunction.addSliceData('addUserToken', newPayload)
          resolve(res)
          toast.success(res?.message)
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

export {
  forgotPasswordApi,
  getUserApi,
  loginApi,
  registerApi,
  setNewPasswordApi,
  updateUserDataApi,
  verifyOtpApi,
}
