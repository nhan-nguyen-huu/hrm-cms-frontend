import clsx from 'clsx'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Card } from '~/components/ui/card'
import type { IStatCardItem, TStatCardTone } from '~/shared/models/common.model'

type IStatCardProps = Omit<IStatCardItem, 'key'>

const VALUE_TONE: Record<TStatCardTone, string> = {
  default: 'text-app-secondary',
  warning: 'text-amber-600',
  danger: 'text-red-700'
}

const NOTE_TONE: Record<TStatCardTone, string> = {
  default: 'text-[#93A2B6]',
  warning: 'text-amber-600',
  danger: 'text-red-600'
}

// KPI card: label · big value + unit (+ change) · progress bar or note line
const StatCard = ({
  label,
  value,
  unit,
  change,
  note,
  progress,
  tone = 'default',
  noteTone = 'default'
}: IStatCardProps) => {
  return (
    <Card className='gap-1.5 px-4.5'>
      <p className='text-[13px] text-[#6E7F96]'>{label}</p>
      <p className='flex flex-wrap items-baseline gap-x-2'>
        <span className={clsx('text-[28px] leading-tight font-bold', VALUE_TONE[tone])}>{value}</span>
        {unit && <span className='text-[13px] text-[#6E7F96]'>{unit}</span>}
        {change != null && change !== 0 && (
          <span
            className={clsx(
              'flex items-center gap-0.5 text-[12px] font-semibold',
              change > 0 ? 'text-green-600' : 'text-red-600'
            )}
          >
            {change > 0 ? <ArrowUp className='size-3.5' /> : <ArrowDown className='size-3.5' />}
            {change > 0 ? `+${change}` : change}
          </span>
        )}
      </p>
      {progress != null && (
        <span className='mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#EEF1F5]'>
          <span
            className='block h-full rounded-full bg-primary'
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </span>
      )}
      {note && <p className={clsx('text-[12px]', NOTE_TONE[noteTone])}>{note}</p>}
    </Card>
  )
}

export default StatCard
