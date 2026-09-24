import type { EDepartment, EProjectStatus } from '~/shared/enums/common.enum'

// Same shape as an employee row of employee-profile, so it renders with EmployeeInfo
export interface IProjectManager {
  code?: string
  name?: string
  email?: string
  avatarUrl?: string
}

export interface IProject {
  id?: string
  name?: string
  code?: string
  department?: EDepartment
  projectManager?: IProjectManager
  // Participations, not headcount — one employee can be split across several projects
  memberCount?: number
  // Month precision, format MM/YYYY
  startMonth?: string
  endMonth?: string
  status?: EProjectStatus
}

export interface IProjectMember {
  id?: string
  code?: string
  name?: string
  email?: string
  jobTitle?: string
  avatarUrl?: string
  // Role inside this project (free text from BE, e.g. "Backend", "QA")
  role?: string
  // % of this member's time allocated to this project
  allocation?: number
  // % allocated across all projects — over 100 means the member is over-allocated
  totalAllocation?: number
  // Month precision, format MM/YYYY
  joinedMonth?: string
}

// Aggregates over all members (the member list may be paged), computed by BE
export interface IProjectAllocationSummary {
  memberCount?: number
  fte?: number
  averageAllocation?: number
  overAllocatedMemberNames?: string[]
}

export interface IProjectDetail extends IProject {
  // Full dates, ISO format (YYYY-MM-DD)
  startDate?: string
  endDate?: string
  goal?: string
  members?: IProjectMember[]
  allocationSummary?: IProjectAllocationSummary
}

// A project the employee already works on, with the % of time allocated to it
export interface IEmployeeProjectAllocation {
  projectId?: string
  projectCode?: string
  projectName?: string
  allocation?: number
}

// Employee that can be added to a project, with their current allocations on other projects
export interface IProjectMemberCandidate {
  id?: string
  code?: string
  name?: string
  email?: string
  jobTitle?: string
  department?: EDepartment
  allocations?: IEmployeeProjectAllocation[]
}

// One row of the allocation check in the "add member" dialog
export interface IAllocationCheckRow {
  key: string
  label: string
  allocation: number
  // The project the member is being added to
  isCurrent?: boolean
}
