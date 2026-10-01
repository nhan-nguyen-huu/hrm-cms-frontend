import { ArrowLeftIcon, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ArrowRightIcon } from '~/assets/svgs'
import { Button } from '~/components/ui/button'
import { commonHelper } from '~/helpers'
import { EOnboardingStep } from '~/shared/enums/common.enum'

interface IActionUpsertEmployeeProps {
  activeStep?: EOnboardingStep
  disabledContinueAction?: boolean
  onCancel?: () => void
  onSaveDraft?: () => void
  onBack?: () => void
  onContinue?: () => void
  onCreate?: () => void
}
const ActionUpsertEmployee = ({
  activeStep = EOnboardingStep.Personal,
  disabledContinueAction,
  onSaveDraft,
  onCancel,
  onBack,
  onContinue,
  onCreate
}: IActionUpsertEmployeeProps) => {
  const { t } = useTranslation()
  const [requiredFieldNoteBefore, requiredFieldNoteAfter] = t('msg.requiredFieldDraftNote').split('*')
  const { activeStepNumber } = commonHelper.getOnboardingStep(activeStep)
  return (
    <section className='flex items-center justify-between flex-wrap gap-4 border border-border p-4 rounded-[14px] bg-white'>
      <p className='text-xs text-[#93A2B6]'>
        {requiredFieldNoteBefore}
        <span className='text-destructive'>*</span>
        {requiredFieldNoteAfter}
      </p>
      <section className='flex items-center flex-wrap gap-3'>
        <Button variant={'outline'} onClick={() => onCancel?.()}>
          {t('action.cancel')}
        </Button>
        <Button variant={'outline'} onClick={() => onSaveDraft?.()}>
          {t('action.saveDraft')}
        </Button>
        {activeStepNumber > 0 && (
          <Button variant={'outline'} onClick={() => onBack?.()}>
            <ArrowLeftIcon />
            <span>{t('action.back')}</span>
          </Button>
        )}
        {activeStepNumber < 3 && (
          <Button onClick={() => onContinue?.()} disabled={disabledContinueAction}>
            <span>{t('action.continue')}</span>
            <ArrowRightIcon />
          </Button>
        )}
        {activeStepNumber === 3 && (
          <Button onClick={() => onCreate?.()}>
            <Check />
            <span>{t('action.createEmployeeProfile')}</span>
          </Button>
        )}
      </section>
    </section>
  )
}

export default ActionUpsertEmployee
