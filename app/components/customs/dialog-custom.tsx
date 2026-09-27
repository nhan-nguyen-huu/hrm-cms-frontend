import type { ReactNode } from 'react'

import clsx from 'clsx'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'

interface IDialogCustomProps {
  open?: boolean
  onOpenChange?: (isOpen: boolean) => void

  title?: string
  description?: string
  footerDescription?: string
  cancelText?: string
  okText?: string

  isDisabledOkBtn?: boolean

  isHiddenCancelAction?: boolean
  isHiddenOkAction?: boolean

  showCloseButton?: boolean

  classNameContent?: string
  classNameMainContent?: string

  onOkAction?: () => void

  triggerBtn?: React.ReactElement
  children?: ReactNode
  modal?: boolean | 'trap-focus'
  noOutside?: boolean
}

const DialogCustom = ({
  open,
  onOpenChange,
  triggerBtn,
  title,
  description,
  footerDescription,
  cancelText,
  okText,
  isDisabledOkBtn = false,
  isHiddenCancelAction = false,
  isHiddenOkAction = false,
  showCloseButton = true,
  onOkAction,
  classNameContent,
  classNameMainContent,
  children,
  modal = true,
  noOutside = false
}: IDialogCustomProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={modal} disablePointerDismissal={noOutside}>
      {/* Trigger */}
      {triggerBtn && <DialogTrigger render={triggerBtn} />}

      {/* Content */}
      <DialogContent
        showCloseButton={showCloseButton}
        className={clsx('sm:max-w-150 gap-0 p-0 border border-border! shadow-none! ring-0', classNameContent)}
        initialFocus={false}
        finalFocus={false}
      >
        {/* Header */}
        <DialogHeader className='border-b border-border p-4'>
          <DialogTitle className='text-base font-semibold!'>{title}</DialogTitle>
          <DialogDescription className={clsx(!description && 'sr-only')}>{description}</DialogDescription>
        </DialogHeader>

        {/* Content */}
        <section className={clsx('max-h-[60vh] overflow-y-auto p-4', classNameMainContent)}>{children}</section>

        {/* Footer */}
        <DialogFooter className='border-t! border-t-border! p-4 mx-0 mb-0 bg-white'>
          <section className='flex items-center justify-between gap-3 flex-wrap w-full'>
            <DialogDescription className={clsx('text-[#93A2B6] text-xs', !footerDescription && 'sr-only')}>
              {footerDescription}
            </DialogDescription>
            <section className='flex items-center flex-wrap gap-2'>
              {/* Cancel */}
              {!isHiddenCancelAction && (
                <DialogClose render={<Button variant='outline' className='min-w-25 cursor-pointer' />}>
                  {cancelText}
                </DialogClose>
              )}
              {/* Ok */}
              {!isHiddenOkAction && (
                <Button
                  type='button'
                  onClick={onOkAction}
                  disabled={isDisabledOkBtn}
                  className='min-w-25 cursor-pointer'
                >
                  {okText}
                </Button>
              )}
            </section>
          </section>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustom
