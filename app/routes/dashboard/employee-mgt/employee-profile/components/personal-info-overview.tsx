import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { EGender } from '~/shared/enums/common.enum'
import type { IEmployee } from '~/shared/models/employee.model'

interface IPersonalInfoOverviewProps {
  data?: IEmployee
}
const PersonalInfoOverview = ({ data }: IPersonalInfoOverviewProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const _DATA = [
    {
      label: t('title.dateOfBirth'),
      value: data?.dateOfBirth
    },
    {
      label: t('title.gender'),
      value: getTranslateEnum({
        enumType: EGender,
        enumPath: 'gender',
        value: data?.gender
      })
    },
    {
      label: t('title.phone'),
      value: data?.phone
    },
    {
      label: t('title.idCardNumber'),
      value: data?.idCardNumber
    },
    {
      label: t('title.idCardIssuedDate'),
      value: data?.idCardIssuedDate
    },
    {
      label: t('title.emergencyContact'),
      value: '-'
    },
    {
      label: t('title.permanentAddress'),
      value: data?.permanentAddress
    },
    {
      label: t('title.currentAddress'),
      value: data?.currentAddress
    }
  ]
  return (
    <>
      <CardCustom title={t('title.personalInfo')}>
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

export default PersonalInfoOverview
