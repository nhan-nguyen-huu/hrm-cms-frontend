import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import TabsCustom from '~/components/customs/tab-custom'
import useQueryParams from '~/hooks/use-query-params'
import PageLayout from '~/layouts/page.layout'
import EmployeeDraft from '~/routes/dashboard/employee-mgt/employee-profile/components/employee-draft'
import EmployeeOfficialRecord from '~/routes/dashboard/employee-mgt/employee-profile/components/employee-official-record'
import { DATA } from '~/shared/constants/data.constant'
import { EEmployeeProfileTab } from '~/shared/enums/common.enum'

const EmployeeProfilePage = () => {
  // Lib
  const { t } = useTranslation()
  const { searchParams } = useQueryParams()
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
  return (
    <PageLayout>
      <TabsCustom value={tab} onChange={handleChangeTab} options={DATA_TAB} />
      {tab === EEmployeeProfileTab.OfficialRecord && <EmployeeOfficialRecord tab={tab} />}
      {tab === EEmployeeProfileTab.Draft && <EmployeeDraft />}
    </PageLayout>
  )
}

export default EmployeeProfilePage
