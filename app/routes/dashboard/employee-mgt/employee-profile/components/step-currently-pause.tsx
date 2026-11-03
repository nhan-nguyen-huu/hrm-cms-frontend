import { useTranslation } from 'react-i18next'
import { commonHelper } from '~/helpers'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { EOnboardingStep } from '~/shared/enums/common.enum'

interface IStepCurrentlyPauseProps {
  currentStep?: EOnboardingStep
}
const StepCurrentlyPause = ({ currentStep }: IStepCurrentlyPauseProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const stepLength = Object.values(EOnboardingStep).length
  const { activeStepKey, activeStepNumber } = commonHelper.getOnboardingStep(currentStep as EOnboardingStep)
  const progress = Math.min(Math.max(activeStepNumber + 1, 0), stepLength)
  const progressPercentage = stepLength > 0 ? (progress / stepLength) * 100 : 0

  return (
    <section className='flex w-full flex-col items-start gap-2 max-w-50'>
      <p className='text-xs'>
        {t('common.stepCurrentlyPause', {
          step: activeStepNumber + 1,
          totalStep: stepLength,
          name: getTranslateEnum({
            enumType: EOnboardingStep,
            enumPath: 'onboardingStep',
            value: activeStepKey
          })
        })}
      </p>
      <section
        className='h-1.5 w-full overflow-hidden rounded-full bg-muted'
        aria-valuemin={0}
        aria-valuemax={stepLength}
        aria-valuenow={progress}
      >
        <section
          className='h-full rounded-full bg-primary transition-[width]'
          style={{ width: `${progressPercentage}%` }}
        />
      </section>
    </section>
  )
}

export default StepCurrentlyPause
