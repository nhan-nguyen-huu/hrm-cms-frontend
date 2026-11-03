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

export enum ePersonalEmployeeFormKey {
  // Basic
  FullName = 'fullName',
  BirthDate = 'birthDate',
  Gender = 'gender',
  CccdNumber = 'cccdNumber',
  DateOfIssue = 'dateOfIssue',
  PlaceOfIssue = 'placeOfIssue',

  // Contact
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  EmergencyContact = 'emergencyContact',
  PermanentAddress = 'permanentAddress',
  CurrentResidence = 'currentResidence',

  // Additional
  MaritalStatus = 'maritalStatus',
  Nationality = 'nationality',
  NumberOfDependents = 'numberOfDependents',

  // Avatar
  Avatar = 'avatar'
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
