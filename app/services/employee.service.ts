import axiosClient from '~/configs/axios.config'
import { API_EMPLOYEE } from '~/shared/constants/api.constant'
import type { IApiPagination, IApiResponse } from '~/shared/models/common.model'
import type {
  IAddEmployeeDocumentPayload,
  IEmployee,
  IEmployeeDocument,
  IEmployeeParams,
  IOrgEvent
} from '~/shared/models/employee.model'

export const EmployeeService = {
  GetListEmployee: async (params?: IEmployeeParams): Promise<IApiResponse<IApiPagination<IEmployee>>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_URL, { params })
  },
  GetDetailEmployee: async (id?: number): Promise<IApiResponse<IEmployee>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_DETAIL_URL(id))
  },
  // Not paginated: the API returns every document of the employee
  GetEmployeeDocuments: async (userId?: number): Promise<IApiResponse<IEmployeeDocument[]>> => {
    return await axiosClient.get(API_EMPLOYEE.DOCUMENT_URL(userId))
  },
  // The file must be uploaded first (FileService.UploadFile); this only attaches its fileUrl to the employee
  AddEmployeeDocument: async ({
    userId,
    ...payload
  }: IAddEmployeeDocumentPayload): Promise<IApiResponse<IEmployeeDocument>> => {
    return await axiosClient.post(API_EMPLOYEE.DOCUMENT_URL(userId), payload)
  },
  DeleteEmployeeDocument: async (userId?: number, documentId?: number): Promise<IApiResponse<unknown>> => {
    return await axiosClient.delete(API_EMPLOYEE.DELETE_DOCUMENT_URL(userId, documentId))
  },
  // Not paginated: recent events about this person
  GetEmployeeEvents: async (userId?: number): Promise<IApiResponse<IOrgEvent[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_EVENTS_URL(userId))
  }
}
