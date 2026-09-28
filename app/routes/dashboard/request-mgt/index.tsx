import { useMemo, useState } from 'react'

import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { EmptyIcon } from '~/assets/svgs'
import ButtonAction from '~/components/actions/button-action'
import FilterTabs from '~/components/common/filter-tabs'
import HeaderPage from '~/components/common/header-page'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import RequestDetailCard from '~/routes/dashboard/request-mgt/components/request-detail-card'
import RequestListItem from '~/routes/dashboard/request-mgt/components/request-list-item'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { MOCK_REQUESTS } from '~/shared/constants/mock-request.constant'
import { ERequestStatus, ERequestStatusFilter } from '~/shared/enums/common.enum'
import type { IRequest } from '~/shared/models/request.model'

const isPending = (request: IRequest) =>
  request.status === ERequestStatus.PendingManager || request.status === ERequestStatus.PendingHr

const MATCH_FILTER: Record<ERequestStatusFilter, (request: IRequest) => boolean> = {
  [ERequestStatusFilter.Pending]: isPending,
  [ERequestStatusFilter.Approved]: (request) => request.status === ERequestStatus.Approved,
  [ERequestStatusFilter.Rejected]: (request) => request.status === ERequestStatus.Rejected,
  [ERequestStatusFilter.All]: () => true
}

const RequestMgtPage = () => {
  const { t } = useTranslation()
  // TODO: replace MOCK_REQUESTS with the request list API; approve/reject only update local state until then
  const [requests, setRequests] = useState<IRequest[]>(MOCK_REQUESTS)
  const [statusFilter, setStatusFilter] = useState<ERequestStatusFilter>(ERequestStatusFilter.Pending)
  // Request shown in the detail panel (row click) — separate from the ticked ones (bulk approval)
  const [activeId, setActiveId] = useState<string>()
  const [checkedIds, setCheckedIds] = useState<string[]>([])

  const filteredRequests = useMemo(() => requests.filter(MATCH_FILTER[statusFilter]), [requests, statusFilter])
  const activeRequest = filteredRequests.find((request) => request.id === activeId) ?? filteredRequests[0]
  // Only pending requests can be approved in bulk
  const checkedPendingIds = requests
    .filter((request) => isPending(request) && checkedIds.includes(request.id ?? ''))
    .map((request) => request.id ?? '')

  const pendingCount = requests.filter(MATCH_FILTER[ERequestStatusFilter.Pending]).length
  const overdueCount = requests.filter((request) => isPending(request) && (request.overdueDays ?? 0) > 0).length
  const tabs = DATA.GET_REQUEST_STATUS_TABS(t, {
    [ERequestStatusFilter.Pending]: pendingCount,
    [ERequestStatusFilter.Approved]: requests.filter(MATCH_FILTER[ERequestStatusFilter.Approved]).length,
    [ERequestStatusFilter.Rejected]: requests.filter(MATCH_FILTER[ERequestStatusFilter.Rejected]).length
  })

  // TODO(assumption): HR can decide any pending request, including ones still waiting for the line manager
  const reviewRequests = (ids: string[], status: ERequestStatus.Approved | ERequestStatus.Rejected) => {
    const reviewedAt = new Date().toISOString()
    setRequests((prev) =>
      prev.map((request) =>
        request.id && ids.includes(request.id) ? { ...request, status, hrReviewedAt: reviewedAt } : request
      )
    )
    setCheckedIds((prev) => prev.filter((id) => !ids.includes(id)))
  }

  // TODO: send the note (RequestDetailCard passes it as the first argument) with the approve/reject API
  const handleReview = (status: ERequestStatus.Approved | ERequestStatus.Rejected) => () => {
    if (!activeRequest?.id) return
    reviewRequests([activeRequest.id], status)
    const name = activeRequest.employee?.name ?? '-'
    toast.success(
      t(status === ERequestStatus.Approved ? 'msg.approveRequestSuccess' : 'msg.rejectRequestSuccess', { name })
    )
  }

  const handleApproveChecked = () => {
    reviewRequests(checkedPendingIds, ERequestStatus.Approved)
    toast.success(t('msg.approveRequestsSuccess', { count: checkedPendingIds.length }))
  }

  const toggleChecked = (id: string, checked: boolean) =>
    setCheckedIds((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)))

  return (
    <section className='flex flex-col gap-4'>
      <HeaderPage
        title={t('sidebarMenu.requestMgt.base')}
        description={t('common.requestSummary', {
          pending: pendingCount,
          overdue: overdueCount,
          slaDays: COMMON_CONSTANT.REQUEST_SLA_DAYS
        })}
      >
        <section className='flex flex-wrap items-center justify-end gap-3'>
          {/* TODO: export once the request API exists */}
          <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
          <Button disabled={!checkedPendingIds.length} onClick={handleApproveChecked}>
            <Check className='size-4' />
            <span>{t('action.approveSelected', { count: checkedPendingIds.length })}</span>
          </Button>
        </section>
      </HeaderPage>
      <FilterTabs
        items={tabs}
        value={statusFilter}
        onValueChange={(value) => setStatusFilter(value as ERequestStatusFilter)}
      />
      <section className='grid items-start gap-4 xl:grid-cols-[minmax(0,430px)_minmax(0,1fr)]'>
        <Card className='gap-1 px-3'>
          {filteredRequests.length ? (
            <section className='flex max-h-[calc(100vh-260px)] flex-col gap-1 overflow-y-auto'>
              {filteredRequests.map((request, index) => (
                <RequestListItem
                  key={request.id ?? index}
                  request={request}
                  isActive={request === activeRequest}
                  isChecked={!!request.id && checkedIds.includes(request.id)}
                  onSelect={() => setActiveId(request.id)}
                  onCheckedChange={(checked) => request.id && toggleChecked(request.id, checked)}
                />
              ))}
            </section>
          ) : (
            <section className='flex flex-col items-center gap-2 py-10 text-[13px] text-[#6E7F96]'>
              <EmptyIcon className='size-16' />
              <p>{t('empty.noRequest')}</p>
            </section>
          )}
        </Card>
        {activeRequest && (
          <RequestDetailCard
            key={activeRequest.id}
            request={activeRequest}
            onApprove={handleReview(ERequestStatus.Approved)}
            onReject={handleReview(ERequestStatus.Rejected)}
          />
        )}
      </section>
    </section>
  )
}

export default RequestMgtPage
