import axiosClient from '~/configs/axios.config'
import { API_EMPLOYEE } from '~/shared/constants/api.constant'
import type { IApiPagination, IApiResponse } from '~/shared/models/common.model'
import type {
  IContract,
  IDraftEmployee,
  IEmployee,
  IEmployeeDocument,
  IEmployeeParams,
  IJob,
  IOptionResponse,
  IOrgEvent,
  IPersonal,
  IUploadEmployeeDocumentPayload
} from '~/shared/models/employee.model'

export const EmployeeService = {
  GetListEmployee: async (params?: IEmployeeParams): Promise<IApiResponse<IApiPagination<IEmployee>>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_URL, { params })
  },
  GetDetailEmployee: async (id?: number): Promise<IApiResponse<IEmployee>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_DETAIL_URL(id))
  },
  GetListDraftEmployee: async (params?: IEmployeeParams): Promise<IApiResponse<IApiPagination<IDraftEmployee>>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_DRAFT_URL, { params })
  },
  // Not paginated: the API returns every document of the employee
  GetEmployeeDocuments: async (userId?: number): Promise<IApiResponse<IEmployeeDocument[]>> => {
    return await axiosClient.get(API_EMPLOYEE.DOCUMENT_URL(userId))
  },
  AddEmployeeDocument: async ({
    userId,
    file,
    documentType,
    note
  }: IUploadEmployeeDocumentPayload): Promise<IApiResponse<IEmployeeDocument>> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentType', documentType)
    if (note) formData.append('note', note)
    return await axiosClient.post(API_EMPLOYEE.DOCUMENT_URL(userId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  DeleteEmployeeDocument: async (userId?: number, documentId?: number): Promise<IApiResponse<unknown>> => {
    return await axiosClient.delete(API_EMPLOYEE.DELETE_DOCUMENT_URL(userId, documentId))
  },
  // Not paginated: recent events about this person
  GetEmployeeEvents: async (userId?: number): Promise<IApiResponse<IOrgEvent[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_EVENTS_URL(userId))
  },
  GetInfoEmployeeDraft: async (id?: number): Promise<IApiResponse<IEmployee>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_INFO_EMPLOYEE_DRAFT_URL(id))
  },
  SavePersonalStep: async (payload?: IPersonal): Promise<IApiResponse<IEmployee>> => {
    return await axiosClient.post(API_EMPLOYEE.SAVE_PERSONAL_URL, payload)
  },
  GetListDepartment: async (params?: IEmployeeParams): Promise<IApiResponse<IOptionResponse[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_DEPARTMENT_URL, { params })
  },
  GetListProject: async (params?: IEmployeeParams): Promise<IApiResponse<IOptionResponse[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_PROJECT_URL, { params })
  },
  GetListJobTitle: async (params?: IEmployeeParams): Promise<IApiResponse<IOptionResponse[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_JOB_TITLE_URL, { params })
  },
  GetListJobGrade: async (params?: IEmployeeParams): Promise<IApiResponse<IOptionResponse[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_JOB_GRADE_URL, { params })
  },
  GetListManager: async (params?: IEmployeeParams): Promise<IApiResponse<IOptionResponse[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_MAMAGER_URL, { params })
  },
  GetListOffice: async (params?: IEmployeeParams): Promise<IApiResponse<IOptionResponse[]>> => {
    return await axiosClient.get(API_EMPLOYEE.GET_LIST_OFFICE_URL, { params })
  },
  SaveJobStep: async (payload?: IJob): Promise<IApiResponse<IEmployee>> => {
    return await axiosClient.post(API_EMPLOYEE.SAVE_JOB_URL, payload)
  },
  SaveContractStep: async (payload?: IContract): Promise<IApiResponse<IEmployee>> => {
    return await axiosClient.post(API_EMPLOYEE.SAVE_CONTRACT_URL, payload)
  }
}
