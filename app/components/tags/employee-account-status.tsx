import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { EEmployeeAccountStatus } from '~/shared/enums/common.enum'

interface IEmployeeAccountStatusProps {
  status: EEmployeeAccountStatus
}
const EmployeeAccountStatus = ({ status }: IEmployeeAccountStatusProps) => {
  const { getTranslateEnum } = useTransferEnum()
  const classNameVariant: Record<EEmployeeAccountStatus, string> = {
    [EEmployeeAccountStatus.Working]: 'bg-green-100 text-green-700',
    [EEmployeeAccountStatus.MaternityLeave]: 'bg-amber-100 text-amber-700',
    [EEmployeeAccountStatus.Terminated]: 'bg-gray-100 text-gray-700'
  }
  return (
    <TagBadgeLayout className={classNameVariant[status]}>
      {getTranslateEnum({
        enumPath: 'employeeAccountStatus',
        enumType: EEmployeeAccountStatus,
        value: status
      })}
    </TagBadgeLayout>
  )
}

export default EmployeeAccountStatus
