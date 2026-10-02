import axiosClient from '~/configs/axios.config'
import { API_DEPARTMENT } from '~/shared/constants/api.constant'
import type { IApiPagination, IApiResponse } from '~/shared/models/common.model'
import type { IDepartment, IDepartmentParams } from '~/shared/models/department.model'

export const DepartmentService = {
  GetListDepartment: async (params?: IDepartmentParams): Promise<IApiResponse<IApiPagination<IDepartment>>> => {
    return await axiosClient.get(API_DEPARTMENT.GET_LIST_URL, { params })
  }
}
