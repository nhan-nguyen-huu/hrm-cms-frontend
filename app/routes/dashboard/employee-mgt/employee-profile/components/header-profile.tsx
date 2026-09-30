import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import CardCustom from '~/components/customs/card-custom'
import TabsCustom from '~/components/customs/tab-custom'
import EmployeeStatus from '~/components/tags/employee-status'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Separator } from '~/components/ui/separator'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers'
import { commonHelper } from '~/helpers/common.helper'
import PageLayout from '~/layouts/page.layout'
import { DATA } from '~/shared/constants/data.constant'
import type { EEmployeeProfileDetailTab, EEmployeeStatus } from '~/shared/enums/common.enum'
import type { IEmployee } from '~/shared/models/employee.model'

interface IHeaderProfileProps {
  tab: EEmployeeProfileDetailTab
  onChangeTab: (tab: EEmployeeProfileDetailTab) => void
  data?: IEmployee
}
const HeaderProfile = ({ data, tab, onChangeTab }: IHeaderProfileProps) => {
  const { t } = useTranslation()
  const DATA_TAB = DATA.GET_OPTIONS_EMPLOYEE_PROFILE_DETAIL_TAB(t)
  const assignment = data?.assignments?.[0]
  const { year, month } = dateHelper.getWorkDuration(assignment?.startDate)
  return (
    <CardCustom isHiddenHeader classNameCard='pb-0!'>
      <PageLayout>
        <section className='flex items-center justify-between gap-4'>
          <section className='flex items-center gap-4'>
            {/* Avatar */}
            <Avatar className={'size-14.5'}>
              <AvatarImage src={data?.avatar} className={'rounded-[18px]!'} />
              <AvatarFallback className={'font-semibold bg-[#EAF1FA] text-primary'}>
                {commonHelper.getInitials(data?.fullName)}
              </AvatarFallback>
            </Avatar>
            <section className='flex flex-col gap-1'>
              <section className='flex items-center gap-2'>
                <p className='font-semibold text-[19px]'>{data?.fullName}</p>
                <EmployeeStatus status={data?.employmentStatus as EEmployeeStatus} />
              </section>
              <p className='text-[#6E7F96] text-xs'>
                {t('common.descriptionJob', {
                  employeeCode: data?.employeeCode,
                  jobTitleName: assignment?.jobTitleName,
                  departmentName: assignment?.departmentName,
                  startDate: dateHelper.formatDate(assignment?.startDate, DATE_FORMAT_SLASH),
                  year: year,
                  month: month
                })}
              </p>
            </section>
          </section>
          <section className='flex items-center gap-2'>
            <ButtonAction actionType='DOWNLOAD' actionName={t('action.exportEmployeeProfile')} />
            <ButtonAction actionType='EDIT' actionName={t('action.editEmployeeProfile')} />
          </section>
        </section>
        <Separator />
        <TabsCustom value={tab} onChange={onChangeTab} options={DATA_TAB} />
      </PageLayout>
    </CardCustom>
  )
}

export default HeaderProfile
