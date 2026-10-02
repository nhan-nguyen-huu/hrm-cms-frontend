import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { EDependentStatus } from '~/shared/enums/common.enum'

interface IDependentStatusProps {
  status?: EDependentStatus
}
const DependentStatus = ({ status }: IDependentStatusProps) => {
  const { getTranslateEnum } = useTransferEnum()
  const classNameVariant: Record<EDependentStatus, string> = {
    [EDependentStatus.Pending]: 'bg-amber-100 text-amber-700',
    [EDependentStatus.Approved]: 'bg-green-100 text-green-700',
    [EDependentStatus.Rejected]: 'bg-gray-100 text-gray-700'
  }
  return (
    <TagBadgeLayout className={status ? classNameVariant[status] : 'bg-gray-100 text-gray-700'}>
      {getTranslateEnum({ enumPath: 'dependentStatus', enumType: EDependentStatus, value: status })}
    </TagBadgeLayout>
  )
}

export default DependentStatus
