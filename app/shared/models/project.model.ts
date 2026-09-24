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
