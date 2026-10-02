import { Check, FileText, TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import CardCustom from '~/components/customs/card-custom'
import { COMPACT_CARD_CLASS } from '~/components/customs/info-grid-card'
import { Button } from '~/components/ui/button'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers'
import { DATA } from '~/shared/constants/data.constant'
import type { IDocumentWarning, IEmployeeDocument, IPendingDocument } from '~/shared/models/employee.model'

// "Chờ duyệt" — documents uploaded by the employee, waiting for HR
export const PendingDocumentsCard = ({ items }: { items?: IPendingDocument[] }) => {
  const { t } = useTranslation()
  const list = items ?? []
  // TODO: approve / reject API not available yet
  const handleNotAvailable = () => toast.info(t('msg.featureNotAvailable'))
  return (
    <CardCustom
      title={t('title.pendingApproval')}
      classNameCard={COMPACT_CARD_CLASS}
      action={
        <span className='flex size-5 items-center justify-center rounded-full bg-amber-100 text-[11px] font-semibold text-amber-700'>
          {list.length}
        </span>
      }
      classNameCardContent='flex flex-col gap-2.5'
    >
      {list.length ? (
        list.map((item) => (
          <section
            key={item.id}
            className='flex flex-col gap-2.5 rounded-xl border border-amber-200 bg-amber-50/40 p-3'
          >
            <section className='flex items-start gap-2.5'>
              <span className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700'>
                <FileText className='size-4' />
              </span>
              <section className='flex min-w-0 flex-col'>
                <p className='truncate text-[13px] font-semibold text-app-secondary'>{item.fileName || '-'}</p>
                <p className='text-[11.5px] text-[#93A2B6]'>
                  {t('common.uploadedByEmployeeOn', {
                    date: dateHelper.formatDate(item.uploadedAt, DATE_FORMAT_SLASH, '-')
                  })}
                </p>
              </section>
            </section>
            <section className='grid grid-cols-2 gap-2'>
              <Button type='button' variant='outline' onClick={handleNotAvailable}>
                {t('action.reject')}
              </Button>
              <Button type='button' onClick={handleNotAvailable}>
                <Check className='size-4' />
                {t('action.approve')}
              </Button>
            </section>
          </section>
        ))
      ) : (
        <p className='text-[13px] text-[#93A2B6]'>{t('empty.noData')}</p>
      )}
    </CardCustom>
  )
}

// "Cảnh báo giấy tờ" — expired / missing documents
export const DocumentWarningsCard = ({ items }: { items?: IDocumentWarning[] }) => {
  const { t } = useTranslation()
  const list = items ?? []
  return (
    <CardCustom
      title={t('title.documentWarnings')}
      classNameCard={COMPACT_CARD_CLASS}
      classNameCardContent='flex flex-col gap-2'
    >
      {list.length ? (
        list.map((item) => (
          <p key={item.id} className='flex items-start gap-2 text-[13px]'>
            <TriangleAlert className='mt-0.5 size-3.5 shrink-0 text-red-600' />
            <span className='flex flex-col'>
              <span className='font-semibold text-app-secondary'>{item.title || '-'}</span>
              {item.description && <span className='text-[12px] text-[#6E7F96]'>{item.description}</span>}
            </span>
          </p>
        ))
      ) : (
        <p className='text-[13px] text-[#93A2B6]'>{t('empty.noData')}</p>
      )}
    </CardCustom>
  )
}

// "Thống kê" — counts and total size, computed from the document list
export const DocumentStatsCard = ({ documents }: { documents: IEmployeeDocument[] }) => {
  const { t } = useTranslation()
  return (
    <CardCustom
      title={t('title.statistics')}
      classNameCard={COMPACT_CARD_CLASS}
      classNameCardContent='flex flex-col gap-1.5'
    >
      {DATA.GET_EMPLOYEE_DOCUMENT_STATS(t, documents).map((row) => (
        <section key={row.label} className='flex items-center justify-between gap-3 text-[12.5px]'>
          <span className='text-[#6E7F96]'>{row.label}</span>
          <span className='font-semibold text-app-secondary'>{row.value}</span>
        </section>
      ))}
    </CardCustom>
  )
}
