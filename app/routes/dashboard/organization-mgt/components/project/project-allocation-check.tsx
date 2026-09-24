import clsx from 'clsx'
import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { MAX_TOTAL_ALLOCATION } from '~/helpers/schemas/project-schema.helper'
import type { IAllocationCheckRow } from '~/shared/models/project.model'

interface IProjectAllocationCheckProps {
  rows: IAllocationCheckRow[]
}

// Allocation of the selected employee across projects; turns amber with a hint when the total exceeds 100%
const ProjectAllocationCheck = ({ rows }: IProjectAllocationCheckProps) => {
  const { t } = useTranslation()
  const total = rows.reduce((sum, row) => sum + row.allocation, 0)
  const isOver = total > MAX_TOTAL_ALLOCATION

  return (
    <section
      className={clsx(
        'flex flex-col rounded-lg border px-3.5 py-2.5 text-[13px]',
        isOver ? 'border-amber-200 bg-amber-50/60' : 'border-border bg-[#F7F9FC]'
      )}
    >
      <section
        className={clsx(
          'flex items-center justify-between gap-2 border-b pb-2 font-semibold',
          isOver ? 'border-amber-200 text-amber-800' : 'border-border text-app-secondary'
        )}
      >
        <span className='flex items-center gap-2'>
          {isOver && <TriangleAlert className='size-4' />}
          {isOver ? t('title.totalAllocationOver') : t('title.totalAllocation')}
        </span>
        <span className={clsx(isOver && 'text-red-600')}>{total}%</span>
      </section>
      {rows.map((row) => (
        <section
          key={row.key}
          className={clsx(
            'flex items-center justify-between gap-2 py-1.5',
            row.isCurrent ? 'font-semibold text-primary' : 'text-[#40526B]'
          )}
        >
          <span>{row.label}</span>
          <span>{row.allocation}%</span>
        </section>
      ))}
      {isOver && <p className='pt-1 text-[11.5px] text-amber-700'>{t('msg.overAllocationHint')}</p>}
    </section>
  )
}

export default ProjectAllocationCheck
