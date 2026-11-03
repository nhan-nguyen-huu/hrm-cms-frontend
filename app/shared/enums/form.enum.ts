export enum EFilterPanelFormKey {
  Keyword = 'keyword'
}

export enum EFilterPanelEmployeeProfileFormKey {
  EmploymentStatus = 'employmentStatus'
}

export enum EFilterPanelDraftEmployeeProfileFormKey {
  CurrentStep = 'currentStep'
}

export enum EFilterPanelProjectFormKey {
  Department = 'department',
  Status = 'status',
  Year = 'year'
}

export enum EAddProjectMemberFormKey {
  Employee = 'employeeId',
  Role = 'role',
  Allocation = 'allocation',
  JoinedDate = 'joinedDate',
  ConfirmOverAllocation = 'confirmOverAllocation'
}

export enum EReviewRequestFormKey {
  Note = 'note'
}

export enum ELoginFormKey {
  Username = 'username',
  Password = 'password'
}

export enum EPersonalEmployeeFormKey {
  // Basic
  FullName = 'fullName',
  DateOfBirth = 'dateOfBirth',
  Gender = 'gender',
  IdCardNumber = 'idCardNumber',
  IdCardIssuedDate = 'idCardIssuedDate',
  IdCardIssuedPlace = 'idCardIssuedPlace',

  // Contact
  Phone = 'phone',
  PersonalEmail = 'personalEmail',
  PermanentAddress = 'permanentAddress',
  CurrentAddress = 'currentAddress',
  EmergencyContact = 'emergencyContact',

  // Additional
  MaritalStatus = 'maritalStatus',
  Nationality = 'nationality',
  DependentCount = 'dependentCount',

  // Avatar
  Avatar = 'avatar'
}

export enum EJobEmployeeFormKey {
  // Position
  DepartmentId = 'departmentId',
  ProjectId = 'projectId',
  JobTitleId = 'jobTitleId',
  JobGradeId = 'jobGradeId',
  LineManagerId = 'lineManagerId',

  // Time & work
  StartDate = 'startDate',
  EmploymentType = 'employmentType',
  OfficeId = 'officeId',
  WorkShift = 'workShift',

  // Policy
  AnnualLeaveDays = 'annualLeaveDays'
}

export enum EFilterPanelEmployeeDocumentFormKey {
  DocumentType = 'documentType',
  Status = 'documentStatus'
}

export enum EFilterPanelEmployeeEventFormKey {
  EventType = 'eventType',
  Actor = 'actor'
}

// Fields of EmployeeDocumentUploadForm (API docs, multipart)
export enum EUploadEmployeeDocumentFormKey {
  DocumentType = 'documentType',
  File = 'file',
  Note = 'note'
}
