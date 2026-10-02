export const API_AUTH = {
  LOGIN_URL: '/login',
  REFRESH_TOKEN: '/refresh-token',
  LOGOUT_URL: '/logout'
}

export const API_EMPLOYEE = {
  GET_LIST_URL: '/employee',
  GET_DETAIL_URL: (id?: number) => `/employee/${id}`,
  DOCUMENT_URL: (userId?: number) => `/employee/${userId}/document`,
  DELETE_DOCUMENT_URL: (userId?: number, documentId?: number) => `/employee/${userId}/document/${documentId}`,
  GET_EVENTS_URL: (userId?: number) => `/employee/${userId}/event`
}

export const API_PROJECT = {
  GET_LIST_URL: '/project',
  GET_DETAIL_URL: (id?: number) => `/project/${id}`,
  ALLOCATION_PREVIEW_URL: (id?: number) => `/project/${id}/allocation-preview`,
  MEMBER_URL: (id?: number) => `/project/${id}/member`
}

export const API_DEPARTMENT = {
  GET_LIST_URL: '/department'
}
