import type React from 'react'
import type { ReactNode } from 'react'

import { clsx } from 'cn'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

interface ICardCustomProps {
  title?: string
  description?: string
  action?: React.ReactElement
  classNameCardTitle?: string
  classNameDescription?: string
  classNameCardContent?: string
  children?: ReactNode
}
const CardCustom = ({
  title,
  description,
  action,
  classNameCardTitle,
  classNameDescription,
  classNameCardContent,
  children
}: ICardCustomProps) => {
  return (
    <Card>
      <CardHeader>
        {title && (
          <CardTitle className={clsx('text-[#6E7F96] uppercase text-xs', classNameCardTitle)}>{title}</CardTitle>
        )}
        {description && <CardDescription className={clsx(classNameDescription)}>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className={clsx(classNameCardContent)}>{children}</CardContent>
    </Card>
  )
}

export default CardCustom
