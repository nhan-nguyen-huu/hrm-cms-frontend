import type { ReactNode } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '~/components/ui/dialog'

interface IDialogCustomProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: ReactNode
  children?: ReactNode
  // Small text on the left of the footer, e.g. "The new member is notified in the app"
  footerNote?: ReactNode
  // OK button — shown when okText is given. Pass formId to submit a <form id={formId}> in the body, or onOk for a plain action
  okText?: string
  okIcon?: ReactNode
  okDisabled?: boolean
  formId?: string
  onOk?: () => void
  cancelText?: string
  // Width etc. of the dialog, e.g. 'sm:max-w-155'
  className?: string
}

// shadcn Dialog with the app layout: title + description, body, footer (note left · Cancel + OK right)
const DialogCustom = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footerNote,
  okText,
  okIcon,
  okDisabled,
  formId,
  onOk,
  cancelText,
  className
}: IDialogCustomProps) => {
  const { t } = useTranslation()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={clsx('gap-4 p-5', className)}>
        <DialogHeader className='gap-1'>
          <DialogTitle className='text-[17px] font-bold'>{title}</DialogTitle>
          {description && <DialogDescription className='text-[12.5px]'>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter className='-mx-5 -mb-5 items-center px-5 sm:justify-between'>
          <p className='text-[12.5px] text-[#93A2B6]'>{footerNote}</p>
          <section className='flex items-center gap-2.5'>
            <DialogClose render={<Button variant='outline' />}>{cancelText || t('action.cancel')}</DialogClose>
            {okText && (
              <Button type={formId ? 'submit' : 'button'} form={formId} disabled={okDisabled} onClick={onOk}>
                {okIcon}
                <span>{okText}</span>
              </Button>
            )}
          </section>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustom
