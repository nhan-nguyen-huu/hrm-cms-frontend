export enum EBaseTableKey {
  Expand = 'expand',
  Select = 'select',
  Action = 'action',
  No = 'No',
  Delete = 'delete',
  Download = 'download'
}

export enum EEmployeeProfileTableKey {
  Code = 'code',
  Name = 'name',
  Department = 'department',
  JobTitle = 'jobTitle',
  ContractType = 'contractType',
  JoinDate = 'joinDate',
  Status = 'status'
}

export enum EProjectTableKey {
  Name = 'name',
  Code = 'code',
  Department = 'department',
  ProjectManager = 'projectManager',
  MemberCount = 'memberCount',
  Period = 'period',
  Status = 'status'
}

export enum EProjectMemberTableKey {
  Employee = 'name',
  Role = 'role',
  Allocation = 'allocation',
  JoinedMonth = 'joinedMonth'
}

export enum EEmployeeDocumentTableKey {
  Name = 'originalFileName',
  DocumentType = 'documentType',
  FileSize = 'fileSize',
  UploadedAt = 'uploadedAt',
  Status = 'status'
}

export enum EEmployeeEventTableKey {
  OccurredAt = 'occurredAt',
  Actor = 'actorFullName',
  Content = 'message'
}
