import { EDepartment, EProjectStatus } from '~/shared/enums/common.enum'
import type { IProject, IProjectDetail, IProjectMember } from '~/shared/models/project.model'

// Sample data from design artifact "Specom HRM UI" (screen CmsDuAn) — replace with the project API once available
export const MOCK_PROJECTS: IProject[] = [
  {
    id: 'DA-KT-01',
    name: 'SP Core Platform',
    code: 'DA-KT-01',
    department: EDepartment.Technology,
    projectManager: { code: 'NV0101', name: 'Trần Quốc Hưng', email: 'hung.tran@specom.vn' },
    memberCount: 32,
    startMonth: '01/2025',
    endMonth: '12/2026',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-KT-02',
    name: 'Specom Mobile App',
    code: 'DA-KT-02',
    department: EDepartment.Technology,
    projectManager: { code: 'NV0102', name: 'Vũ Đình Sơn', email: 'son.vu@specom.vn' },
    memberCount: 26,
    startMonth: '03/2026',
    endMonth: '06/2027',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-KT-03',
    name: 'Customer Portal',
    code: 'DA-KT-03',
    department: EDepartment.Technology,
    projectManager: { code: 'NV0103', name: 'Trịnh Minh Đạt', email: 'dat.trinh@specom.vn' },
    memberCount: 22,
    startMonth: '07/2026',
    endMonth: '03/2027',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-KT-04',
    name: 'ERP Integration',
    code: 'DA-KT-04',
    department: EDepartment.Technology,
    projectManager: { code: 'NV0104', name: 'Lý Hoàng Ân', email: 'an.ly@specom.vn' },
    memberCount: 20,
    startMonth: '09/2026',
    endMonth: '05/2027',
    status: EProjectStatus.Kickoff
  },
  {
    id: 'DA-KT-05',
    name: 'Infrastructure Upgrade',
    code: 'DA-KT-05',
    department: EDepartment.Technology,
    projectManager: { code: 'NV0105', name: 'Cao Việt Anh', email: 'anh.cao@specom.vn' },
    memberCount: 18,
    startMonth: '01/2026',
    endMonth: '11/2026',
    status: EProjectStatus.EndingSoon
  },
  {
    id: 'DA-KD-01',
    name: 'B2B Channel Expansion',
    code: 'DA-KD-01',
    department: EDepartment.Sales,
    projectManager: { code: 'NV0106', name: 'Bùi Trung Kiên', email: 'kien.bui@specom.vn' },
    memberCount: 24,
    startMonth: '01/2026',
    endMonth: '12/2026',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-KD-02',
    name: 'Key Accounts',
    code: 'DA-KD-02',
    department: EDepartment.Sales,
    projectManager: { code: 'NV0107', name: 'Đào Thu Trang', email: 'trang.dao@specom.vn' },
    memberCount: 18,
    startMonth: '01/2026',
    endMonth: '12/2026',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-KD-03',
    name: 'Central Region Dealers',
    code: 'DA-KD-03',
    department: EDepartment.Sales,
    projectManager: { code: 'NV0108', name: 'Hồ Nhật Quang', email: 'quang.ho@specom.vn' },
    memberCount: 12,
    startMonth: '06/2026',
    endMonth: '06/2027',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-VH-01',
    name: 'Hanoi Warehouse Optimization',
    code: 'DA-VH-01',
    department: EDepartment.Operations,
    projectManager: { code: 'NV0109', name: 'Lương Thị Bích', email: 'bich.luong@specom.vn' },
    memberCount: 20,
    startMonth: '04/2026',
    endMonth: '10/2026',
    status: EProjectStatus.EndingSoon
  },
  {
    id: 'DA-VH-02',
    name: 'Handover Standardization',
    code: 'DA-VH-02',
    department: EDepartment.Operations,
    projectManager: { code: 'NV0110', name: 'Đỗ Quang Vinh', email: 'vinh.do@specom.vn' },
    memberCount: 15,
    startMonth: '08/2026',
    endMonth: '04/2027',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-MKT-01',
    name: 'Specom Brand 2027',
    code: 'DA-MKT-01',
    department: EDepartment.Marketing,
    projectManager: { code: 'NV0111', name: 'Phan Khánh Linh', email: 'linh.phan@specom.vn' },
    memberCount: 14,
    startMonth: '07/2026',
    endMonth: '06/2027',
    status: EProjectStatus.InProgress
  },
  {
    id: 'DA-MKT-02',
    name: 'Da Nang Office Opening',
    code: 'DA-MKT-02',
    department: EDepartment.Marketing,
    projectManager: { code: 'NV0112', name: 'Ngô Hải Yến', email: 'yen.ngo@specom.vn' },
    memberCount: 8,
    startMonth: '06/2026',
    endMonth: '09/2026',
    status: EProjectStatus.Completed
  }
]

