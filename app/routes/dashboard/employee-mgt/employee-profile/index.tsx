import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import ButtonAction from '~/components/actions/button-action'
import FilterPanel from '~/components/common/filter-panel'
import HeaderPage from '~/components/common/header-page'
import TableCustom from '~/components/customs/table-custom'
import { employeeMgtColumn } from '~/helpers/columns/employee-mgt-column'
import {
  type TFilterPanelEmployeeProfileFormSchema,
  getFilterPanelEmployeeProfileSchema
} from '~/helpers/schema.helper'
import { usePagination } from '~/hooks/use-pagination'
import useRowSelection from '~/hooks/use-row-selection'
import { generateMockEmployees } from '~/shared/constants/mock-employee.constant'
import { BASE_ROUTES } from '~/shared/constants/routes.constant'
import { EFilterPanelEmployeeProfileFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'

const DEFAULT_VALUES: TFilterPanelEmployeeProfileFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus]: null
}

const MOCK_EMPLOYEES = generateMockEmployees(10)

const EmployeeProfilePage = () => {
  const navi = useNavigate()
  const { t } = useTranslation()
  const columns = employeeMgtColumn.getMembership(t)
  const { rowSelection, setRowSelection } = useRowSelection()
  const { paging, setPage, setSize } = usePagination({ isNoSyncParams: true })
  const filterPanelSchema = getFilterPanelEmployeeProfileSchema()
  const filterPanelForm = useForm<TFilterPanelEmployeeProfileFormSchema>({
    resolver: zodResolver(filterPanelSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'all'
  })
  return (
    // .
    <section className='flex flex-col gap-4'>
      {/* <OrgPosition
        departmentName='Kỹ thuật'
        projectName='SP Core Platform'
        memberCount={32}
        managerName='Trần Quốc Hưng'
        employeeName='Đặng Hoài Nam'
      /> */}
      <HeaderPage
        title={t('sidebarMenu.employeeMgt.employeeProfile')}
        description='248 nhân viên đang làm việc · 6 hồ sơ chờ duyệt thay đổi'
      >
        <section className='flex items-center justify-end gap-3 flex-wrap'>
          <ButtonAction actionName={t('action.importExcel')} actionType='UPLOAD' />
          <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
          <ButtonAction
            actionName={t('action.addEmployee')}
            actionType='CREATE'
            onClick={() => navi(BASE_ROUTES.CREATE)}
          />
        </section>
      </HeaderPage>
      <FilterPanel form={filterPanelForm} placeholderKeyword='Tên, mã nhân viên, email...' />
      <TableCustom
        // loading={isLoading || isRefetching}
        columns={columns}
        data={MOCK_EMPLOYEES}
        emptyText={t('empty.noData')}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row?.code}
        page={paging?.page}
        totalPage={1000}
        onPageChange={setPage}
        pageSize={paging?.size}
        onPageSizeChange={setSize}
        disableNavigationAll
      />
    </section>
  )
}

export default EmployeeProfilePage
