export const BASE_ROUTES = {
  CREATE: 'create',
  BASE_EDIT: 'edit',
  EDIT: ':id/edit',
  DETAIL: ':id'
}
export const ROUTES = {
  HOME: '/',
  AUTH: {
    BASE: 'auth',
    LOGIN: 'login'
  },
  DASHBOARD: {
    BASE: 'dashboard',
    EMPLOYEE_MGT: {
      BASE: 'employee-mgt',
      EMPLOYEE_PROFILE: 'employee-profile'
    }
  }
}
