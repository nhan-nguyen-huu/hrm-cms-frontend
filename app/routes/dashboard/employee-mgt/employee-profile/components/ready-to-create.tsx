import { Check } from 'lucide-react'
import CardCustom from '~/components/customs/card-custom'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { EOnboardingStep } from '~/shared/enums/common.enum'

const ReadyToCreate = () => {
  const { getTranslateEnum } = useTransferEnum()
  const _DATA = Object.values(EOnboardingStep)
  return (
    <CardCustom title={'SẴN SÀNG TẠO'}>
      <section className='flex flex-col gap-2'>
        {_DATA.map((step) => {
          return (
            <section key={step} className='flex items-center gap-2'>
              <section className='size-[4.5] flex items-center justify-center rounded-full p-1 bg-primary'>
                <Check className='size-2.5 text-white' />
              </section>
              <p>
                {getTranslateEnum({
                  enumType: EOnboardingStep,
                  enumPath: 'onboardingStep',
                  value: step
                })}
              </p>
            </section>
          )
        })}
      </section>
    </CardCustom>
  )
}

export default ReadyToCreate
