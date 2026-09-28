import { EDepartment, ERequestStatus, ERequestType } from '~/shared/enums/common.enum'
import type { IRequest, IRequestEmployee } from '~/shared/models/request.model'

const MANAGER_OPERATIONS: IRequestEmployee = {
  code: 'NV0119',
  name: 'Đỗ Quang Vinh',
  department: EDepartment.Operations
}

// Sample data from design artifact "Specom HRM UI" (screen CmsDuyetDon) — replace with the request API once available.
// Only the first request is fully shown in the design; the others keep the fields their list row shows.
export const MOCK_REQUESTS: IRequest[] = [
  {
    id: 'REQ-0001',
    type: ERequestType.AnnualLeave,
    status: ERequestStatus.PendingHr,
    employee: {
      code: 'NV0168',
      name: 'Vũ Thanh Hải',
      email: 'hai.vu@specom.vn',
      jobTitle: 'Nhân viên kho',
      department: EDepartment.Operations
    },
    fromDate: '2026-09-21',
    toDate: '2026-09-22',
    days: 2,
    leaveBalanceBefore: 7,
    leaveBalanceAfter: 5,
    reason:
      'Về quê giải quyết việc gia đình. Đã bàn giao ca trực kho cho anh Đỗ Quang Vinh và hoàn tất kiểm kê tuần trước ngày nghỉ.',
    attachment: { name: 'don_xin_nghi_phep.pdf', size: 240 * 1024 },
    manager: MANAGER_OPERATIONS,
    managerReviewedAt: '2026-09-15T16:20:00',
    submittedAt: '2026-09-15T15:48:00'
  },
  {
    id: 'REQ-0002',
    type: ERequestType.AnnualLeave,
    status: ERequestStatus.PendingManager,
    employee: {
      code: 'NV0142',
      name: 'Nguyễn Minh Thư',
      email: 'thu.nguyen@specom.vn',
      jobTitle: 'Kỹ sư phần mềm',
      department: EDepartment.Technology
    },
    fromDate: '2026-10-08',
    toDate: '2026-10-09',
    days: 2
  },
  {
    id: 'REQ-0003',
    type: ERequestType.UnpaidLeave,
    status: ERequestStatus.PendingHr,
    employee: {
      code: 'NV0156',
      name: 'Lê Anh Dũng',
      email: 'dung.le@specom.vn',
      jobTitle: 'Kỹ sư QA',
      department: EDepartment.Technology
    },
    fromDate: '2026-09-30',
    toDate: '2026-10-02',
    days: 3,
    overdueDays: 2
  },
  {
    id: 'REQ-0004',
    type: ERequestType.AttendanceExplanation,
    status: ERequestStatus.PendingHr,
    employee: {
      code: 'NV0161',
      name: 'Phạm Thu Hằng',
      email: 'hang.pham@specom.vn',
      jobTitle: 'Chuyên viên nội dung',
      department: EDepartment.Marketing
    },
    fromDate: '2026-09-15'
  },
  {
    id: 'REQ-0005',
    type: ERequestType.SickLeave,
    status: ERequestStatus.PendingManager,
    employee: {
      code: 'NV0173',
      name: 'Ngô Hải Yến',
      email: 'yen.ngo@specom.vn',
      jobTitle: 'Thiết kế đồ hoạ',
      department: EDepartment.Marketing
    },
    fromDate: '2026-09-21',
    days: 1
  },
  {
    id: 'REQ-0006',
    type: ERequestType.AnnualLeave,
    status: ERequestStatus.PendingHr,
    employee: {
      code: 'NV0104',
      name: 'Bùi Trung Kiên',
      email: 'kien.bui@specom.vn',
      jobTitle: 'Trưởng phòng',
      department: EDepartment.Sales
    },
    fromDate: '2026-10-05',
    toDate: '2026-10-09',
    days: 5
  }
]
