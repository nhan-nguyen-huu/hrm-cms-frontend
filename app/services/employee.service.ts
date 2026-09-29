import axiosClient from '~/configs/axios.config'
import { API_EMPLOYEE } from '~/shared/constants/api.constant'
import type { IApiPagination, IApiResponse } from '~/shared/models/common.model'
import type { IEmployee, IEmployeeParams } from '~/shared/models/employee.model'

export const EmployeeService = {
  GetListEmployee: async (params?: IEmployeeParams): Promise<IApiResponse<IApiPagination<IEmployee>>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_URL, { params })
  }
}
