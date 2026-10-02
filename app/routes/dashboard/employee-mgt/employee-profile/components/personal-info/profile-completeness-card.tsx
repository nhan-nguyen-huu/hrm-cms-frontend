import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { COMPACT_CARD_CLASS } from '~/components/customs/info-grid-card'
import type { IProfileCompleteness } from '~/shared/models/employee.model'

interface IProfileCompletenessCardProps {
  completeness?: IProfileCompleteness
}

// "Độ hoàn thiện hồ sơ" — filled / required fields and which ones are missing
const ProfileCompletenessCard = ({ completeness }: IProfileCompletenessCardProps) => {
  const { t } = useTranslation()
  const filled = completeness?.filledCount ?? 0
  const required = completeness?.requiredCount ?? 0
  const percent = required ? Math.round((filled / required) * 100) : 0
  const missing = (completeness?.missingFields ?? []).map((key) => t(`inputLabel.${key}`))

  return (
    <CardCustom
      title={t('title.profileCompleteness')}
      classNameCard={COMPACT_CARD_CLASS}
      classNameCardContent='flex flex-col gap-2'
    >
      <section className='flex items-baseline justify-between gap-3'>
        <span className='text-[20px] font-bold text-app-secondary'>{percent}%</span>
        <span className='text-[12.5px] text-[#6E7F96]'>{t('common.requiredFieldsFilled', { filled, required })}</span>
      </section>
      <span className='h-1.5 w-full overflow-hidden rounded-full bg-[#EEF1F5]'>
        <span className='block h-full rounded-full bg-primary' style={{ width: `${percent}%` }} />
      </span>
      {missing.length > 0 && (
        <p className='flex items-start gap-1.5 text-[12px] text-[#6E7F96]'>
          <TriangleAlert className='mt-0.5 size-3.5 shrink-0 text-amber-600' />
          {t('common.missingFields', { fields: missing.join(', ') })}
        </p>
      )}
    </CardCustom>
  )
}

export default ProfileCompletenessCard
