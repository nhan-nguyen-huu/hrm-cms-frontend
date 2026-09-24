import { EDepartment, EProjectStatus } from '~/shared/enums/common.enum'
import type { IProject } from '~/shared/models/project.model'

// Sample data from docs/Specom_HRM_Design_45man.html (screen CmsDuAn) — replace with the project API once available
export const MOCK_PROJECTS: IProject[] = [
  {
    id: 'DA-KT-01',
    name: 'SP Core Platform',
    code: 'DA-KT-01',
    department: EDepartment.Technology,
    projectManager: 'Trần Quốc Hưng',
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
    projectManager: 'Vũ Đình Sơn',
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
    projectManager: 'Trịnh Minh Đạt',
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
    projectManager: 'Lý Hoàng Ân',
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
    projectManager: 'Cao Việt Anh',
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
    projectManager: 'Bùi Trung Kiên',
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
    projectManager: 'Đào Thu Trang',
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
    projectManager: 'Hồ Nhật Quang',
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
    projectManager: 'Lương Thị Bích',
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
    projectManager: 'Đỗ Quang Vinh',
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
    projectManager: 'Phan Khánh Linh',
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
    projectManager: 'Ngô Hải Yến',
    memberCount: 8,
    startMonth: '06/2026',
    endMonth: '09/2026',
    status: EProjectStatus.Completed
  }
]
