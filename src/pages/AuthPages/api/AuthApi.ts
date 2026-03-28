import {toast} from 'react-toastify'

import {APICall, CommonFunction, Endpoints} from '@/services'
import {Store} from '@/store'
import {
  ForgotPasswordApiProps,
  GetUserApiProps,
  LoginApiProps,
  LoginApiResponseProp,
  RegisterApiProps,
  RegistrationApiResponse,
  SetNewPasswordApiProps,
  UpdateApiProps,
  VerifyOtpProps,
  VerifyOtpResponseProps,
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
  const header = {Authorization: props?.token}
  return new Promise<string | null>((resolve) => {
    APICall<RegistrationApiResponse>(
      'post',
      Endpoints.registerUser,
      payload,
      {},
      header
    )
      .then((res) => {
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
  return new Promise<string>((resolve) => {
    APICall<LoginApiResponseProp>('post', Endpoints.loginUser, payload)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.data?.token)
          const newPayload = {
            token: res?.data?.token,
            userData: res?.data?.user,
            loggedIn: Date.now(),
          }

          CommonFunction.addSliceData('addUserToken', newPayload)
        } else {
          resolve('')
          toast.error(res?.message)
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message)
        resolve('')
      })
  })
}

const updateUserDataApi = async (props: UpdateApiProps) => {
  const payload = {...props}
  return new Promise<boolean>((resolve) => {
    APICall('put', Endpoints.updateUser, payload)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          toast.success(res?.message)
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
    APICall<{user: GetUserApiProps}>('get', Endpoints.getUser)
      .then((res) => {
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
const forgotPasswordApi = async (props: ForgotPasswordApiProps) => {
  const payload = {...props}
  return new Promise<Required<Pick<ForgotPasswordApiProps, 'token'>> | null>(
    (resolve) => {
      APICall<Required<Pick<ForgotPasswordApiProps, 'token'>>>(
        'post',
        Endpoints.forgotPassword,
        payload
      )
        .then((res) => {
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
    }
  )
}
const setNewPasswordApi = async (props: SetNewPasswordApiProps) => {
  const payload = {otp: props?.otp, new_password: props?.new_password}
  const header = {Authorization: `Bearer ${props?.token}`}
  return new Promise<number | null>((resolve) => {
    APICall('post', Endpoints.setNewPassword, payload, {}, header)
      .then((res) => {
        if (res?.status === 200 && res?.statusCode === 200) {
          resolve(res?.status)
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
  const header = {Authorization: `Bearer ${props?.token}`}
  return new Promise<any>((resolve) => {
    APICall<VerifyOtpResponseProps>(
      'post',
      Endpoints.verifyOtp,
      payload,
      {},
      header
    )
      .then((res) => {
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
