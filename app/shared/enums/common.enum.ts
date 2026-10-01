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
  Famale = 'FAMALE'
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

export enum EOnboardingStep {
  Personal = 'PERSONAL',
  Job = 'JOB',
  Contract = 'CONTRACT',
  Account = 'ACCOUNT'
}
