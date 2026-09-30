export const API_AUTH = {
  LOGIN_URL: '/login',
  REFRESH_TOKEN: '/refresh-token',
  LOGOUT_URL: '/logout'
}

export const API_EMPLOYEE = {
  GET_LIST_URL: '/employee',
  GET_DETAIL_URL: (id?: number) => `/employee/${id}`
}
