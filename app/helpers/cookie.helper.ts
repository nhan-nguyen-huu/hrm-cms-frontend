import Cookies from 'js-cookie'

const COOKIE_KEYS = {
  ACCESS_TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken'
} as const

const cookieHelper = {
  setValueIntoKey(key: string, value: string, expires?: number | Date) {
    Cookies.set(key, value, { expires })
  },
  getValueFromKey(key: string) {
    return Cookies.get(key) ?? ''
  },
  setAccessToken(token: string) {
    this.setValueIntoKey(COOKIE_KEYS.ACCESS_TOKEN, token)
  },
  setRefreshToken(refreshToken: string) {
    this.setValueIntoKey(COOKIE_KEYS.REFRESH_TOKEN, refreshToken)
  },
  getAccessToken() {
    return this.getValueFromKey(COOKIE_KEYS.ACCESS_TOKEN)
  },
  getRefreshToken() {
    return this.getValueFromKey(COOKIE_KEYS.REFRESH_TOKEN)
  },
  removeAccessToken() {
    Cookies.remove(COOKIE_KEYS.ACCESS_TOKEN)
  },
  removeRefreshToken() {
    Cookies.remove(COOKIE_KEYS.REFRESH_TOKEN)
  }
}

export default cookieHelper
