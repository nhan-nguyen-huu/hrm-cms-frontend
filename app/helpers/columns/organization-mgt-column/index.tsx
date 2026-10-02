import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Ellipsis } from 'lucide-react'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import EmployeeInfo from '~/components/tags/employee-info'
import ProjectStatus from '~/components/tags/project-status'
import { commonHelper } from '~/helpers/common.helper'
import { DATE_FORMAT_MONTH_YEAR, dateHelper } from '~/helpers/date.helper'
import { EBaseTableKey, EProjectMemberTableKey, EProjectTableKey } from '~/shared/enums/table.enum'
import type { IProject, IProjectMember } from '~/shared/models/project.model'

export const organizationMgtColumn = {
  getProject: (t: TFunction) => {
    const columns: ColumnDef<IProject>[] = [
      {
        accessorKey: EProjectTableKey.Name,
        header: () => <TitleHead title={t('tables.projectTableKey.name')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.projectName} className='text-left font-semibold' />,
        size: 210
      },
      {
        accessorKey: EProjectTableKey.Code,
        header: () => <TitleHead title={t('tables.projectTableKey.code')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.projectCode} className='text-left text-[#6E7F96]' />,
        size: 110
      },
      {
        accessorKey: EProjectTableKey.Department,
        header: () => <TitleHead title={t('tables.projectTableKey.department')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.departmentName} className='text-left' />,
        size: 110
      },
      {
        accessorKey: EProjectTableKey.ProjectManager,
        header: () => <TitleHead title={t('tables.projectTableKey.projectManager')} className='text-left' />,
        // The list API has the manager's name only (no email / avatar)
        cell: ({ row }) =>
          row.original.managerFullName ? <EmployeeInfo name={row.original.managerFullName} /> : <ContentBody />,
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
            content={dateHelper.formatMonthRange(row.original.startDate, row.original.endDate)}
            className='pl-4 text-left'
          />
        ),
        size: 170
      },
      {
        accessorKey: EProjectTableKey.Status,
        header: () => <TitleHead title={t('tables.projectTableKey.status')} className='text-left' />,
        cell: ({ row }) => <ProjectStatus status={row.original.status} isEndingSoon={row.original.endingSoon} />,
        size: 130
      },
      {
        id: EBaseTableKey.Action,
        header: () => null,
        // TODO: row actions (detail / edit / delete) are not specified in the design yet (API: PUT / DELETE /project/{id})
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
        // TODO: the API has no job title (design shows it) nor each member's total allocation across projects,
        // so the staff number is shown under the name and the over-100% warning per row is not available
        cell: ({ row }) => <EmployeeInfo name={row.original.fullName} description={row.original.employeeCode} />,
        size: 260
      },
      {
        accessorKey: EProjectMemberTableKey.Role,
        header: () => <TitleHead title={t('tables.projectMemberTableKey.role')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.projectRole} className='text-left' />,
        size: 170
      },
      {
        accessorKey: EProjectMemberTableKey.Allocation,
        header: () => <TitleHead title={t('tables.projectMemberTableKey.allocation')} className='text-right' />,
        cell: ({ row }) => {
          const allocation = row.original.allocationPercent
          return (
            <ContentBody
              content={allocation == null ? '-' : `${commonHelper.formatNumber(Number(allocation))}%`}
              className='text-right text-xs font-semibold'
            />
          )
        },
        size: 100
      },
      {
        accessorKey: EProjectMemberTableKey.JoinedMonth,
        header: () => <TitleHead title={t('tables.projectMemberTableKey.joinedMonth')} className='text-right' />,
        cell: ({ row }) => (
          <ContentBody
            content={dateHelper.formatDate(row.original.joinedFrom, DATE_FORMAT_MONTH_YEAR, '-')}
            className='text-right'
          />
        ),
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
