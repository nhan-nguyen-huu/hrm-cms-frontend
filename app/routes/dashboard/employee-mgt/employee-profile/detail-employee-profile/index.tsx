import { useState } from 'react'

import { useParams } from 'react-router'
import SkelethonLoading from '~/components/loading/skelethon-loading'
import { useGetDetailEmployeeApi } from '~/hooks/apis/use-employee-api'
import useQueryParams from '~/hooks/use-query-params'
import PageLayout from '~/layouts/page.layout'
import ChangeHistoryProfile from '~/routes/dashboard/employee-mgt/employee-profile/components/change-history'
import ContractsAndSalaryProfile from '~/routes/dashboard/employee-mgt/employee-profile/components/contracts-and-salary'
import DocumentsProfile from '~/routes/dashboard/employee-mgt/employee-profile/components/documents'
import HeaderProfile from '~/routes/dashboard/employee-mgt/employee-profile/components/header-profile'
import OverViewProfile from '~/routes/dashboard/employee-mgt/employee-profile/components/overview-profile'
import PersonalInfoProfile from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info'
import TimeAndAttendanceProfile from '~/routes/dashboard/employee-mgt/employee-profile/components/time-and-attendance'
import { EEmployeeProfileDetailTab } from '~/shared/enums/common.enum'

const DetailEmployeeProfile = () => {
  const { id } = useParams()
  const { searchParams } = useQueryParams()
  const currentTab = (searchParams.get('tab') as EEmployeeProfileDetailTab) ?? EEmployeeProfileDetailTab.OverView
  const [tab, setTab] = useState(currentTab)

  // Data detail
  const {
    data: dataDetail,
    isLoading,
    isRefetching
  } = useGetDetailEmployeeApi({
    id: Number(id)
  })

  // Content by tab
  const tabContent = {
    [EEmployeeProfileDetailTab.OverView]: <OverViewProfile data={dataDetail} />,
    [EEmployeeProfileDetailTab.PersonalInfo]: <PersonalInfoProfile data={dataDetail} />,
    [EEmployeeProfileDetailTab.ContractsAndSalary]: <ContractsAndSalaryProfile data={dataDetail} />,
    [EEmployeeProfileDetailTab.TimeAndAttendance]: <TimeAndAttendanceProfile data={dataDetail} />,
    [EEmployeeProfileDetailTab.Documents]: <DocumentsProfile data={dataDetail} />,
    [EEmployeeProfileDetailTab.ChangeHistory]: <ChangeHistoryProfile data={dataDetail} />
  }
  return (
    <PageLayout>
      <SkelethonLoading loading={isLoading || isRefetching}>
        <HeaderProfile tab={tab} onChangeTab={setTab} data={dataDetail} />
      </SkelethonLoading>
      <SkelethonLoading loading={isLoading || isRefetching}>{tabContent[tab]}</SkelethonLoading>
    </PageLayout>
  )
}

export default DetailEmployeeProfile
