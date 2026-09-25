import type { ReactNode } from 'react'

import { useTranslation } from 'react-i18next'

interface ITableCustomHeaderProps {
  title?: string
  // Second line, under the title
  description?: string
  // Rows on the current page / all rows — always rendered as "Showing {shown} / {total}"
  shown: number
  total: number
  // Action buttons on the right, e.g. "Add member"
  children?: ReactNode
}

const TableCustomHeader = ({ title, description, shown, total, children }: ITableCustomHeaderProps) => {
  const { t } = useTranslation()
  return (
    <section className='flex flex-wrap items-center justify-between gap-2'>
      <section className='flex min-w-0 flex-col gap-0.5'>
        {title && <p className='text-[11.5px] font-semibold uppercase tracking-wide text-[#6E7F96]'>{title}</p>}
        {description && <p className='text-[12.5px] text-[#93A2B6]'>{description}</p>}
      </section>
      <section className='flex items-center gap-3'>
        <p className='text-xs text-[#93A2B6]'>{t('common.showingCount', { shown, total })}</p>
        {children}
      </section>
    </section>
  )
}

export default TableCustomHeader
