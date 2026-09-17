import type { ReactNode } from 'react'

import clsx from 'clsx'

interface ITagBadgeProps {
  children: ReactNode
  className?: string
}

const TagBadgeLayout = ({ children, className }: ITagBadgeProps) => {
  return (
    <span
      className={clsx(
        'py-1 px-3 font-semibold rounded-full wrap-break-word whitespace-normal text-center text-xs',
        className
      )}
    >
      {children}
    </span>
  )
}

export default TagBadgeLayout
