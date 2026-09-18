import { useTranslation } from 'react-i18next'
import Stepper from '~/components/common/stepper'
import { Separator } from '~/components/ui/separator'
import { DATA } from '~/shared/constants/data.constant'

interface IHeaderUpsertEmployeeProps {
  activeStep?: number
}
const HeaderUpsertEmployee = ({ activeStep = 0 }: IHeaderUpsertEmployeeProps) => {
  const { t } = useTranslation()
  const DATA_UPSERT_EMPLOYEE_STEP = DATA.GET_DATA_UPSERT_EMPLOYEE_STEP(t)
  return (
    <section className='border border-border rounded-[14px] flex flex-col gap-4 p-4 bg-white'>
      <section className='flex flex-col'>
        <p className='text-[19px] font-bold text-app-secondary'>{t('title.addNewEmployee')}</p>
        <p className='text-xs'>{t('common.stepByStepEmployee', { activeStep: activeStep + 1 })}</p>
      </section>
      <Separator />
      <Stepper steps={DATA_UPSERT_EMPLOYEE_STEP} activeStep={activeStep} />
    </section>
  )
}

export default HeaderUpsertEmployee
