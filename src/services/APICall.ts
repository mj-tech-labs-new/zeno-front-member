import axios, {AxiosRequestConfig} from 'axios'

import {Store} from '@/store'
import {Methodtype} from '@/types/UnionTypes'

import CommonFunction from './CommonFunction'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})
axiosInstance.interceptors.request.use(
  (config) => {
    const tempConfig = config
    const token = Store.getState()?.userData?.user?.token
    config.headers = {
      // eslint-disable-next-line @typescript-eslint/no-misused-spread
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    } as any
    return tempConfig
  },
  async (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => Promise.reject(error)
)

const APICall = async (
  method: Methodtype,
  url: string,
  body?: any,
  params?: Record<string, any>
) => {
  const config: AxiosRequestConfig = {}

  if (method) {
    config.method = method
  }
  if (url) {
    config.url = url
  }
  if (body) {
    config.data = body
  }
  if (params) {
    config.params = params
  }

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((res) =>
        resolve({
          data: res?.data?.data,
          status: res?.status,
          message: res?.data?.message,
          statusCode: res?.data?.code,
        })
      )
      .catch((error) => {
        if (error?.status === 401) {
          CommonFunction.addSliceData('logout', {})
          return
        }
        if (
          error.status === 422 ||
          error?.response?.status === 422 ||
          error.status === 429 ||
          error?.response?.status === 429 ||
          error?.response?.status === 500 ||
          error?.response?.status === 504 ||
          error?.status === 500 ||
          error?.response?.status === 400 ||
          error?.status === 400 ||
          error?.response?.status === 502 ||
          error?.status === 502 ||
          error?.status === 405 ||
          error?.code === 'ERR_NETWORK' ||
          error?.code === 'ECONNABORTED'
        ) {
          const errorData = {
            ...error,
            status: 500,
            data: {
              message: 'Backend Team is Resolving the Issue, Stay Tuned....',
            },
          }
          // eslint-disable-next-line no-void, consistent-return
          return void reject(errorData ?? errorData?.response)
        }
      })
  })
}

export default APICall
