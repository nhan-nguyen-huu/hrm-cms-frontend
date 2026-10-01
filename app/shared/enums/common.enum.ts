export enum ELanguage {
  En = 'en',
  Vi = 'vi',
  Ko = 'ko'
}
export enum EEmployeeStatus {
  All = 'ALL',
  PendingOnboard = 'PENDING_ONBOARD',
  Active = 'ACTIVE',
  Suspended = 'SUSPENDED',
  Terminated = 'TERMINATED',
  Probation = 'PROBATION'
}

export enum EErrorCode {
  Unauthorized = 401,
  Test = 'MSG_001',
  ResetPassword = 'AUTH_545'
}

export enum EGender {
  Male = 'MALE',
  Famale = 'FEMALE'
}

export enum EMaritalStatus {
  Single = 'SINGLE',
  Married = 'MARRIED'
}

export enum ENationality {
  Vi = 'VI',
  En = 'EN',
  Ko = 'KO'
}

export enum EProjectStatus {
  InProgress = 'IN_PROGRESS',
  Kickoff = 'KICKOFF',
  EndingSoon = 'ENDING_SOON',
  Completed = 'COMPLETED'
}

export enum EDepartment {
  Technology = 'TECHNOLOGY',
  Sales = 'SALES',
  Operations = 'OPERATIONS',
  Marketing = 'MARKETING',
  Accounting = 'ACCOUNTING',
  HumanResources = 'HUMAN_RESOURCES'
}

// TODO(assumption): request type codes — confirm with BE; the design only shows these four
export enum ERequestType {
  AnnualLeave = 'ANNUAL_LEAVE',
  SickLeave = 'SICK_LEAVE',
  UnpaidLeave = 'UNPAID_LEAVE',
  AttendanceExplanation = 'ATTENDANCE_EXPLANATION'
}

// Approval flow (design): line manager → HR → timesheet update
// TODO(assumption): status codes — confirm with BE
export enum ERequestStatus {
  PendingManager = 'PENDING_MANAGER',
  PendingHr = 'PENDING_HR',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

// Status tabs of the request list; Pending = PendingManager + PendingHr
export enum ERequestStatusFilter {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED',
  All = 'ALL'
}

export enum EAspectType {
  Employee = 'EMPLOYEE'
}

export enum EContractType {}

export enum EEmployeeProfileTab {
  OfficialRecord = 'OFFICIAL_RECORD',
  Draft = 'DRAFT'
}

export enum EEmployeeProfileDetailTab {
  OverView = 'OVER_VIEW',
  PersonalInfo = 'PERSONAL_INFO',
  ContractsAndSalary = 'CONTRACTS_AND_SALARY',
  TimeAndAttendance = 'TIME_AND_ATTENDANCE',
  Documents = 'DOCUMENTS',
  ChangeHistory = 'CHANGE_HISTORY'
}

// Relationship of a dependent / emergency contact to the employee — TODO(assumption): codes not confirmed with BE
export enum ERelationship {
  Father = 'FATHER',
  Mother = 'MOTHER',
  Spouse = 'SPOUSE',
  Child = 'CHILD',
  Sibling = 'SIBLING',
  // Sent by the API for emergency contacts
  Family = 'FAMILY',
  Other = 'OTHER'
}

// Approval of a registered dependent (tax deduction) — TODO(assumption): codes not confirmed with BE
export enum EDependentStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

// TODO(assumption): codes not confirmed with BE
export enum EEducationLevel {
  HighSchool = 'HIGH_SCHOOL',
  College = 'COLLEGE',
  University = 'UNIVERSITY',
  Master = 'MASTER',
  Doctor = 'DOCTOR'
}

// EmployeeDocumentDto.documentType (API docs); All = filter value only
export enum EEmployeeDocumentType {
  All = 'ALL',
  Cv = 'CV',
  IdCard = 'ID_CARD',
  Qualification = 'QUALIFICATION',
  SignedContract = 'SIGNED_CONTRACT',
  Decision = 'DECISION',
  Other = 'OTHER'
}

// OrgEventDto.eventType (API docs); All = filter value only
export enum EOrgEventType {
  All = 'ALL',
  DepartmentCreated = 'DEPARTMENT_CREATED',
  DepartmentUpdated = 'DEPARTMENT_UPDATED',
  DepartmentHeadChanged = 'DEPARTMENT_HEAD_CHANGED',
  DepartmentHeadCleared = 'DEPARTMENT_HEAD_CLEARED',
  DepartmentDeleted = 'DEPARTMENT_DELETED',
  DepartmentClosedWithHandover = 'DEPARTMENT_CLOSED_WITH_HANDOVER',
  DepartmentProjectsMoved = 'DEPARTMENT_PROJECTS_MOVED',
  DepartmentReceivedHandover = 'DEPARTMENT_RECEIVED_HANDOVER',
  DepartmentOverAllocationGranted = 'DEPARTMENT_OVER_ALLOCATION_GRANTED',
  ProjectCreated = 'PROJECT_CREATED',
  ProjectUpdated = 'PROJECT_UPDATED',
  ProjectDeleted = 'PROJECT_DELETED',
  ProjectMemberAdded = 'PROJECT_MEMBER_ADDED',
  ProjectMemberAllocationChanged = 'PROJECT_MEMBER_ALLOCATION_CHANGED',
  ProjectMemberRemoved = 'PROJECT_MEMBER_REMOVED',
  ProjectOverAllocationGranted = 'PROJECT_OVER_ALLOCATION_GRANTED',
  EmployeeHired = 'EMPLOYEE_HIRED',
  EmployeeRehired = 'EMPLOYEE_REHIRED',
  EmployeeAssigned = 'EMPLOYEE_ASSIGNED',
  EmployeeContractSigned = 'EMPLOYEE_CONTRACT_SIGNED',
  EmployeeContractExpired = 'EMPLOYEE_CONTRACT_EXPIRED',
  EmployeeContractRemoved = 'EMPLOYEE_CONTRACT_REMOVED',
  EmployeeDocumentAdded = 'EMPLOYEE_DOCUMENT_ADDED',
  EmployeeDocumentRemoved = 'EMPLOYEE_DOCUMENT_REMOVED'
}

// Status of a profile document (design CmsHoSoTaiLieu) — TODO(assumption): not in the API docs yet, codes not confirmed
export enum EEmployeeDocumentStatus {
  All = 'ALL',
  Valid = 'VALID',
  Pending = 'PENDING',
  Superseded = 'SUPERSEDED',
  Expired = 'EXPIRED'
}
