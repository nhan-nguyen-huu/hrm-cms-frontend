import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '~/components/ui/card'
import { DATA } from '~/shared/constants/data.constant'
import type { IProjectAllocationSummary } from '~/shared/models/project.model'

interface IProjectAllocationCardProps {
  summary?: IProjectAllocationSummary
}

// "Staff allocation" side card: aggregates over all project members, provided by BE
const ProjectAllocationCard = ({ summary }: IProjectAllocationCardProps) => {
  const { t } = useTranslation()
  const rows = DATA.GET_PROJECT_ALLOCATION_ROWS(t, summary)
  const overAllocatedNames = summary?.overAllocatedMemberNames ?? []

  return (
    <Card className='gap-3 px-4'>
      <section className='flex items-center justify-between'>
        <p className='text-[11.5px] font-semibold uppercase tracking-wide text-[#6E7F96]'>
          {t('title.staffAllocation')}
        </p>
        {/* TODO: link to the allocation overview once it exists */}
        <button type='button' className='text-[12px] font-semibold text-primary hover:underline'>
          {t('action.viewAll')}
        </button>
      </section>
      {rows.map((row) => (
        <section key={row.label} className='flex items-center justify-between gap-3 text-[13px]'>
          <span className='text-[#6E7F96]'>{row.label}</span>
          <span className='font-semibold'>{row.value}</span>
        </section>
      ))}
      <section className='flex items-center justify-between gap-3 text-[13px]'>
        <span className='text-[#6E7F96]'>{t('inputLabel.overAllocated')}</span>
        <span className={overAllocatedNames.length ? 'font-semibold text-amber-600' : 'font-semibold'}>
          {t('common.personCount', { count: overAllocatedNames.length })}
        </span>
      </section>
      {overAllocatedNames.length > 0 && (
        <section className='flex gap-2 rounded-lg bg-amber-50 p-3 text-[12px] text-amber-800'>
          <TriangleAlert className='mt-0.5 size-3.5 shrink-0' />
          <p>{t('msg.overAllocationWarning', { names: overAllocatedNames.join(', ') })}</p>
        </section>
      )}
    </Card>
  )
}

export default ProjectAllocationCard
