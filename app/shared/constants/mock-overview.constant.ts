import { EDepartment } from '~/shared/enums/common.enum'
import type { IExpiringContract, IOverviewSummary } from '~/shared/models/overview.model'

// Sample data of design screen CmsTongQuan — replace with the dashboard API once available.
// Department headcounts add up to 248 and match the Organization screens
export const MOCK_OVERVIEW_SUMMARY: IOverviewSummary = {
  updatedAt: '2026-09-16T09:15:00',
  activeEmployeeCount: 248,
  headcountChange: 6,
  newHireCount: 10,
  resignationCount: 4,
  presentTodayCount: 231,
  pendingRequestCount: 14,
  overdueRequestCount: 5,
  overdueAfterDays: 2,
  expiringContractCount: 7,
  expiringWithinDays: 30,
  departmentHeadcounts: [
    { department: EDepartment.Technology, headcount: 86 },
    { department: EDepartment.Sales, headcount: 52 },
    { department: EDepartment.Operations, headcount: 41 },
    { department: EDepartment.Marketing, headcount: 28 },
    { department: EDepartment.Accounting, headcount: 22 },
    { department: EDepartment.HumanResources, headcount: 19 }
  ],
  // Read off the design chart; the last month matches "10 tuyển mới · 4 nghỉ việc"
  headcountTrend: [
    { month: '04/2026', newHires: 8, resignations: 5 },
    { month: '05/2026', newHires: 12, resignations: 4 },
    { month: '06/2026', newHires: 9, resignations: 7 },
    { month: '07/2026', newHires: 14, resignations: 6 },
    { month: '08/2026', newHires: 11, resignations: 5 },
    { month: '09/2026', newHires: 10, resignations: 4 }
  ]
}

export const MOCK_EXPIRING_CONTRACTS: IExpiringContract[] = [
  {
    id: 'CT-0119',
    employeeCode: 'NV0119',
    employeeName: 'Đỗ Quang Vinh',
    department: EDepartment.Operations,
    contractName: 'HĐLĐ 12 tháng',
    endDate: '2026-09-24',
    remainingDays: 8
  },
  {
    id: 'CT-0158',
    employeeCode: 'NV0158',
    employeeName: 'Ngô Hải Yến',
    department: EDepartment.Marketing,
    contractName: 'Thử việc 2 tháng',
    endDate: '2026-10-02',
    remainingDays: 16
  },
  {
    id: 'CT-0106',
    employeeCode: 'NV0106',
    employeeName: 'Bùi Trung Kiên',
    department: EDepartment.Sales,
    contractName: 'HĐLĐ 12 tháng',
    endDate: '2026-10-09',
    remainingDays: 23
  }
]
