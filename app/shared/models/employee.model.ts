import type { EContractType, EEmployeeStatus } from '~/shared/enums/common.enum'
import type { IBaseFilterPanel, IBasePagination } from '~/shared/models/common.model'

export interface IEmployee {
  employeeCode?: string
  fullName?: string
  email?: string
  primaryDepartmentName?: string
  primaryJobTitleName?: string
  createdDate?: string
  employmentStatus?: EEmployeeStatus
  contractType?: EContractType
}

export interface IEmployeeParams extends IBasePagination, IBaseFilterPanel {
  employmentStatus?: EEmployeeStatus | null
}
