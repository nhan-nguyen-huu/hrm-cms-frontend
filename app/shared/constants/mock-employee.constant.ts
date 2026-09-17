import { EEmployeeAccountStatus } from '~/shared/enums/common.enum'

const FIRST_NAMES = ['Nguyễn Minh', 'Trần Thị', 'Lê Văn', 'Phạm Thu', 'Hoàng Đức', 'Vũ Ngọc', 'Đặng Gia', 'Bùi Thanh']

const LAST_NAMES = ['Thư', 'Hà', 'Nam', 'Linh', 'Khoa', 'Anh', 'Trang', 'Phong', 'Dũng', 'Hiếu']

const DEPARTMENT_JOB_TITLES: Record<string, string[]> = {
  'Kỹ thuật': ['Kỹ sư phần mềm', 'Kỹ sư kiểm thử', 'Quản trị hệ thống', 'Kỹ sư dữ liệu'],
  'Nhân sự': ['Chuyên viên tuyển dụng', 'Chuyên viên C&B', 'Trưởng phòng nhân sự'],
  'Kinh doanh': ['Chuyên viên kinh doanh', 'Giám sát kinh doanh', 'Trưởng phòng kinh doanh'],
  Marketing: ['Chuyên viên marketing', 'Thiết kế đồ họa', 'Chuyên viên truyền thông'],
  'Kế toán': ['Kế toán viên', 'Kế toán trưởng', 'Chuyên viên thuế']
}

const DEPARTMENTS = Object.keys(DEPARTMENT_JOB_TITLES)

const CONTRACT_TYPES = ['HĐ thử việc', 'HĐLĐ 12 tháng', 'HĐLĐ 24 tháng', 'HĐLĐ không xác định thời hạn']

const STATUSES = [
  EEmployeeAccountStatus.Working,
  EEmployeeAccountStatus.MaternityLeave,
  EEmployeeAccountStatus.Terminated
]

const EMAIL_DOMAIN = 'specom.vn'

const pickByIndex = <T>(list: T[], index: number) => list[index % list.length]

const removeDiacritics = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')

const buildEmail = (name: string) => {
  const words = removeDiacritics(name).trim().split(/\s+/).filter(Boolean)
  const givenName = words[words.length - 1] ?? ''
  const familyName = words[0] ?? ''
  return `${givenName}.${familyName}@${EMAIL_DOMAIN}`.toLowerCase()
}

const buildJoinDate = (index: number) => {
  const date = new Date(2020, 0, 1)
  date.setMonth(date.getMonth() + index)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}/${date.getFullYear()}`
}

export type TMockEmployee = {
  code: string
  name: string
  email: string
  department: string
  jobTitle: string
  contractType: string
  joinDate: string
  status: string
}

export const generateMockEmployees = (count: number, startCode = 142): TMockEmployee[] => {
  return Array.from({ length: count }, (_, index) => {
    const department = pickByIndex(DEPARTMENTS, index)
    const jobTitles = DEPARTMENT_JOB_TITLES[department]
    const name = `${pickByIndex(FIRST_NAMES, index)} ${pickByIndex(LAST_NAMES, index + 1)}`

    return {
      code: `NV${String(startCode + index).padStart(4, '0')}`,
      name,
      email: buildEmail(name),
      department,
      jobTitle: pickByIndex(jobTitles, index),
      contractType: pickByIndex(CONTRACT_TYPES, index),
      joinDate: buildJoinDate(index),
      status: pickByIndex(STATUSES, index)
    }
  })
}
