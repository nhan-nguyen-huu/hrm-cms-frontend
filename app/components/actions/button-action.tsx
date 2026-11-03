import React from 'react'

import { clsx } from 'cn'
import { RotateCcw, Search } from 'lucide-react'
import { DownloadIcon, PencilIcon, PlusIcon, TrashIcon, UploadIcon } from '~/assets/svgs'
import { Button } from '~/components/ui/button'
import type { TButtonAction, TButtonVariant, TPositionIcon } from '~/shared/types/common.type'

interface IButtonActionProps extends React.ComponentProps<'button'> {
  actionName: string
  actionType?: TButtonAction
  positionIcon?: TPositionIcon
  variantClassName?: TButtonVariant
}

const ButtonAction = ({
  actionType = 'DEFAULT',
  actionName,
  positionIcon,
  variantClassName,
  ...props
}: IButtonActionProps) => {
  const iconMapping: Record<TButtonAction, React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined> = {
    DEFAULT: undefined,
    CREATE: PlusIcon,
    UPLOAD: UploadIcon,
    DOWNLOAD: DownloadIcon,
    RESET: RotateCcw,
    SEARCH: Search,
    EDIT: PencilIcon,
    DELETE: TrashIcon
  }
  const variantMapping: Record<TButtonAction, TButtonVariant> = {
    DEFAULT: 'default',
    CREATE: 'default',
    UPLOAD: 'outline',
    DOWNLOAD: 'outline',
    RESET: 'outline',
    SEARCH: 'default',
    EDIT: 'default',
    DELETE: 'destructive'
  }
  const Icon = iconMapping[actionType]
  const variant = variantClassName ?? variantMapping[actionType]
  return (
    <Button variant={variant} {...props}>
      {Icon && <Icon className={clsx('size-5', positionIcon === 'RIGHT' && 'order-2')} />}
      <span>{actionName}</span>
    </Button>
  )
}

export default ButtonAction
