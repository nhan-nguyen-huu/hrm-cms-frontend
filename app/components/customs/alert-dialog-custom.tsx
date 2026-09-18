import { useTranslation } from 'react-i18next'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '~/components/ui/alert-dialog'

interface IAlertDialogCustomProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
  isWarning?: boolean
  title?: string
  description?: string
  onOkAction?: () => void
  okText?: string
}
const AlertDialogCustom = ({
  open,
  onOpenChange,
  title,
  description,
  onOkAction,
  okText,
  isWarning = false
}: IAlertDialogCustomProps) => {
  const { t } = useTranslation()
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className='data-[size=default]:max-w-[calc(100%-2rem)]'>
        <AlertDialogHeader>
          <AlertDialogTitle className='font-semibold w-full text-left'>{title}</AlertDialogTitle>
          <AlertDialogDescription className='text-base w-full text-left whitespace-pre-line'>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-row ml-auto bg-white border border-none'>
          <AlertDialogCancel className='min-w-25 cursor-pointer'>{t('action.cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onOkAction?.()
            }}
            className='min-w-25 cursor-pointer'
            variant={isWarning ? 'destructive' : 'default'}
          >
            {okText || t('action.check')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogCustom
