import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { fortmatHelper } from '~/helpers'

const SalaryInsurance = () => {
  const { t } = useTranslation()
  const _DATA = [
    {
      label: t('title.baseSalary'),
      value: fortmatHelper.formatCurrency(19000000)
    },
    {
      label: t('title.insuranceSalary'),
      value: fortmatHelper.formatCurrency(12000000)
    },
    {
      label: t('title.fixedAllowance'),
      value: fortmatHelper.formatCurrency(2200000)
    },
    {
      label: t('title.dependents'),
      value: `1 (${t('enums.dependentStatus.approved')})`
    },
    {
      label: t('title.salaryAccount'),
      value: 'VCB · 0123 4567 8901'
    }
  ]
  return (
    <>
      <CardCustom title={t('title.salaryInsurance')}>
        <section className='flex flex-col gap-2'>
          {_DATA.map((d, i) => {
            return (
              <section key={i} className='flex items-center justify-between gap-4'>
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

export default SalaryInsurance
