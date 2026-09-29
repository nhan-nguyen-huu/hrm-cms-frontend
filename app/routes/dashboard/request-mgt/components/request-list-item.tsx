import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import EmployeeInfo from '~/components/tags/employee-info'
import RequestStatus from '~/components/tags/request-status'
import { Checkbox } from '~/components/ui/checkbox'
import { commonHelper, dateHelper } from '~/helpers'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { ERequestType } from '~/shared/enums/common.enum'
import type { IRequest } from '~/shared/models/request.model'

interface IRequestListItemProps {
  request: IRequest
  // Request shown in the detail panel
  isActive: boolean
  // Ticked for bulk approval — independent of isActive
  isChecked: boolean
  onSelect: () => void
  onCheckedChange: (checked: boolean) => void
}

// One row of the request list: checkbox · employee + "Phép năm · 21–22/09 · 2,0 ngày" · status
const RequestListItem = ({ request, isActive, isChecked, onSelect, onCheckedChange }: IRequestListItemProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const summary = [
    request.type && getTranslateEnum({ enumPath: 'requestType', enumType: ERequestType, value: request.type }),
    dateHelper.formatShortDateRange(request.fromDate, request.toDate),
    request.days != null && t('common.dayCount', { value: commonHelper.formatNumber(request.days, 1, 1) })
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <section
      role='button'
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect()
        }
      }}
      className={clsx(
        'flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors outline-none',
        'focus-visible:ring-3 focus-visible:ring-ring/50',
        isActive ? 'border-primary bg-[#EEF4FC]' : 'border-transparent hover:bg-[#F7F9FC]'
      )}
    >
      {/* Ticking must not change the request shown in the detail panel */}
      <span onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
        <Checkbox checked={isChecked} onCheckedChange={(checked) => onCheckedChange(!!checked)} />
      </span>
      <section className='min-w-0 flex-1'>
        <EmployeeInfo
          name={request.employee?.name}
          description={summary || '-'}
          avatarUrl={request.employee?.avatarUrl}
        />
      </section>
      <section className='shrink-0'>
        <RequestStatus status={request.status} overdueDays={request.overdueDays} />
      </section>
    </section>
  )
}

export default RequestListItem
