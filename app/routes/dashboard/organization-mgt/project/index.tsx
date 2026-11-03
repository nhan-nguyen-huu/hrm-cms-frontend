import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import FilterPanel from '~/components/common/filter-panel'
import TableCustom from '~/components/customs/table-custom'
import { paramsHelper } from '~/helpers'
import { organizationMgtColumn } from '~/helpers/columns/organization-mgt-column'
import { formHelper } from '~/helpers/form.helper'
import { type TFilterPanelProjectFormSchema, getFilterPanelProjectSchema } from '~/helpers/schema.helper'
import { useGetListDepartmentApi } from '~/hooks/apis/use-department-api'
import { useGetListProjectApi } from '~/hooks/apis/use-project-api'
import { usePagination } from '~/hooks/use-pagination'
import useQueryParams from '~/hooks/use-query-params'
import PageLayout from '~/layouts/page.layout'
import OrganizationHeaderPage from '~/routes/dashboard/organization-mgt/components/organization-header-page'
import OrganizationTabs from '~/routes/dashboard/organization-mgt/components/organization-tabs'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { EProjectStatus } from '~/shared/enums/common.enum'
import { EFilterPanelFormKey, EFilterPanelProjectFormKey } from '~/shared/enums/form.enum'
import type { IProjectParams } from '~/shared/models/project.model'

const DEFAULT_VALUES: TFilterPanelProjectFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelProjectFormKey.Department]: COMMON_CONSTANT.FILTER_ALL,
  [EFilterPanelProjectFormKey.Status]: EProjectStatus.All
}

// Departments of the filter select — TODO: one page is enough for now; switch to a searchable select if it grows
const DEPARTMENT_OPTIONS_PARAMS = { page: 0, size: 200 }

const ProjectPage = () => {
  // Lib
  const { t } = useTranslation()

  // Query
  const { searchParams, setQuery, updateQueries } = useQueryParams()

  // Table
  const columns = organizationMgtColumn.getProject(t)

  // Pagination
  const { paging, setPage, setSize, getResetPaging, getSearchPaging, resetPaging } = usePagination()

  // Form
  const filterPanelForm = useForm<TFilterPanelProjectFormSchema>({
    resolver: zodResolver(getFilterPanelProjectSchema()),
    defaultValues: formHelper.getDefaultValuesProject(searchParams, DEFAULT_VALUES),
    mode: 'all'
  })

  // Convert data — written to the URL as is (ALL kept, so the selects show "Tất cả" after F5)
  const handleConvertData = () => ({ ...paging, ...filterPanelForm.getValues() })

  // Sent to the API: ids as numbers, ALL dropped
  const getApiParams = (): IProjectParams => {
    const { departmentId, status, ...values } = handleConvertData()
    return {
      ...values,
      departmentId: departmentId && departmentId !== COMMON_CONSTANT.FILTER_ALL ? Number(departmentId) : undefined,
      // TODO: send ALL once BE supports it (ProjectCriteria.status is an enum, ALL fails to bind)
      status: status && status !== EProjectStatus.All ? status : undefined
    }
  }

  const { dataList, isLoading, isRefetching, totalPage, totalElement } = useGetListProjectApi({
    params: getApiParams()
  })
  const { dataList: departments } = useGetListDepartmentApi({ params: DEPARTMENT_OPTIONS_PARAMS })

  // Search
  const handleSearch = () => {
    updateQueries({
      ...handleConvertData(),
      ...getSearchPaging()
    })
  }

  // Reset
  const handleReset = () => {
    filterPanelForm.reset(DEFAULT_VALUES)
    resetPaging()
    updateQueries({
      ...getResetPaging(),
      ...DEFAULT_VALUES
    })
  }

  // Sync data and url
  useEffect(() => {
    setQuery(paramsHelper.projectToSearchParams(searchParams, DEFAULT_VALUES))
  }, [])

  return (
    <PageLayout>
      {/* TODO: per-status counts (running / ending soon / kick-off / completed) need a summary API */}
      <OrganizationHeaderPage description={t('common.projectTotal', { total: totalElement ?? 0 })}>
        <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
        <ButtonAction actionName={t('action.addProject')} actionType='CREATE' />
      </OrganizationHeaderPage>
      <OrganizationTabs />

      {/* Filter — the design's year filter is left out: the API has no year param (only activeOn) */}
      <FilterPanel
        form={filterPanelForm}
        onSearch={handleSearch}
        onReset={handleReset}
        fields={[
          {
            type: 'INPUT_GROUP',
            name: EFilterPanelFormKey.Keyword,
            placeholder: t('inputPlaceholder.searchProject')
          },
          {
            type: 'SELECT',
            name: EFilterPanelProjectFormKey.Department,
            placeholder: t('inputPlaceholder.departmentAll'),
            options: DATA.GET_OPTIONS_DEPARTMENT(t, departments)
          },
          {
            type: 'SELECT',
            name: EFilterPanelProjectFormKey.Status,
            placeholder: t('inputLabel.status'),
            options: DATA.GET_OPTIONS_PROJECT_STATUS(t)
          }
        ]}
      />

      {/* Table */}
      <TableCustom
        loading={isLoading || isRefetching}
        columns={columns}
        data={dataList}
        emptyText={t('empty.noData')}
        totalItems={totalElement}
        page={paging?.page}
        totalPage={totalPage}
        onPageChange={setPage}
        pageSize={paging?.size}
        onPageSizeChange={setSize}
      />
    </PageLayout>
  )
}

export default ProjectPage
