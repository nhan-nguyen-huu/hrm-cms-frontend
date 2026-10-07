import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import type { OnChangeFn, RowSelectionState } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FilterPanel from '~/components/common/filter-panel'
import TableCustom from '~/components/customs/table-custom'
import { paramsHelper } from '~/helpers'
import { employeeMgtColumn } from '~/helpers/columns/employee-mgt-column'
import { formHelper } from '~/helpers/form.helper'
import { type TFilterPanelDraftEmployeeFormSchema, getFilterPanelDraftEmployeeSchema } from '~/helpers/schema.helper'
import { useGetListDraftEmployeeApi } from '~/hooks/apis/use-employee-api'
import { usePagination } from '~/hooks/use-pagination'
import useQueryParams from '~/hooks/use-query-params'
import PageLayout from '~/layouts/page.layout'
import DraftProfileNote from '~/routes/dashboard/employee-mgt/employee-profile/components/draft-profile-note'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { EEmployeeProfileTab } from '~/shared/enums/common.enum'
import { EFilterPanelDraftEmployeeProfileFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'

const DEFAULT_VALUES: TFilterPanelDraftEmployeeFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelDraftEmployeeProfileFormKey.CurrentStep]: COMMON_CONSTANT.FILTER_ALL
}

interface IEmployeeDraftProps {
  tab?: EEmployeeProfileTab
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
}

const EmployeeDraft = ({ tab, rowSelection, onRowSelectionChange }: IEmployeeDraftProps) => {
  // Lib
  const { t } = useTranslation()

  // Query
  const { searchParams, setQuery, updateQueries } = useQueryParams()

  // Table
  const columns = employeeMgtColumn.getDraftEmployee(t)

  // Pagination
  const { paging, setPage, setSize, getResetPaging, getSearchPaging, resetPaging } = usePagination()

  // Form
  const filterPanelSchema = getFilterPanelDraftEmployeeSchema()
  const filterPanelForm = useForm<TFilterPanelDraftEmployeeFormSchema>({
    resolver: zodResolver(filterPanelSchema),
    defaultValues: formHelper.getDefaultValuesDraftEmployee(searchParams, DEFAULT_VALUES),
    mode: 'all'
  })

  // Convert data
  const handleConvertData = () => {
    const formValues = filterPanelForm.getValues()
    return {
      ...paging,
      ...formValues,
      currentStep: formValues?.currentStep !== COMMON_CONSTANT.FILTER_ALL ? formValues?.currentStep : undefined
    }
  }

  const { dataList, isLoading, isRefetching, totalPage } = useGetListDraftEmployeeApi({
    params: handleConvertData()
  })

  // Search
  const handleSearch = () => {
    updateQueries({
      ...getSearchPaging,
      ...handleConvertData()
    })
  }

  // Reset
  const handleReset = () => {
    onRowSelectionChange?.({})
    filterPanelForm.reset(DEFAULT_VALUES)
    resetPaging()
    updateQueries({
      ...getResetPaging(),
      ...DEFAULT_VALUES
    })
  }

  // Sync data and url
  useEffect(() => {
    setQuery(paramsHelper.draftEmployeeToSearchParams(searchParams, DEFAULT_VALUES, tab))
  }, [])

  return (
    <PageLayout>
      <DraftProfileNote />
      {/* Filter */}
      <FilterPanel
        onSearch={handleSearch}
        onReset={handleReset}
        form={filterPanelForm}
        fields={[
          {
            type: 'INPUT_GROUP',
            name: EFilterPanelFormKey.Keyword,
            placeholder: t('inputPlaceholder.searchDraftEmployee')
          },
          {
            type: 'SELECT',
            name: EFilterPanelDraftEmployeeProfileFormKey.CurrentStep,
            options: DATA.GET_OPTIONS_ONBOARDING_STEP(t),
            hasAllOption: true,
            placeholderAllOption: t('inputPlaceholder.pausedStepAll')
          }
        ]}
      />

      {/* Table */}
      <TableCustom
        loading={isLoading || isRefetching}
        columns={columns}
        data={dataList}
        emptyText={t('empty.noData')}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        page={paging?.page}
        totalPage={totalPage}
        onPageChange={setPage}
        pageSize={paging?.size}
        onPageSizeChange={setSize}
        disableNavigationAll
      />
    </PageLayout>
  )
}

export default EmployeeDraft
