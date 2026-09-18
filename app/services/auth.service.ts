import axiosClient from '~/configs/axios.config'
import { API_AUTH } from '~/shared/constants/api.constant'
import type { ILoginPayload, IToken } from '~/shared/models/auth.model'
import type { IApiResponse } from '~/shared/models/common.model'

export const AuthService = {
  Login: async (payload?: ILoginPayload): Promise<IApiResponse<IToken>> => {
    return await axiosClient.post(API_AUTH.LOGIN_URL, payload)
  },
  Logout: async (refreshToken?: string): Promise<IApiResponse<IToken>> => {
    return await axiosClient.post(API_AUTH.LOGOUT_URL, { refreshToken })
  }
}
