import { createListApiHook } from '~/hooks/use-query-api'
import { DepartmentService } from '~/services/department.service'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'

export const useGetListDepartmentApi = createListApiHook(
  QUERY_KEY.DEPARTMENT.GET_LIST,
  DepartmentService.GetListDepartment
)
