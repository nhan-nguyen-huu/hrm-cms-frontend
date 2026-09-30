import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import CardCustom from '~/components/customs/card-custom'
import EmployeeInfo from '~/components/tags/employee-info'
import RequestStatus from '~/components/tags/request-status'
import { commonHelper } from '~/helpers/common.helper'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import type { IRequest } from '~/shared/models/request.model'

interface IPendingRequestCardProps {
  requests: IRequest[]
  // "Xem tất cả" → the request & approval page
  viewAllPath: string
}

// "Đơn chờ duyệt" — latest requests still waiting for approval
const PendingRequestCard = ({ requests, viewAllPath }: IPendingRequestCardProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  return (
    <CardCustom
      title={t('title.pendingRequests')}
      classNameCardTitle='text-[15px] font-bold normal-case text-app-secondary'
      classNameCardContent='flex flex-col gap-3.5'
      action={
        <Link to={viewAllPath} className='text-[13px] font-semibold text-primary hover:underline'>
          {t('action.viewAll')}
        </Link>
      }
    >
      {requests.length ? (
        requests.map((request) => (
          <section key={request.id} className='flex items-center justify-between gap-3'>
            <section className='min-w-0 flex-1'>
              <EmployeeInfo
                name={request.employee?.name}
                description={commonHelper.getRequestSummary(t, getTranslateEnum, request) || '-'}
                avatarUrl={request.employee?.avatarUrl}
              />
            </section>
            <RequestStatus status={request.status} overdueDays={request.overdueDays} />
          </section>
        ))
      ) : (
        <p className='text-[13px] text-[#93A2B6]'>{t('empty.noData')}</p>
      )}
    </CardCustom>
  )
}

export default PendingRequestCard
