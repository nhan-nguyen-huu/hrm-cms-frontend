import { useTranslation } from 'react-i18next'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { ERequestStatus } from '~/shared/enums/common.enum'

interface IRequestStatusProps {
  status?: ERequestStatus
  // Days past the approval SLA — shown instead of the status while the request is still pending
  overdueDays?: number
}

const RequestStatus = ({ status, overdueDays }: IRequestStatusProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const classNameVariant: Record<ERequestStatus, string> = {
    [ERequestStatus.PendingManager]: 'bg-amber-100 text-amber-700',
    [ERequestStatus.PendingHr]: 'bg-orange-100 text-orange-700',
    [ERequestStatus.Approved]: 'bg-green-100 text-green-700',
    [ERequestStatus.Rejected]: 'bg-gray-100 text-gray-700'
  }
  const isPending = status === ERequestStatus.PendingManager || status === ERequestStatus.PendingHr
  if (isPending && overdueDays && overdueDays > 0) {
    return (
      <TagBadgeLayout className='bg-red-100 text-red-700'>
        {t('common.overdueDays', { count: overdueDays })}
      </TagBadgeLayout>
    )
  }
  return (
    <TagBadgeLayout className={status ? classNameVariant[status] : 'bg-gray-100 text-gray-700'}>
      {getTranslateEnum({ enumPath: 'requestStatus', enumType: ERequestStatus, value: status })}
    </TagBadgeLayout>
  )
}

export default RequestStatus
