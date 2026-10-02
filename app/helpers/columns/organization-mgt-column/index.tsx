import type { ColumnDef } from '@tanstack/react-table'
import clsx from 'clsx'
import type { TFunction } from 'i18next'
import { Ellipsis, TriangleAlert } from 'lucide-react'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import EmployeeInfo from '~/components/tags/employee-info'
import ProjectStatus from '~/components/tags/project-status'
import type { TGetTranslateEnumFn } from '~/hooks/user-transfer-enum'
import { EDepartment } from '~/shared/enums/common.enum'
import { EBaseTableKey, EProjectMemberTableKey, EProjectTableKey } from '~/shared/enums/table.enum'
import type { IProject, IProjectMember } from '~/shared/models/project.model'

const MAX_TOTAL_ALLOCATION = 100

export const organizationMgtColumn = {
  getProject: (t: TFunction, getTranslateEnum: TGetTranslateEnumFn) => {
    const columns: ColumnDef<IProject>[] = [
      {
        accessorKey: EProjectTableKey.Name,
        header: () => <TitleHead title={t('tables.projectTableKey.name')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.name} className='text-left font-semibold' />,
        size: 210
      },
      {
        accessorKey: EProjectTableKey.Code,
        header: () => <TitleHead title={t('tables.projectTableKey.code')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.code} className='text-left text-[#6E7F96]' />,
        size: 110
      },
      {
        accessorKey: EProjectTableKey.Department,
        header: () => <TitleHead title={t('tables.projectTableKey.department')} className='text-left' />,
        cell: ({ row }) => (
          <ContentBody
            content={getTranslateEnum({
              enumPath: 'department',
              enumType: EDepartment,
              value: row.original.department
            })}
            className='text-left'
          />
        ),
        size: 110
      },
      {
        accessorKey: EProjectTableKey.ProjectManager,
        header: () => <TitleHead title={t('tables.projectTableKey.projectManager')} className='text-left' />,
        cell: ({ row }) => (
          <EmployeeInfo name={row.original.projectManager?.name} email={row.original.projectManager?.email} />
        ),
        size: 200
      },
      {
        accessorKey: EProjectTableKey.MemberCount,
        header: () => <TitleHead title={t('tables.projectTableKey.memberCount')} className='text-right' />,
        cell: ({ row }) => <ContentBody content={row.original.memberCount} className='text-right' />,
        size: 110
      },
      {
        id: EProjectTableKey.Period,
        header: () => <TitleHead title={t('tables.projectTableKey.period')} className='pl-4 text-left' />,
        cell: ({ row }) => (
          <ContentBody
            content={[row.original.startMonth, row.original.endMonth].filter(Boolean).join(' – ')}
            className='pl-4 text-left'
          />
        ),
        size: 170
      },
      {
        accessorKey: EProjectTableKey.Status,
        header: () => <TitleHead title={t('tables.projectTableKey.status')} className='text-left' />,
        cell: ({ row }) => <ProjectStatus status={row.original.status} />,
        size: 130
      },
      {
        id: EBaseTableKey.Action,
        header: () => null,
        // TODO: row actions (detail / edit / delete) are not specified in the design yet
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
  },
  getProjectMember: (t: TFunction) => {
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
