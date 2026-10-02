import type { IBaseFilterPanel, IBasePagination } from '~/shared/models/common.model'

// GET /department — DepartmentDto (API docs); only the fields the FE reads so far
export interface IDepartment {
  id?: number
  departmentCode?: string
  departmentName?: string
  parentId?: number
  parentName?: string
  headUserId?: number
  headFullName?: string
  sortOrder?: number
  enabled?: boolean
  headcount?: number
  projectCount?: number
}

// GET /department — DepartmentCriteria + paging
export interface IDepartmentParams extends IBasePagination, IBaseFilterPanel {
  enabled?: boolean
}
