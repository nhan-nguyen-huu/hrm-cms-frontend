import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { COMPACT_CARD_CLASS } from '~/components/customs/info-grid-card'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers'
import CardLinkAction from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info/card-link-action'
import type { IEmployeeNote } from '~/shared/models/employee.model'

interface IInternalNotesCardProps {
  notes?: IEmployeeNote[]
}

// "Ghi chú nội bộ" — HR notes on the profile, newest last (as sent by the API)
const InternalNotesCard = ({ notes }: IInternalNotesCardProps) => {
  const { t } = useTranslation()
  const list = notes ?? []
  return (
    <CardCustom
      title={t('title.internalNotes')}
      // TODO: open the "add note" dialog
      action={<CardLinkAction>+ {t('action.addNote')}</CardLinkAction>}
      classNameCard={COMPACT_CARD_CLASS}
      classNameCardContent='flex flex-col gap-2'
    >
      {list.length ? (
        list.map((note) => (
          <section key={note.id} className='flex flex-col gap-1 rounded-lg bg-[#F7F9FC] px-3 py-2'>
            <p className='text-[12.5px] text-[#40526B]'>{note.content || '-'}</p>
            <p className='text-[11.5px] text-[#93A2B6]'>
              {[note.createdBy, dateHelper.formatDate(note.createdDate, DATE_FORMAT_SLASH)].filter(Boolean).join(' · ')}
            </p>
          </section>
        ))
      ) : (
        <p className='text-[13px] text-[#93A2B6]'>{t('empty.noData')}</p>
      )}
    </CardCustom>
  )
}

export default InternalNotesCard
