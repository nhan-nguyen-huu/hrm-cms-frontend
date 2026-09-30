import type { EContractType, EEmployeeStatus } from '~/shared/enums/common.enum'
import type { IBaseFilterPanel, IBasePagination } from '~/shared/models/common.model'

export interface IAssignment {
  id?: number
  departmentId?: number
  departmentName?: string
  jobTitleId?: number
  jobTitleName?: string
  lineManagerId?: number
  lineManagerFullName?: string
  primary?: boolean
  startDate?: string
  endDate?: string
}
export interface IEmployee {
  employeeCode?: string
  fullName?: string
  email?: string
  primaryDepartmentName?: string
  primaryJobTitleName?: string
  createdDate?: string
  employmentStatus?: EEmployeeStatus
  contractType?: EContractType
  avatar?: string
  assignments?: IAssignment[]
}

export interface IEmployeeParams extends IBasePagination, IBaseFilterPanel {
  employmentStatus?: EEmployeeStatus | null
}
