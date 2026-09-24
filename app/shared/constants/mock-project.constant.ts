import { EDepartment, EProjectStatus } from '~/shared/enums/common.enum'
import type { IProject } from '~/shared/models/project.model'

// Sample data from docs/Specom_HRM_Design_45man.html (screen CmsDuAn) — replace with the project API once available
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
