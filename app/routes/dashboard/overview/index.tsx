import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import HeaderPage from '~/components/common/header-page'
import StatCard from '~/components/customs/stat-card'
import { DATE_FORMAT_SLASH, DATE_FORMAT_TIME, dateHelper } from '~/helpers/date.helper'
import DepartmentHeadcountChart from '~/routes/dashboard/overview/components/department-headcount-chart'
import ExpiringContractCard from '~/routes/dashboard/overview/components/expiring-contract-card'
import HeadcountTrendChart from '~/routes/dashboard/overview/components/headcount-trend-chart'
import PendingRequestCard from '~/routes/dashboard/overview/components/pending-request-card'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { MOCK_EXPIRING_CONTRACTS, MOCK_OVERVIEW_SUMMARY } from '~/shared/constants/mock-overview.constant'
import { MOCK_REQUESTS } from '~/shared/constants/mock-request.constant'
import { ROUTES } from '~/shared/constants/routes.constant'
import { ERequestStatus } from '~/shared/enums/common.enum'

// "Tổng quan nhân sự" (design screen CmsTongQuan)
const OverviewPage = () => {
  const { t } = useTranslation()
  const { BASE, EMPLOYEE_MGT, REQUEST_MGT } = ROUTES.DASHBOARD

  // TODO: replace mocks with the dashboard / request / contract APIs once available
  const summary = MOCK_OVERVIEW_SUMMARY
  const pendingRequests = MOCK_REQUESTS.filter(
    (request) => request.status === ERequestStatus.PendingManager || request.status === ERequestStatus.PendingHr
  ).slice(0, COMMON_CONSTANT.OVERVIEW_LIST_SIZE)
  const expiringContracts = MOCK_EXPIRING_CONTRACTS.slice(0, COMMON_CONSTANT.OVERVIEW_LIST_SIZE)

  return (
    <section className='flex flex-col gap-4'>
      <HeaderPage
        title={t('title.hrOverview')}
        description={t('common.updatedAt', {
          time: dateHelper.formatDate(summary.updatedAt, DATE_FORMAT_TIME, '-'),
          date: dateHelper.formatDate(summary.updatedAt, DATE_FORMAT_SLASH, '-')
        })}
      >
        {/* TODO: export the overview report once the API exists */}
        <ButtonAction actionName={t('action.exportReport')} actionType='DOWNLOAD' />
      </HeaderPage>

      <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {DATA.GET_OVERVIEW_STATS(t, summary).map(({ key, ...item }) => (
          <StatCard key={key} {...item} />
        ))}
      </section>

      <section className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_370px]'>
        <section className='flex min-w-0 flex-col gap-4'>
          <DepartmentHeadcountChart summary={summary} />
          <HeadcountTrendChart summary={summary} />
        </section>
        <section className='flex flex-col gap-4'>
          <PendingRequestCard requests={pendingRequests} viewAllPath={`/${BASE}/${REQUEST_MGT.BASE}`} />
          <ExpiringContractCard
            contracts={expiringContracts}
            viewAllPath={`/${BASE}/${EMPLOYEE_MGT.BASE}/${EMPLOYEE_MGT.EMPLOYEE_PROFILE}`}
          />
        </section>
      </section>
    </section>
  )
}

export default OverviewPage
