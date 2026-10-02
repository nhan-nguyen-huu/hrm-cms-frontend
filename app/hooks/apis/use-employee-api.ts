import { createDetailApiHook, createListApiHook } from '~/hooks/use-query-api'
import { EmployeeService } from '~/services/employee.service'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'

export const useGetListEmployeeApi = createListApiHook(QUERY_KEY.EMPLOYEE.GET_LIST, EmployeeService.GetListEmployee)
export const useGetDetailEmployeeApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_DETAIL,
  EmployeeService.GetDetailEmployee
)
// Both endpoints return a plain array (no paging), so they use the detail hook keyed by the user id
export const useGetEmployeeDocumentsApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_DOCUMENTS,
  EmployeeService.GetEmployeeDocuments
)
export const useGetEmployeeEventsApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_EVENTS,
  EmployeeService.GetEmployeeEvents
)
