import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import ButtonAction from '~/components/actions/button-action'
import FilterPanel from '~/components/common/filter-panel'
import HeaderPage from '~/components/common/header-page'
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
import useRowSelection from '~/hooks/use-row-selection'
import PageLayout from '~/layouts/page.layout'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { BASE_ROUTES } from '~/shared/constants/routes.constant'
import { EEmployeeStatus } from '~/shared/enums/common.enum'
import { EFilterPanelEmployeeProfileFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'

const DEFAULT_VALUES: TFilterPanelEmployeeProfileFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelEmployeeProfileFormKey.EmploymentStatus]: EEmployeeStatus.All
}

const EmployeeProfilePage = () => {
  // Lib
  const navi = useNavigate()
  const { t } = useTranslation()

  // Query
  const { searchParams, updateQueries, setQuery } = useQueryParams()

  // Table
  const columns = employeeMgtColumn.getEmployee(t)
  const { rowSelection, setRowSelection } = useRowSelection()

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
    filterPanelForm.reset(DEFAULT_VALUES)
    resetPaging()
    updateQueries({
      ...getResetPaging(),
      ...DEFAULT_VALUES
    })
  }

  // Sync data and url
  useEffect(() => {
    setQuery(paramsHelper.employeeToSearchParams(searchParams, DEFAULT_VALUES))
  }, [])

  return (
    <PageLayout>
      {/* Header */}
      <HeaderPage
        title={t('sidebarMenu.employeeMgt.employeeProfile')}
        description='248 nhân viên đang làm việc · 6 hồ sơ chờ duyệt thay đổi'
      >
        {/* Action */}
        <section className='flex items-center justify-end gap-3 flex-wrap'>
          <ButtonAction
            actionName={t('action.importExcel')}
            actionType='UPLOAD'
            onClick={() => {
              console.log('data: ', filterPanelForm.getValues())
            }}
          />
          <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
          <ButtonAction
            actionName={t('action.addEmployee')}
            actionType='CREATE'
            onClick={() => navi(BASE_ROUTES.CREATE)}
          />
        </section>
      </HeaderPage>

      {/* Filter */}
      <FilterPanel
        onSearch={handleSearch}
        onReset={handleReset}
        form={filterPanelForm}
        fields={[
          {
            type: 'INPUT_GROUP',
            name: EFilterPanelFormKey.Keyword,
            placeholder: 'Tên, mã nhân viên, email...'
          },
          {
            type: 'SELECT',
            name: EFilterPanelEmployeeProfileFormKey.EmploymentStatus,
            options: DATA.GET_OPTIONS_EMPLOYEE_STATUS(t),
            placeholder: 'Chọn account status'
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
        onRowSelectionChange={setRowSelection}
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

export default EmployeeProfilePage
