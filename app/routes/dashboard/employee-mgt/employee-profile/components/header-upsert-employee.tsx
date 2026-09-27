import { useTranslation } from 'react-i18next'
import Stepper from '~/components/common/stepper'
import CardCustom from '~/components/customs/card-custom'
import { Separator } from '~/components/ui/separator'
import { DATA } from '~/shared/constants/data.constant'

interface IHeaderUpsertEmployeeProps {
  activeStep?: number
}
const HeaderUpsertEmployee = ({ activeStep = 0 }: IHeaderUpsertEmployeeProps) => {
  const { t } = useTranslation()
  const DATA_UPSERT_EMPLOYEE_STEP = DATA.GET_DATA_UPSERT_EMPLOYEE_STEP(t)
  return (
    <CardCustom
      title={t('title.addNewEmployee')}
      description={t('common.stepByStepEmployee', { activeStep: activeStep + 1 })}
      classNameDescription='text-[#6E7F96] text-[12.5px]'
      classNameCardTitle='font-bold! text-[19px] text-app-secondary capitalize'
    >
      <section className='flex flex-col gap-4'>
        <Separator />
        <Stepper steps={DATA_UPSERT_EMPLOYEE_STEP} activeStep={activeStep} />
      </section>
    </CardCustom>
  )
}

export default HeaderUpsertEmployee
