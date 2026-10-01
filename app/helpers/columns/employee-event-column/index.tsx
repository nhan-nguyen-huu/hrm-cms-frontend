import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import { DATE_TIME_FORMAT_SLASH, dateHelper } from '~/helpers/date.helper'
import type { TGetTranslateEnumFn } from '~/hooks/user-transfer-enum'
import { EOrgEventType } from '~/shared/enums/common.enum'
import { EEmployeeEventTableKey } from '~/shared/enums/table.enum'
import type { IOrgEvent } from '~/shared/models/employee.model'

export const employeeEventColumn = {
  getList: (t: TFunction, getTranslateEnum: TGetTranslateEnumFn) => {
    const columns: ColumnDef<IOrgEvent>[] = [
      {
        accessorKey: EEmployeeEventTableKey.OccurredAt,
        header: () => <TitleHead title={t('tables.employeeEventTableKey.occurredAt')} className='text-left' />,
        cell: ({ row }) => (
          <ContentBody
            content={dateHelper.formatDate(row.original.occurredAt, DATE_TIME_FORMAT_SLASH, '-')}
            className='text-left'
          />
        ),
        size: 160
      },
      {
        accessorKey: EEmployeeEventTableKey.Actor,
        header: () => <TitleHead title={t('tables.employeeEventTableKey.actor')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.actorFullName} className='text-left' />,
        size: 180
      },
      {
        accessorKey: EEmployeeEventTableKey.Content,
        header: () => <TitleHead title={t('tables.employeeEventTableKey.content')} className='text-left' />,
        cell: ({ row }) => {
          const { eventType, message, note } = row.original
          return (
            <section className='flex min-w-0 flex-col text-left'>
              <p className='text-[13px] font-semibold text-app-secondary'>
                {getTranslateEnum({ enumPath: 'orgEventType', enumType: EOrgEventType, value: eventType })}
              </p>
              {/* Text written by the BE for this event (e.g. what changed) */}
              {(message || note) && (
                <p className='text-[11.5px] break-words whitespace-normal text-[#93A2B6]'>
                  {[message, note].filter(Boolean).join(' · ')}
                </p>
              )}
            </section>
          )
        },
        size: 420
      }
    ]
    return columns
  }
}
