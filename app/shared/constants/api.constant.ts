export const API_AUTH = {
  LOGIN_URL: '/login',
  REFRESH_TOKEN: '/refresh-token',
  LOGOUT_URL: '/logout'
}

export const API_EMPLOYEE = {
  GET_LIST_URL: '/employee',
  GET_LIST_DRAFT_URL: '/employee/draft',
  GET_DETAIL_URL: (id?: number) => `/employee/${id}`,
  DOCUMENT_URL: (userId?: number) => `/employee/${userId}/document`,
  DELETE_DOCUMENT_URL: (userId?: number, documentId?: number) => `/employee/${userId}/document/${documentId}`,
  GET_EVENTS_URL: (userId?: number) => `/employee/${userId}/event`
}
