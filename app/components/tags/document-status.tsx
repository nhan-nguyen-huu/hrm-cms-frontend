import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { EEmployeeDocumentStatus } from '~/shared/enums/common.enum'

interface IDocumentStatusProps {
  status?: EEmployeeDocumentStatus
}
const DocumentStatus = ({ status }: IDocumentStatusProps) => {
  const { getTranslateEnum } = useTransferEnum()
  if (!status) return <span className='text-[#93A2B6]'>-</span>
  const classNameVariant: Record<EEmployeeDocumentStatus, string> = {
    [EEmployeeDocumentStatus.All]: '',
    [EEmployeeDocumentStatus.Valid]: 'bg-green-100 text-green-700',
    [EEmployeeDocumentStatus.Pending]: 'bg-amber-100 text-amber-700',
    [EEmployeeDocumentStatus.Superseded]: 'bg-gray-100 text-gray-600',
    [EEmployeeDocumentStatus.Expired]: 'bg-red-100 text-red-700'
  }
  return (
    <TagBadgeLayout className={classNameVariant[status]}>
      {getTranslateEnum({ enumPath: 'employeeDocumentStatus', enumType: EEmployeeDocumentStatus, value: status })}
    </TagBadgeLayout>
  )
}

export default DocumentStatus
