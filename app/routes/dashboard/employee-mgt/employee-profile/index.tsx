import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import ButtonAction from '~/components/actions/button-action'
import HeaderPage from '~/components/common/header-page'
import TabsCustom from '~/components/customs/tab-custom'
import useQueryParams from '~/hooks/use-query-params'
import useRowSelection from '~/hooks/use-row-selection'
import PageLayout from '~/layouts/page.layout'
import EmployeeDraft from '~/routes/dashboard/employee-mgt/employee-profile/components/employee-draft'
import EmployeeOfficialRecord from '~/routes/dashboard/employee-mgt/employee-profile/components/employee-official-record'
import { DATA } from '~/shared/constants/data.constant'
import { BASE_ROUTES } from '~/shared/constants/routes.constant'
import { EEmployeeProfileTab } from '~/shared/enums/common.enum'
import type { IDataTab } from '~/shared/models/common.model'

const EmployeeProfilePage = () => {
  // Lib
  const { t } = useTranslation()
  const { searchParams } = useQueryParams()
  const navi = useNavigate()

  // Table
  const { rowSelection, setRowSelection } = useRowSelection()

  // Tab
  const DATA_TAB = DATA.GET_OPTIONS_EMPLOYEE_PROFILE_TAB(t).map((item) => {
    return {
      ...item,
      count: 10
    }
  })

  const currentTab = (searchParams.get('tab') as EEmployeeProfileTab) ?? EEmployeeProfileTab.OfficialRecord
  const [tab, setTab] = useState<EEmployeeProfileTab>(currentTab)

  const handleChangeTab = (value: EEmployeeProfileTab) => {
    setTab(value)
  }

  const dataMapping: Record<EEmployeeProfileTab, IDataTab> = {
    [EEmployeeProfileTab.OfficialRecord]: {
      description: '248 nhân viên đang làm việc · 6 hồ sơ chờ duyệt thay đổi',
      actions: (
        <>
          <ButtonAction actionName={t('action.importExcel')} actionType='UPLOAD' />
          <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
          <ButtonAction
            actionName={t('action.addEmployee')}
            actionType='CREATE'
            onClick={() => navi(BASE_ROUTES.CREATE)}
          />
        </>
      ),
      content: <EmployeeOfficialRecord tab={tab} rowSelection={rowSelection} onRowSelectionChange={setRowSelection} />
    },
    [EEmployeeProfileTab.Draft]: {
      description: '5 hồ sơ nháp · 2 hồ sơ chưa cập nhật quá 7 ngày · 1 hồ sơ trùng dữ liệu',
      actions: (
        <>
          <ButtonAction actionName={t('action.deleteDraftProfile')} actionType='DELETE' />
          <ButtonAction
            actionName={t('action.addEmployee')}
            actionType='CREATE'
            onClick={() => navi(BASE_ROUTES.CREATE)}
          />
        </>
      ),
      content: <EmployeeDraft tab={tab} rowSelection={rowSelection} onRowSelectionChange={setRowSelection} />
    }
  }

  const dataTab = dataMapping[tab]

  return (
    <PageLayout>
      {/* Header */}
      <HeaderPage title={t('sidebarMenu.employeeMgt.employeeProfile')} description={dataTab?.description}>
        {/* Action */}
        <section className='flex items-center justify-end gap-3 flex-wrap'>{dataTab?.actions}</section>
      </HeaderPage>

      {/* Tab */}
      <TabsCustom value={tab} onChange={handleChangeTab} options={DATA_TAB} />

      {/* Content */}
      {dataTab?.content}
    </PageLayout>
  )
}

export default EmployeeProfilePage
