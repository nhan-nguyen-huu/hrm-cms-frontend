import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { COMPACT_CARD_CLASS } from '~/components/customs/info-grid-card'
import DependentStatus from '~/components/tags/dependent-status'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers'
import { commonHelper } from '~/helpers/common.helper'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import CardLinkAction from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info/card-link-action'
import { ERelationship } from '~/shared/enums/common.enum'
import type { IDependent } from '~/shared/models/employee.model'

interface IDependentsCardProps {
  dependents?: IDependent[]
  // VND per month
  deduction?: number
}

// "Người phụ thuộc" — registered dependents and the current tax deduction
const DependentsCard = ({ dependents, deduction }: IDependentsCardProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  // The API may send null for the list
  const list = dependents ?? []
  return (
    <CardCustom
      title={t('title.dependents')}
      // TODO: open the "add dependent" dialog
      action={<CardLinkAction>+ {t('action.add')}</CardLinkAction>}
      classNameCard={COMPACT_CARD_CLASS}
      classNameCardContent='flex flex-col gap-3'
    >
      {list.length ? (
        <section className='flex flex-col gap-2.5 rounded-xl border border-border px-3 py-2.5'>
          {list.map((dependent) => (
            <section key={dependent.id} className='flex items-start gap-3'>
              <Avatar>
                <AvatarFallback className='bg-violet-50 font-semibold text-violet-700'>
                  {commonHelper.getInitials(dependent.fullName ?? '')}
                </AvatarFallback>
              </Avatar>
              <section className='flex min-w-0 flex-1 flex-col'>
                <p className='text-[13px] font-semibold text-app-secondary'>{dependent.fullName || '-'}</p>
                <p className='text-[11.5px] text-[#93A2B6]'>
                  {[
                    dependent.relationship &&
                      getTranslateEnum({
                        enumPath: 'relationship',
                        enumType: ERelationship,
                        value: dependent.relationship
                      }),
                    dependent.birthDate &&
                      t('common.bornOn', { date: dateHelper.formatDate(dependent.birthDate, DATE_FORMAT_SLASH) }),
                    dependent.registeredMonth && t('common.registeredIn', { month: dependent.registeredMonth })
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </section>
              <DependentStatus status={dependent.status} />
            </section>
          ))}
          <section className='flex items-center justify-between gap-3 border-t border-border pt-2.5 text-[12.5px]'>
            <span className='text-[#6E7F96]'>{t('inputLabel.currentDeduction')}</span>
            <span className='font-bold text-app-secondary'>
              {deduction != null ? t('common.vndPerMonth', { amount: commonHelper.formatNumber(deduction, 0) }) : '-'}
            </span>
          </section>
        </section>
      ) : (
        <p className='text-[13px] text-[#93A2B6]'>{t('empty.noData')}</p>
      )}
    </CardCustom>
  )
}

export default DependentsCard
