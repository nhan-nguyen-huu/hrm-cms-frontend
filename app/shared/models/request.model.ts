import type { EDepartment, ERequestStatus, ERequestType } from '~/shared/enums/common.enum'

// Employee who sent the request, or the manager who approved it
export interface IRequestEmployee {
  code?: string
  name?: string
  email?: string
  jobTitle?: string
  department?: EDepartment
  avatarUrl?: string
}

export interface IRequestAttachment {
  name?: string
  // Bytes
  size?: number
  url?: string
}

// TODO(assumption): field names follow the design until the request API exists — confirm with BE
export interface IRequest {
  id?: string
  type?: ERequestType
  status?: ERequestStatus
  employee?: IRequestEmployee
  // Full dates, ISO format (YYYY-MM-DD); toDate is missing for single-day requests
  fromDate?: string
  toDate?: string
  // Leave days requested (0.5 steps); missing for requests that are not leave
  days?: number
  // Leave balance before and after this request is approved
  leaveBalanceBefore?: number
  leaveBalanceAfter?: number
  reason?: string
  attachment?: IRequestAttachment
  // Line manager step (first approval level)
  manager?: IRequestEmployee
  // Date-times, ISO format: when the line manager / HR approved or rejected
  managerReviewedAt?: string
  hrReviewedAt?: string
  submittedAt?: string
  // Days past the approval SLA; missing or 0 when still within SLA — TODO(assumption): computed by BE
  overdueDays?: number
}
