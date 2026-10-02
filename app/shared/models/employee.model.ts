import type {
  EContractType,
  EDependentStatus,
  EEducationLevel,
  EEmployeeDocumentStatus,
  EEmployeeDocumentType,
  EEmployeeStatus,
  EGender,
  EMaritalStatus,
  EOrgEventType,
  ERelationship
} from '~/shared/enums/common.enum'
import type { IBaseFilterPanel, IBasePagination } from '~/shared/models/common.model'

// Uploaded file as returned by the API (e.g. avatar)
export interface IFileAsset {
  filePath?: string
  fileUrl?: string
}

export interface IAssignment {
  id?: number
  departmentId?: number
  departmentName?: string
  jobTitleId?: number
  jobTitleName?: string
  lineManagerId?: number
  lineManagerFullName?: string
  primary?: boolean
  startDate?: string
  endDate?: string
}
export interface IEducation {
  level?: EEducationLevel
  major?: string
  school?: string
  graduationYear?: number
  foreignLanguage?: string
  certificate?: string
}

export interface IDependent {
  id?: number
  fullName?: string
  relationship?: ERelationship
  birthDate?: string
  // MM/YYYY — month the dependent was registered for tax deduction
  registeredMonth?: string
  status?: EDependentStatus
}

export interface IProfileCompleteness {
  filledCount?: number
  requiredCount?: number
  // Keys of the required fields still empty, e.g. 'healthInsuranceNumber', 'avatar'
  missingFields?: string[]
}

export interface IEmployeeNote {
  id?: number
  content?: string
  createdBy?: string
  createdDate?: string
}

// Change requests of the employee waiting for HR
export interface IEmployeePendingItem {
  id?: number
  title?: string
  createdDate?: string
}

export interface IEmployee {
  employeeCode?: string
  fullName?: string
  email?: string
  primaryDepartmentName?: string
  primaryJobTitleName?: string
  createdDate?: string
  employmentStatus?: EEmployeeStatus
  contractType?: EContractType
  // TODO: the detail API returns an object { filePath, fileUrl } (IFileAsset), not a string — header-profile reads it
  // as an image URL, so the type is left as is until Nhan updates the header
  avatar?: string
  assignments?: IAssignment[]
  // Returned by GET /employee/:id (checked against the dev API, 2026-10-01)
  id?: number
  username?: string
  personalEmail?: string
  phone?: string
  gender?: EGender
  dateOfBirth?: string
  idCardNumber?: string
  idCardIssuedDate?: string
  idCardIssuedPlace?: string
  permanentAddress?: string
  currentAddress?: string
  maritalStatus?: EMaritalStatus
  // Free text from the API (e.g. "Vietnam", "Viet Nam"), not an ENationality code
  nationality?: string
  dependentCount?: number
  taxCode?: string
  socialInsuranceNumber?: string
  bankAccountNumber?: string
  bankName?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  // Free text or code from the API (seen: "FAMILY", "Me") — shown translated when it matches ERelationship
  emergencyContactRelation?: string
  employmentType?: string
  hireDate?: string
  firstHireDate?: string
  terminationDate?: string
  accountStatus?: string
  lastLoginAt?: string
  // Shown on the personal info tab (design CmsHoSoThongTin) but not returned by the API yet
  // TODO(assumption): field names and shapes — confirm with BE
  placeOfBirth?: string
  healthInsuranceNumber?: string
  education?: IEducation
  dependents?: IDependent[]
  // Personal income tax deduction for dependents, VND per month
  dependentDeduction?: number
  profileCompleteness?: IProfileCompleteness
  notes?: IEmployeeNote[]
  pendingItems?: IEmployeePendingItem[]
}

export interface IEmployeeParams extends IBasePagination, IBaseFilterPanel {
  employmentStatus?: EEmployeeStatus | null
}

// GET /employee/{userId}/document — EmployeeDocumentDto (API docs)
export interface IEmployeeDocument {
  id?: number
  documentType?: EEmployeeDocumentType
  file?: IFileAsset
  originalFileName?: string
  contentType?: string
  // Bytes
  fileSize?: number
  note?: string
  uploadedAt?: string
  // Shown in the design but not returned by the API yet — TODO(assumption): names to confirm with BE
  status?: EEmployeeDocumentStatus
  uploadedBy?: string
}

// "Chờ duyệt" card of the documents tab — no API yet
export interface IPendingDocument {
  id?: number
  fileName?: string
  uploadedBy?: string
  uploadedAt?: string
}

// "Cảnh báo giấy tờ" card of the documents tab — no API yet
export interface IDocumentWarning {
  id?: number
  title?: string
  description?: string
}

// POST /employee/{userId}/document — EmployeeDocumentUploadForm (multipart)
export interface IUploadEmployeeDocumentPayload {
  userId?: number
  documentType: EEmployeeDocumentType
  file: File
  note?: string
}

// GET /employee/{userId}/event — OrgEventDto (API docs)
export interface IOrgEvent {
  id?: number
  eventType?: EOrgEventType
  subjectType?: string
  subjectId?: number
  subjectName?: string
  message?: string
  actorId?: number
  actorFullName?: string
  occurredAt?: string
  relatedUserId?: number
  relatedUserFullName?: string
  relatedDepartmentId?: number
  relatedDepartmentName?: string
  relatedProjectId?: number
  relatedProjectName?: string
  amount?: number
  note?: string
}
