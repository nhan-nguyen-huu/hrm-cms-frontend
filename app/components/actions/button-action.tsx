import React from 'react'

import { RotateCcw, Search } from 'lucide-react'
import { DownloadIcon, PlusIcon, UploadIcon } from '~/assets/svgs'
import { Button } from '~/components/ui/button'
import type { TButtonAction, TButtonVariant } from '~/shared/types/common.type'

interface IButtonActionProps extends React.ComponentProps<'button'> {
  actionName: string
  actionType?: TButtonAction
}

const ButtonAction = ({ actionType = 'DEFAULT', actionName, ...props }: IButtonActionProps) => {
  const iconMapping: Record<TButtonAction, React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined> = {
    DEFAULT: undefined,
    CREATE: PlusIcon,
    UPLOAD: UploadIcon,
    DOWNLOAD: DownloadIcon,
    RESET: RotateCcw,
    SEARCH: Search
  }
  const variantMapping: Record<TButtonAction, TButtonVariant> = {
    DEFAULT: 'default',
    CREATE: 'default',
    UPLOAD: 'outline',
    DOWNLOAD: 'outline',
    RESET: 'outline',
    SEARCH: 'default'
  }
  const Icon = iconMapping[actionType]
  const variant = variantMapping[actionType]
  return (
    <Button {...props} variant={variant}>
      {Icon && <Icon className='size-5' />}
      <span>{actionName}</span>
    </Button>
  )
}

export default ButtonAction
