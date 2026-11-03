import { createDetailApiHook, createListApiHook } from '~/hooks/use-query-api'
import { EmployeeService } from '~/services/employee.service'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'
import type { IEmployeeParams } from '~/shared/models/employee.model'

export const useGetListEmployeeApi = createListApiHook(QUERY_KEY.EMPLOYEE.GET_LIST, EmployeeService.GetListEmployee)
export const useGetListDraftEmployeeApi = createListApiHook(
  QUERY_KEY.EMPLOYEE.GET_LIST_DRAFT,
  EmployeeService.GetListDraftEmployee
)

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

export const useGetInfoEmployeeDraftApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_INFO_EMPLOYEE_DRAFT,
  EmployeeService.GetInfoEmployeeDraft
)

export const useGetListDepartmentApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_LIST_DEPARTMENT,
  (_id, params?: IEmployeeParams) => EmployeeService.GetListDepartment(params)
)
export const useGetListProjectApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_LIST_PROJECT,
  (_id, params?: IEmployeeParams) => EmployeeService.GetListProject(params)
)
export const useGetListJobTitleApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_LIST_JOB_TITLE,
  (_id, params?: IEmployeeParams) => EmployeeService.GetListJobTitle(params)
)
export const useGetListJobGradeApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_LIST_JOB_GRADE,
  (_id, params?: IEmployeeParams) => EmployeeService.GetListJobGrade(params)
)
export const useGetListManagerApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_LIST_MANAGER,
  (_id, params?: IEmployeeParams) => EmployeeService.GetListManager(params)
)
export const useGetListOfficeApi = createDetailApiHook(
  QUERY_KEY.EMPLOYEE.GET_LIST_OFFICE,
  (_id, params?: IEmployeeParams) => EmployeeService.GetListOffice(params)
)
