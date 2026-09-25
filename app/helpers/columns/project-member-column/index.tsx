import type { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import type { TFunction } from 'i18next'
import { Ellipsis, TriangleAlert } from 'lucide-react'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import EmployeeInfo from '~/components/tags/employee-info'
import { EBaseTableKey, EProjectMemberTableKey } from '~/shared/enums/table.enum'
import type { IProjectMember } from '~/shared/models/project.model'

const MAX_TOTAL_ALLOCATION = 100

export const projectMemberColumn = {
  getList: (t: TFunction) => {
    const columns: ColumnDef<IProjectMember>[] = [
      {
        accessorKey: EProjectMemberTableKey.Employee,
        header: () => <TitleHead title={t('tables.projectMemberTableKey.employee')} className='text-left' />,
        cell: ({ row }) => <EmployeeInfo name={row.original.name} description={row.original.jobTitle} />,
        size: 260
      },
      {
        accessorKey: EProjectMemberTableKey.Role,
        header: () => <TitleHead title={t('tables.projectMemberTableKey.role')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.role} className='text-left' />,
        size: 170
      },
      {
        accessorKey: EProjectMemberTableKey.Allocation,
        header: () => <TitleHead title={t('tables.projectMemberTableKey.allocation')} className='text-right' />,
        cell: ({ row }) => {
          const { allocation, totalAllocation } = row.original
          const isOverAllocated = (totalAllocation ?? 0) > MAX_TOTAL_ALLOCATION
          return (
            <p
              className={clsx(
                'flex items-center justify-end gap-1 text-xs font-semibold',
                isOverAllocated && 'text-amber-600'
              )}
              title={isOverAllocated ? t('msg.memberOverAllocated', { total: totalAllocation }) : undefined}
            >
              {isOverAllocated && <TriangleAlert className='size-3.5' />}
              {allocation != null ? `${allocation}%` : '-'}
            </p>
          )
        },
        size: 100
      },
      {
        accessorKey: EProjectMemberTableKey.JoinedMonth,
        header: () => <TitleHead title={t('tables.projectMemberTableKey.joinedMonth')} className='text-right' />,
        cell: ({ row }) => <ContentBody content={row.original.joinedMonth} className='text-right' />,
        size: 120
      },
      {
        id: EBaseTableKey.Action,
        header: () => null,
        // TODO: row actions (change allocation / remove from project) are not specified in the design yet
        cell: () => (
          <button
            type='button'
            aria-label={t('tables.baseTableKey.action')}
            className='flex size-7 items-center justify-center rounded-md text-[#93A2B6] hover:bg-gray-100'
          >
            <Ellipsis className='size-4' />
          </button>
        ),
        size: 50,
        meta: {
          disableNavigation: true
        }
      }
    ]
    return columns
  }
}
