import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import type { IEmployee } from '~/shared/models/employee.model'

interface IJobInfoOverviewProps {
  data?: IEmployee
}
const JobInfoOverview = ({ data }: IJobInfoOverviewProps) => {
  const { t } = useTranslation()
  const assignment = data?.assignments?.[0]
  const _DATA = [
    {
      label: t('title.department'),
      value: assignment?.departmentName
    },
    {
      label: t('title.lineManager'),
      value: assignment?.lineManagerFullName
    },
    {
      label: t('title.jobTitle'),
      value: assignment?.jobTitleName
    },
    {
      label: t('title.companyEmail'),
      value: '-'
    },
    {
      label: t('title.workLocation'),
      value: '-'
    },
    {
      label: t('title.workShift'),
      value: '-'
    }
  ]
  return (
    <>
      <CardCustom title={t('title.jobInfo')}>
        <section className='grid grid-cols-12 gap-4'>
          {_DATA.map((d, i) => {
            return (
              <section key={i} className='flex flex-col col-span-4'>
                <p className='text-[#93A2B6] text-xs'>{d?.label}</p>
                <p className='text-sm'>{d?.value}</p>
              </section>
            )
          })}
        </section>
      </CardCustom>
    </>
  )
}

export default JobInfoOverview
