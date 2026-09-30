import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import CardCustom from '~/components/customs/card-custom'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { EDepartment } from '~/shared/enums/common.enum'
import type { IExpiringContract } from '~/shared/models/overview.model'

interface IExpiringContractCardProps {
  contracts: IExpiringContract[]
  // "Xem tất cả" → the employee list
  viewAllPath: string
}

// "Hợp đồng sắp hết hạn" — contracts ending soon, closest first
const ExpiringContractCard = ({ contracts, viewAllPath }: IExpiringContractCardProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  return (
    <CardCustom
      title={t('title.expiringContracts')}
      classNameCardTitle='text-[15px] font-bold normal-case text-app-secondary'
      classNameCardContent='flex flex-col gap-3.5'
      action={
        <Link to={viewAllPath} className='text-[13px] font-semibold text-primary hover:underline'>
          {t('action.viewAll')}
        </Link>
      }
    >
      {contracts.length ? (
        contracts.map((contract) => {
          const remainingDays = contract.remainingDays
          // Red when the contract ends within CONTRACT_URGENT_DAYS days, amber otherwise
          const isUrgent = remainingDays != null && remainingDays <= COMMON_CONSTANT.CONTRACT_URGENT_DAYS
          return (
            <section key={contract.id} className='flex items-center justify-between gap-3'>
              <section className='flex min-w-0 flex-col'>
                <p className='truncate text-[13px] font-semibold text-app-secondary'>{contract.employeeName || '-'}</p>
                <p className='truncate text-[12px] text-muted-foreground'>
                  {[
                    contract.contractName,
                    contract.department &&
                      getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: contract.department })
                  ]
                    .filter(Boolean)
                    .join(' · ') || '-'}
                </p>
              </section>
              {remainingDays != null && (
                <TagBadgeLayout
                  className={clsx('shrink-0', isUrgent ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}
                >
                  {t('common.remainingDays', { count: remainingDays })}
                </TagBadgeLayout>
              )}
            </section>
          )
        })
      ) : (
        <p className='text-[13px] text-[#93A2B6]'>{t('empty.noData')}</p>
      )}
    </CardCustom>
  )
}

export default ExpiringContractCard
