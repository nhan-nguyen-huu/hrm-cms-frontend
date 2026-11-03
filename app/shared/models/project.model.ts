import type { EProjectStatus } from '~/shared/enums/common.enum'
import type { IBaseFilterPanel, IBasePagination } from '~/shared/models/common.model'

// GET /project — ProjectDto (API docs)
export interface IProject {
  id?: number
  projectCode?: string
  projectName?: string
  departmentId?: number
  departmentName?: string
  managerUserId?: number
  managerFullName?: string
  // ISO dates (YYYY-MM-DD)
  startDate?: string
  endDate?: string
  status?: EProjectStatus
  // "Sắp kết thúc": running with an end date inside sixty days, derived by BE
  endingSoon?: boolean
  objective?: string
  // Participations, not headcount — one employee can be split across several projects
  memberCount?: number
}

// GET /project — ProjectCriteria + paging
export interface IProjectParams extends IBasePagination, IBaseFilterPanel {
  departmentId?: number
  status?: EProjectStatus
}

// ProjectMemberDto (API docs)
export interface IProjectMember {
  // Membership id
  id?: number
  userId?: number
  fullName?: string
  employeeCode?: string
  // Role inside this project (free text, e.g. "Backend", "QA")
  projectRole?: string
  // % of this member's time allocated to this project
  allocationPercent?: number
  // ISO date (YYYY-MM-DD)
  joinedFrom?: string
}

// GET /project/{id} — ProjectDetailDto (API docs)
export interface IProjectDetail extends IProject {
  members?: IProjectMember[]
  // Sum of the members' allocation in whole-person terms (FTE), e.g. 4.2
  totalAllocation?: number
}

// POST /project/{id}/member — ProjectMemberForm (API docs)
export interface IProjectMemberPayload {
  userId?: number
  projectRole?: string
  allocationPercent?: number
  // ISO date (YYYY-MM-DD)
  joinedFrom?: string
  // Required by BE (PRJ_007) when the share takes the person past 100%
  overAllocationAcknowledged?: boolean
  overAllocationReason?: string
}

// GET /project/{id}/allocation-preview — query params
export interface IAllocationPreviewParams {
  userId?: number
  allocationPercent?: number
}

// AllocationLineDto (API docs): a project already taking a share of the person's time
export interface IAllocationLine {
  projectId?: number
  projectCode?: string
  projectName?: string
  allocationPercent?: number
}

// GET /project/{id}/allocation-preview — AllocationWarningDto (API docs)
export interface IAllocationWarning {
  userId?: number
  fullName?: string
  // Sum across every live project, including the one being proposed
  totalPercent?: number
  overAllocated?: boolean
  // Excludes the project being proposed
  lines?: IAllocationLine[]
}

// One row of the allocation check in the "add member" dialog
export interface IAllocationCheckRow {
  key: string
  label: string
  allocation: number
  // The project the member is being added to
  isCurrent?: boolean
}
