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
