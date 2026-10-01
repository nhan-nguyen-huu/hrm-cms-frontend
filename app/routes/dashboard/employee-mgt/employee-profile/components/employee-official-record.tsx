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
import {
  type TFilterPanelEmployeeProfileFormSchema,
  getFilterPanelEmployeeProfileSchema
} from '~/helpers/schema.helper'
import { useGetListEmployeeApi } from '~/hooks/apis/use-employee-api'
import { usePagination } from '~/hooks/use-pagination'
import useQueryParams from '~/hooks/use-query-params'
import PageLayout from '~/layouts/page.layout'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { EEmployeeProfileTab, EEmployeeStatus } from '~/shared/enums/common.enum'
import { EFilterPanelEmployeeProfileFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'

const DEFAULT_VALUES: TFilterPanelEmployeeProfileFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelEmployeeProfileFormKey.EmploymentStatus]: EEmployeeStatus.All
}

interface IEmployeeOfficialRecordProps {
  tab?: EEmployeeProfileTab
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
}

const EmployeeOfficialRecord = ({ tab, rowSelection, onRowSelectionChange }: IEmployeeOfficialRecordProps) => {
  // Lib
  const { t } = useTranslation()

  // Query
  const { searchParams, setQuery, updateQueries } = useQueryParams()

  // Table
  const columns = employeeMgtColumn.getEmployee(t)

  // Pagination
  const { paging, setPage, setSize, getResetPaging, getSearchPaging, resetPaging } = usePagination()

  // Form
  const filterPanelSchema = getFilterPanelEmployeeProfileSchema()
  const filterPanelForm = useForm<TFilterPanelEmployeeProfileFormSchema>({
    resolver: zodResolver(filterPanelSchema),
    defaultValues: formHelper.getDefaultValuesEmployee(searchParams, DEFAULT_VALUES),
    mode: 'all'
  })

  // Convert data
  const handleConvertData = () => {
    const formValues = filterPanelForm.getValues()
    return {
      ...paging,
      ...formValues,
      employmentStatus:
        formValues?.employmentStatus !== COMMON_CONSTANT.FILTER_ALL ? formValues?.employmentStatus : undefined
    }
  }

  const { dataList, isLoading, isRefetching, totalPage } = useGetListEmployeeApi({
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
    setQuery(paramsHelper.employeeToSearchParams(searchParams, DEFAULT_VALUES, tab))
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
            placeholder: t('inputPlaceholder.searchEmployee')
          },
          {
            type: 'SELECT',
            name: EFilterPanelEmployeeProfileFormKey.EmploymentStatus,
            options: DATA.GET_OPTIONS_EMPLOYEE_STATUS(t)
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
      />
    </PageLayout>
  )
}

export default EmployeeOfficialRecord
