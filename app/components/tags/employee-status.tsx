import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { EEmployeeStatus } from '~/shared/enums/common.enum'

interface IEmployeeStatusProps {
  status: EEmployeeStatus
}
const EmployeeStatus = ({ status }: IEmployeeStatusProps) => {
  const { getTranslateEnum } = useTransferEnum()
  const classNameVariant: Record<EEmployeeStatus, string> = {
    [EEmployeeStatus.All]: '',
    [EEmployeeStatus.PendingOnboard]: 'bg-amber-100 text-amber-700',
    [EEmployeeStatus.Active]: 'bg-green-100 text-green-700',
    [EEmployeeStatus.Suspended]: 'bg-orange-100 text-orange-700',
    [EEmployeeStatus.Terminated]: 'bg-red-100 text-red-700',
    [EEmployeeStatus.Probation]: 'bg-blue-100 text-blue-700'
  }
  return (
    <TagBadgeLayout className={classNameVariant[status]}>
      {getTranslateEnum({
        enumPath: 'employeeStatus',
        enumType: EEmployeeStatus,
        value: status
      })}
    </TagBadgeLayout>
  )
}

export default EmployeeStatus
