import { Fragment, type ReactNode } from 'react'

import clsx from 'clsx'
import { Card } from '~/components/ui/card'

type TCardInfoSize = 'default' | 'lg'

interface ICardInfoProps {
  // Icon in the tinted square on the left (e.g. a project icon)
  icon?: ReactNode
  // Text in the tinted square instead of an icon (e.g. employee initials "MT")
  avatarText?: string
  title?: string
  // Rendered next to the title, e.g. a status tag
  badge?: ReactNode
  // Info line under the title, items separated by a light "·"; empty items are skipped
  subtitleItems?: (string | null | undefined | false)[]
  // Free-form info line, used when `subtitleItems` doesn't fit
  subtitle?: ReactNode
  // Action buttons on the right
  children?: ReactNode
  // Content under a divider inside the card, e.g. <Tabs listClassName='border-b-0' />
  footer?: ReactNode
  // lg = profile header (bigger avatar and title), default = entity header (project, timesheet…)
  size?: TCardInfoSize
  className?: string
}

const SIZE_CLASS: Record<TCardInfoSize, { avatar: string; avatarText: string; title: string }> = {
  default: { avatar: 'size-11 rounded-[14px]', avatarText: 'text-[13px] font-semibold', title: 'text-[18px]' },
  lg: { avatar: 'size-14.5 rounded-[18px]', avatarText: 'text-[20px] font-bold', title: 'text-[19px]' }
}

// Info card at the top of a detail page: avatar/icon · title + badge · info line · actions · optional footer (tabs)
const CardInfo = ({
  icon,
  avatarText,
  title,
  badge,
  subtitleItems,
  subtitle,
  children,
  footer,
  size = 'default',
  className
}: ICardInfoProps) => {
  const sizeClass = SIZE_CLASS[size]
  const items = (subtitleItems ?? []).filter(Boolean) as string[]
  const hasAvatar = !!(icon || avatarText)

  return (
    <Card className={clsx('gap-0 px-4', footer && 'pb-0', className)}>
      <section className='flex flex-wrap items-center gap-3.5'>
        {hasAvatar && (
          <section
            className={clsx(
              'flex shrink-0 items-center justify-center bg-[#EAF1FA] text-primary',
              sizeClass.avatar,
              avatarText && sizeClass.avatarText
            )}
          >
            {icon ?? avatarText}
          </section>
        )}
        <section className='flex min-w-0 flex-1 flex-col gap-1'>
          <section className='flex flex-wrap items-center gap-2.5'>
            <p className={clsx('font-bold tracking-[-0.015em] text-app-secondary', sizeClass.title)}>{title || '-'}</p>
            {badge}
          </section>
          {items.length > 0 ? (
            <p className='flex flex-wrap items-center gap-x-2 text-[12.5px] text-[#6E7F96]'>
              {items.map((item, index) => (
                <Fragment key={`${item}-${index}`}>
                  {index > 0 && <span className='text-[#C7D2E0]'>·</span>}
                  <span>{item}</span>
                </Fragment>
              ))}
            </p>
          ) : (
            subtitle && <p className='text-[12.5px] text-[#6E7F96]'>{subtitle}</p>
          )}
        </section>
        {children && <section className='flex flex-wrap items-center gap-2.5'>{children}</section>}
      </section>
      {footer && <section className='mt-3 border-t border-[#EDF1F6]'>{footer}</section>}
    </Card>
  )
}

export default CardInfo
