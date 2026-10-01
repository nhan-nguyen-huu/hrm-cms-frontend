import type React from 'react'

import { clsx } from 'cn'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import type { IInfoField } from '~/shared/models/common.model'

interface IInfoGridCardProps {
  title?: string
  // Top-right of the card, e.g. "Sửa mục này"
  action?: React.ReactElement
  fields: IInfoField[]
}

const COL_SPAN: Record<NonNullable<IInfoField['colSpan']>, string> = {
  2: 'sm:col-span-2',
  3: 'sm:col-span-3',
  6: 'sm:col-span-6'
}

// Compact card spacing used by profile tabs (design CmsHoSo*)
export const COMPACT_CARD_CLASS = '[--card-spacing:--spacing(3.5)] gap-2.5'

// Card of label/value cells in a 6-column grid (3 per row by default); an empty value shows "Chưa cập nhật" in amber
const InfoGridCard = ({ title, action, fields }: IInfoGridCardProps) => {
  const { t } = useTranslation()
  return (
    <CardCustom
      title={title}
      action={action}
      classNameCard={COMPACT_CARD_CLASS}
      classNameCardContent='grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-6'
    >
      {fields.map((field) => (
        <section key={field.key} className={clsx('flex min-w-0 flex-col gap-0.5', COL_SPAN[field.colSpan ?? 2])}>
          <p className='text-[11px] text-[#93A2B6]'>{field.label}</p>
          {field.value ? (
            <p className='text-[13px] font-medium break-words text-app-secondary'>{field.value}</p>
          ) : (
            <p className='text-[13px] font-medium text-amber-600'>{t('common.notUpdated')}</p>
          )}
        </section>
      ))}
    </CardCustom>
  )
}

export default InfoGridCard
