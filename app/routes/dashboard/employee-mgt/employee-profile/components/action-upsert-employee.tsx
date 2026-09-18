import { ArrowLeftIcon, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ArrowRightIcon } from '~/assets/svgs'
import { Button } from '~/components/ui/button'

interface IActionUpsertEmployeeProps {
  activeStep?: number
  onCancel?: () => void
  onSaveDraft?: () => void
  onBack?: () => void
  onContinue?: () => void
  onCreate?: () => void
}
const ActionUpsertEmployee = ({
  activeStep = 0,
  onSaveDraft,
  onCancel,
  onBack,
  onContinue,
  onCreate
}: IActionUpsertEmployeeProps) => {
  const { t } = useTranslation()
  return (
    <section className='flex items-center justify-between gap-4 border border-border p-4 rounded-[14px] bg-white'>
      <p className='text-xs text-[#93A2B6]'>{t('msg.requiredFieldDraftNote')}</p>
      <section className='flex items-center gap-3'>
        <Button variant={'outline'} onClick={() => onCancel?.()}>
          {t('action.cancel')}
        </Button>
        <Button variant={'outline'} onClick={() => onSaveDraft?.()}>
          {t('action.saveDraft')}
        </Button>
        {activeStep > 0 && (
          <Button variant={'outline'} onClick={() => onBack?.()}>
            <ArrowLeftIcon />
            <span>{t('action.back')}</span>
          </Button>
        )}
        {activeStep < 3 && (
          <Button onClick={() => onContinue?.()}>
            <span>{t('action.continue')}</span>
            <ArrowRightIcon />
          </Button>
        )}
        {activeStep === 3 && (
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
