import type { EDepartment, EProjectStatus } from '~/shared/enums/common.enum'

export interface IProject {
  id: string
  name: string
  code: string
  department: EDepartment
  projectManager: string
  // Participations, not headcount — one employee can be split across several projects
  memberCount: number
  // Month precision, format MM/YYYY
  startMonth: string
  endMonth: string
  status: EProjectStatus
}
