import { useTranslation } from 'react-i18next'
import InfoGridCard from '~/components/customs/info-grid-card'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import CardLinkAction from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info/card-link-action'
import DependentsCard from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info/dependents-card'
import InternalNotesCard from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info/internal-notes-card'
import PendingItemsCard from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info/pending-items-card'
import ProfileCompletenessCard from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info/profile-completeness-card'
import { DATA } from '~/shared/constants/data.constant'
import { MOCK_DEPENDENT_DEDUCTION, MOCK_EMPLOYEE_DEPENDENTS } from '~/shared/constants/mock-employee-detail.constant'
import type { IEmployee } from '~/shared/models/employee.model'

interface IPersonalInfoProfileProps {
  data?: IEmployee
}

// "Thông tin cá nhân" tab of the employee detail (design CmsHoSoThongTin)
const PersonalInfoProfile = ({ data }: IPersonalInfoProfileProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  // Everything comes from the detail API; fields it doesn't return yet show as "not updated" / empty
  const employee = data

  return (
    <section className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px]'>
      <section className='flex min-w-0 flex-col gap-4'>
        {DATA.GET_EMPLOYEE_PERSONAL_INFO_SECTIONS(t, getTranslateEnum, employee).map((section) => (
          <InfoGridCard
            key={section.key}
            title={section.title}
            // TODO: open the edit dialog of this section
            action={<CardLinkAction>{t('action.editSection')}</CardLinkAction>}
            fields={section.fields}
          />
        ))}
      </section>
      <section className='flex flex-col gap-4'>
        {/* TODO: the API has no dependents list / deduction yet — sample from the design until the BE adds them */}
        <DependentsCard
          dependents={employee?.dependents ?? MOCK_EMPLOYEE_DEPENDENTS}
          deduction={employee?.dependentDeduction ?? MOCK_DEPENDENT_DEDUCTION}
        />
        <ProfileCompletenessCard completeness={employee?.profileCompleteness} />
        <InternalNotesCard notes={employee?.notes} />
        <PendingItemsCard items={employee?.pendingItems} />
      </section>
    </section>
  )
}

export default PersonalInfoProfile