// Members of SP Core Platform as shown in design artifact "Specom HRM UI" (screen CmsDuAnChiTiet) — first 12 of 32
const MOCK_SP_CORE_MEMBERS: IProjectMember[] = [
  {
    id: 'NV0201',
    code: 'NV0201',
    name: 'Trần Quốc Hưng',
    email: 'hung.tran@specom.vn',
    jobTitle: 'Trưởng nhóm',
    role: 'Project PM',
    allocation: 50,
    totalAllocation: 90,
    joinedMonth: '01/2025'
  },
  {
    id: 'NV0202',
    code: 'NV0202',
    name: 'Nguyễn Minh Thư',
    email: 'thu.nguyen@specom.vn',
    jobTitle: 'Kỹ sư phần mềm',
    role: 'Backend',
    allocation: 60,
    totalAllocation: 100,
    joinedMonth: '04/2025'
  },
  {
    id: 'NV0203',
    code: 'NV0203',
    name: 'Phan Duy Khánh',
    email: 'khanh.phan@specom.vn',
    jobTitle: 'Kỹ sư phần mềm',
    role: 'Backend',
    allocation: 45,
    totalAllocation: 85,
    joinedMonth: '05/2026'
  },
  {
    id: 'NV0204',
    code: 'NV0204',
    name: 'Lê Anh Dũng',
    email: 'dung.le@specom.vn',
    jobTitle: 'Kỹ sư kiểm thử',
    role: 'QA',
    allocation: 40,
    totalAllocation: 110,
    joinedMonth: '06/2025'
  },
  {
    id: 'NV0205',
    code: 'NV0205',
    name: 'Trịnh Minh Đạt',
    email: 'dat.trinh@specom.vn',
    jobTitle: 'Kỹ sư kiểm thử',
    role: 'QA',
    allocation: 35,
    totalAllocation: 95,
    joinedMonth: '03/2026'
  },
  {
    id: 'NV0206',
    code: 'NV0206',
    name: 'Vũ Đình Sơn',
    email: 'son.vu@specom.vn',
    jobTitle: 'Trưởng nhóm',
    role: 'System architecture',
    allocation: 30,
    totalAllocation: 80,
    joinedMonth: '01/2025'
  },
  {
    id: 'NV0207',
    code: 'NV0207',
    name: 'Cao Việt Anh',
    email: 'anh.cao@specom.vn',
    jobTitle: 'Quản trị hệ thống',
    role: 'DevOps',
    allocation: 25,
    totalAllocation: 105,
    joinedMonth: '09/2025'
  },
  {
    id: 'NV0208',
    code: 'NV0208',
    name: 'Lý Hoàng Ân',
    email: 'an.ly@specom.vn',
    jobTitle: 'Kỹ sư di động',
    role: 'Integration',
    allocation: 20,
    totalAllocation: 70,
    joinedMonth: '02/2026'
  },
  {
    id: 'NV0209',
    code: 'NV0209',
    name: 'Đào Thị Tuyết',
    email: 'tuyet.dao@specom.vn',
    jobTitle: 'Kỹ sư phần mềm',
    role: 'Frontend',
    allocation: 50,
    totalAllocation: 100,
    joinedMonth: '07/2025'
  },
  {
    id: 'NV0210',
    code: 'NV0210',
    name: 'Bùi Hải My',
    email: 'my.bui@specom.vn',
    jobTitle: 'Chuyên viên phân tích nghiệp vụ',
    role: 'Business analysis',
    allocation: 45,
    totalAllocation: 90,
    joinedMonth: '01/2026'
  },
  {
    id: 'NV0211',
    code: 'NV0211',
    name: 'Ngô Văn Tú',
    email: 'tu.ngo@specom.vn',
    jobTitle: 'Kỹ sư dữ liệu',
    role: 'Data & reporting',
    allocation: 35,
    totalAllocation: 75,
    joinedMonth: '11/2025'
  },
  {
    id: 'NV0212',
    code: 'NV0212',
    name: 'Hoàng Quốc Toản',
    email: 'toan.hoang@specom.vn',
    jobTitle: 'Kỹ sư phần mềm',
    role: 'Backend',
    allocation: 30,
    totalAllocation: 80,
    joinedMonth: '04/2026'
  }
]

const MOCK_PROJECT_DETAIL_EXTRAS: Record<string, Omit<IProjectDetail, keyof IProject>> = {
  'DA-KT-01': {
    startDate: '2025-01-06',
    endDate: '2026-12-31',
    goal: 'Build a shared core platform for all Specom products.',
    members: MOCK_SP_CORE_MEMBERS,
    allocationSummary: {
      memberCount: 32,
      fte: 12.4,
      averageAllocation: 39,
      overAllocatedMemberNames: ['Lê Anh Dũng', 'Cao Việt Anh']
    }
  }
}

// Stand-in for GET /projects/:id — only DA-KT-01 has members; other projects return an empty member list
export const getMockProjectDetail = (id?: string): IProjectDetail | undefined => {
  const project = MOCK_PROJECTS.find((item) => item.id === id)
  if (!project) return undefined
  return { members: [], ...project, ...MOCK_PROJECT_DETAIL_EXTRAS[project.id ?? ''] }
}
