import type { EDepartment } from '~/shared/enums/common.enum'

export interface IDepartmentHeadcount {
  department?: EDepartment
  headcount?: number
}

// New hires / resignations of one month
export interface IHeadcountTrendItem {
  // MM/YYYY
  month?: string
  newHires?: number
  resignations?: number
}

// Figures of the HR overview (design screen CmsTongQuan)
// TODO(assumption): field names follow the design until the dashboard API exists — confirm with BE
export interface IOverviewSummary {
  // ISO date-time of the last refresh
  updatedAt?: string
  activeEmployeeCount?: number
  // Change of active employees this month (newHires - resignations)
  headcountChange?: number
  newHireCount?: number
  resignationCount?: number
  presentTodayCount?: number
  pendingRequestCount?: number
  overdueRequestCount?: number
  // A pending request is overdue after this many days
  overdueAfterDays?: number
  expiringContractCount?: number
  // "Expiring" = ends within this many days
  expiringWithinDays?: number
  departmentHeadcounts?: IDepartmentHeadcount[]
  // Last 6 months, oldest first
  headcountTrend?: IHeadcountTrendItem[]
}

export interface IExpiringContract {
  id?: string
  employeeCode?: string
  employeeName?: string
  department?: EDepartment
  // TODO(assumption): contract type codes are not defined yet (EContractType is empty) — label as sent by BE
  contractName?: string
  // ISO date
  endDate?: string
  // Days until endDate — TODO(assumption): computed by BE
  remainingDays?: number
}
