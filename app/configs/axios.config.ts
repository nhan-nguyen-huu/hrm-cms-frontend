import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { toast } from 'sonner'
import cookieHelper from '~/helpers/cookie.helper'
import errorHelper from '~/helpers/error.helper'
import i18n from '~/lib/i18n'
import { API_AUTH } from '~/shared/constants/api.constant'
import { ELanguage } from '~/shared/enums/common.enum'

const TIMEOUT = 2 * 60 * 1000

const configs: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: TIMEOUT
}

const axiosClient: AxiosInstance = axios.create(configs)
axiosClient.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
  const authorization = cookieHelper.getAccessToken()
  request.headers.set('Accept-Language', i18n.language ?? ELanguage.En)
  if (request.url && request.url.includes(API_AUTH.REFRESH_TOKEN)) {
    request.headers.set('refresh', cookieHelper.getRefreshToken())
  }
  if (authorization) {
    request.headers.set('Authorization', `Bearer ${authorization}`)
  }
  return request
})

export const publicAxiosClient: AxiosInstance = axios.create(configs)

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error?.config
    // Error code
    const errorCode = error?.response?.data?.code

    // Message
    const errorMessage = error?.response?.data?.message || errorHelper.getDefaultErrorMessage(errorCode)

    // Errorcode - Unauthorized
    if (
      error?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest?.url?.includes(API_AUTH.LOGIN_URL) &&
      !originalRequest?.url?.includes(API_AUTH.REFRESH_TOKEN)
    ) {
      try {
        originalRequest._retry = true
        const res = await axiosClient.post(API_AUTH.REFRESH_TOKEN, { refreshToken: cookieHelper.getRefreshToken() })
        cookieHelper.setAccessToken(res?.data?.accessToken)
        cookieHelper.setRefreshToken(res?.data?.refreshToken)
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
        return axiosClient(originalRequest)
      } catch {
        cookieHelper.removeAccessToken()
        cookieHelper.removeRefreshToken()
        toast.error(errorMessage)
        window.location.href = '/'
        return Promise.reject(error?.response?.data)
      }
    }

    // Expect don't show toast
    if ([...errorHelper.getErrorExpect()].includes(errorCode)) {
      return Promise.reject(error?.response?.data)
    }

    // Last case
    toast.error(errorMessage)
    return Promise.reject(error?.response?.data)
  }
)
export default axiosClient
