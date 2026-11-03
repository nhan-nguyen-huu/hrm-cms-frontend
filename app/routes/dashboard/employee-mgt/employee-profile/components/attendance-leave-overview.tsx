import { clsx } from 'cn'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import type { IEmployee } from '~/shared/models/employee.model'

interface IAttendanceLeaveOverviewProps {
  data?: IEmployee
}
const AttendanceLeaveOverview = ({}: IAttendanceLeaveOverviewProps) => {
  const { t } = useTranslation()
  const _DATA = [
    {
      label: t('title.actualAttendance'),
      value: t('common.attendanceDays', { worked: 21.5, total: 22 })
    },
    {
      label: t('title.lateArrival'),
      value: t('common.timesCount', { count: 1 }),
      className: 'text-[#B2650F]'
    },
    {
      label: t('title.overtime'),
      value: t('common.hoursCount', { count: 6 })
    },
    {
      label: t('title.remainingAnnualLeave'),
      value: t('common.leaveBalance', { remaining: 6.5, total: 12 })
    }
  ]
  return (
    <>
      <CardCustom title={t('enums.employeeProfileDetailTab.timeAndAttendance')}>
        <section className='flex flex-col gap-2'>
          {_DATA.map((d, i) => {
            return (
              <section key={i} className='flex items-center justify-between gap-4'>
                <p className='text-[#93A2B6] text-xs'>{d?.label}</p>
                <p className={clsx('text-sm', d?.className)}>{d?.value}</p>
              </section>
            )
          })}
        </section>
      </CardCustom>
    </>
  )
}

export default AttendanceLeaveOverview
