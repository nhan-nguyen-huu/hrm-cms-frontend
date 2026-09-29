import { createListApiHook } from '~/hooks/use-query-api'
import { EmployeeService } from '~/services/employee.service'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'

export const useGetListEmployeeApi = createListApiHook(QUERY_KEY.EMPLOYEE.GET_LIST, EmployeeService.GetListEmployee)
