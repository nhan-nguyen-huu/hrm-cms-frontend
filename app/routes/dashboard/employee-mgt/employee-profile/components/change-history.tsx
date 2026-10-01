import { useEffect, useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FilterPanel from '~/components/common/filter-panel'
import TableCustom from '~/components/customs/table-custom'
import { paramsHelper } from '~/helpers'
import { employeeEventColumn } from '~/helpers/columns/employee-event-column'
import { commonHelper } from '~/helpers/common.helper'
import { formHelper } from '~/helpers/form.helper'
import { type TFilterPanelEmployeeEventFormSchema, getFilterPanelEmployeeEventSchema } from '~/helpers/schema.helper'
import { useGetEmployeeEventsApi } from '~/hooks/apis/use-employee-api'
import { DEFAULT_PAGING, usePagination } from '~/hooks/use-pagination'
import useQueryParams from '~/hooks/use-query-params'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import PageLayout from '~/layouts/page.layout'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { EEmployeeProfileDetailTab, EOrgEventType } from '~/shared/enums/common.enum'
import { EFilterPanelEmployeeEventFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'
import type { IEmployee } from '~/shared/models/employee.model'

const DEFAULT_VALUES: TFilterPanelEmployeeEventFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelEmployeeEventFormKey.EventType]: EOrgEventType.All,
  [EFilterPanelEmployeeEventFormKey.Actor]: COMMON_CONSTANT.FILTER_ALL
}

interface IChangeHistoryProfileProps {
  data?: IEmployee
}

// "Lịch sử thay đổi" tab of the employee detail (design CmsHoSoLichSu) — events about this person, newest first
const ChangeHistoryProfile = ({ data }: IChangeHistoryProfileProps) => {
  // Lib
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const userId = data?.id

  // Query
  const { searchParams, setQuery, updateQueries } = useQueryParams()

  // Table
  const columns = employeeEventColumn.getList(t, getTranslateEnum)

  // Pagination
  const { paging, setPage, setSize, getResetPaging, getSearchPaging, resetPaging } = usePagination()

  // Form
  const filterPanelForm = useForm<TFilterPanelEmployeeEventFormSchema>({
    resolver: zodResolver(getFilterPanelEmployeeEventSchema()),
    defaultValues: formHelper.getDefaultValuesEmployeeEvent(searchParams, DEFAULT_VALUES),
    mode: 'all'
  })

  // Convert data
  const handleConvertData = () => ({ ...paging, ...filterPanelForm.getValues() })

  // API — returns every event (no paging / filter params), so the applied filters (URL) are used client-side
  const {
    data: events,
    isLoading,
    isRefetching
  } = useGetEmployeeEventsApi({
    id: userId,
    options: { enabled: !!userId }
  })
  const keyword = searchParams.get(EFilterPanelFormKey.Keyword)
  const eventType = searchParams.get(EFilterPanelEmployeeEventFormKey.EventType)
  const actor = searchParams.get(EFilterPanelEmployeeEventFormKey.Actor)
  const isAll = (value: string | null) => !value || value === COMMON_CONSTANT.FILTER_ALL
  const filteredEvents = useMemo(
    () =>
      (events ?? [])
        .filter(
          (event) =>
            commonHelper.includesKeyword(keyword, event.message, event.note, event.actorFullName) &&
            (isAll(eventType) || event.eventType === eventType) &&
            (isAll(actor) || event.actorFullName === actor)
        )
        .sort((a, b) => dayjs(b.occurredAt).valueOf() - dayjs(a.occurredAt).valueOf()),
    [events, keyword, eventType, actor]
  )
  const { items, totalPage, page } = commonHelper.paginate(filteredEvents, paging.page, paging.size)

  // Search
  const handleSearch = () => {
    setPage(DEFAULT_PAGING.PAGE)
    updateQueries({ ...getSearchPaging(), ...handleConvertData() })
  }

  // Reset
  const handleReset = () => {
    filterPanelForm.reset(DEFAULT_VALUES)
    resetPaging()
    updateQueries({ ...getResetPaging(), ...DEFAULT_VALUES })
  }

  // Sync data and url
  useEffect(() => {
    setQuery(
      paramsHelper.employeeEventToSearchParams(searchParams, DEFAULT_VALUES, EEmployeeProfileDetailTab.ChangeHistory)
    )
  }, [])

  return (
    <PageLayout>
      {/* Filter */}
      <FilterPanel
        onSearch={handleSearch}
        onReset={handleReset}
        form={filterPanelForm}
        fields={[
          {
            type: 'INPUT_GROUP',
            name: EFilterPanelFormKey.Keyword,
            placeholder: t('inputPlaceholder.searchChangeHistory')
          },
          {
            type: 'SELECT',
            name: EFilterPanelEmployeeEventFormKey.EventType,
            options: DATA.GET_OPTIONS_ORG_EVENT_TYPE(t)
          },
          {
            type: 'SELECT',
            name: EFilterPanelEmployeeEventFormKey.Actor,
            options: DATA.GET_OPTIONS_EVENT_ACTOR(t, events ?? [])
          }
        ]}
      />

      {/* Table */}
      <TableCustom
        headerTitle={t('title.changeHistory')}
        totalItems={filteredEvents.length}
        loading={isLoading || isRefetching}
        columns={columns}
        data={items}
        emptyText={t('empty.noData')}
        getRowId={(row) => String(row.id)}
        page={page}
        totalPage={totalPage}
        onPageChange={setPage}
        pageSize={paging.size}
        onPageSizeChange={setSize}
        // Read-only log, no detail page
        disableNavigationAll
      />
    </PageLayout>
  )
}

export default ChangeHistoryProfile
