import { EDependentStatus, ERelationship } from '~/shared/enums/common.enum'
import type { IDependent, IDocumentWarning, IPendingDocument } from '~/shared/models/employee.model'

// Sample dependents of design screen CmsHoSoThongTin — the API only returns `dependentCount` (checked against
// /v3/api-docs, 2026-10-01), so the "Người phụ thuộc" card shows this sample for every employee.
// TODO: remove once the BE adds the dependents list and the deduction amount
export const MOCK_EMPLOYEE_DEPENDENTS: IDependent[] = [
  {
    id: 1,
    fullName: 'Nguyễn Minh An',
    relationship: ERelationship.Child,
    birthDate: '2024-11-02',
    registeredMonth: '01/2025',
    status: EDependentStatus.Approved
  }
]

// VND per month
export const MOCK_DEPENDENT_DEDUCTION = 6_200_000

// "Chờ duyệt" / "Cảnh báo giấy tờ" cards of the documents tab (design CmsHoSoTaiLieu) — the API has no approval flow
// or expiry check for documents yet. TODO: remove once the BE adds them
export const MOCK_PENDING_DOCUMENTS: IPendingDocument[] = [
  { id: 1, fileName: 'HĐLĐ 0142-2025.pdf', uploadedAt: '2026-09-12' }
]

export const MOCK_DOCUMENT_WARNINGS: IDocumentWarning[] = [
  {
    id: 1,
    title: 'Giấy khám sức khoẻ đã hết hạn',
    description: 'Hết hạn 03/01/2026 · đề nghị nhân viên bổ sung bản mới.'
  }
]
