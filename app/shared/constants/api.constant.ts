export const API_AUTH = {
  LOGIN_URL: '/login',
  REFRESH_TOKEN: '/refresh-token',
  LOGOUT_URL: '/logout'
}

export const API_FILE = {
  UPLOAD_URL: '/file/upload'
}

export const API_EMPLOYEE = {
  GET_LIST_URL: '/employee',
  GET_LIST_DRAFT_URL: '/employee/draft',
  GET_DETAIL_URL: (id?: number) => `/employee/${id}`,
  DOCUMENT_URL: (userId?: number) => `/employee/${userId}/document`,
  DELETE_DOCUMENT_URL: (userId?: number, documentId?: number) => `/employee/${userId}/document/${documentId}`,
  GET_EVENTS_URL: (userId?: number) => `/employee/${userId}/event`,
  GET_INFO_EMPLOYEE_DRAFT_URL: (id?: number) => `/employee/draft/${id}`,
  SAVE_PERSONAL_URL: '/employee/draft/step/personal',
  SAVE_JOB_URL: '/employee/draft/step/job',
  SAVE_CONTRACT_URL: '/employee/draft/step/contract',
  SAVE_ACCOUNT_URL: '/employee/draft/step/account',
  CREATE_EMPLOYEE_URL: '/employee/draft/submit',
  GET_LIST_DEPARTMENT_URL: '/employee/draft/department/option',
  GET_LIST_PROJECT_URL: '/employee/draft/project/option',
  GET_LIST_JOB_TITLE_URL: '/employee/draft/job-title/option',
  GET_LIST_JOB_GRADE_URL: '/employee/draft/job-grade/option',
  GET_LIST_OFFICE_URL: '/employee/draft/office/option',
  GET_LIST_MAMAGER_URL: '/employee/draft/line-manager/option'
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
