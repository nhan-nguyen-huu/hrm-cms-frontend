import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { COMPACT_CARD_CLASS } from '~/components/customs/info-grid-card'
import { DATE_FORMAT_DAY_MONTH, dateHelper } from '~/helpers'
import type { IEmployeePendingItem } from '~/shared/models/employee.model'

interface IPendingItemsCardProps {
  items?: IEmployeePendingItem[]
}

// "Chờ xử lý" — change requests of this employee waiting for HR
const PendingItemsCard = ({ items }: IPendingItemsCardProps) => {
  const { t } = useTranslation()
  const list = items ?? []
  return (
    <CardCustom
      title={t('title.pendingItems')}
      classNameCard={COMPACT_CARD_CLASS}
      classNameCardContent='flex flex-col gap-2'
    >
      {list.length ? (
        list.map((item) => (
          <section key={item.id} className='flex items-center gap-2.5 text-[12.5px]'>
            <span className='size-1.5 shrink-0 rounded-full bg-amber-500' />
            <span className='min-w-0 flex-1 truncate text-[#40526B]'>{item.title || '-'}</span>
            <span className='text-[12px] text-[#93A2B6]'>
              {dateHelper.formatDate(item.createdDate, DATE_FORMAT_DAY_MONTH, '-')}
            </span>
          </section>
        ))
      ) : (
        <p className='text-[13px] text-[#93A2B6]'>{t('empty.noData')}</p>
      )}
    </CardCustom>
  )
}

export default PendingItemsCard
