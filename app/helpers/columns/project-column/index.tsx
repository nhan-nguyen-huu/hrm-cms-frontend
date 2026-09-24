import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { Ellipsis } from 'lucide-react'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import ProjectStatus from '~/components/tags/project-status'
import { commonHelper } from '~/helpers/common.helper'
import { EDepartment } from '~/shared/enums/common.enum'
import { EBaseTableKey, EProjectTableKey } from '~/shared/enums/table.enum'
import type { IProject } from '~/shared/models/project.model'

export const projectColumn = {
  getList: (t: TFunction) => {
    const columns: ColumnDef<IProject>[] = [
      {
        accessorKey: EProjectTableKey.Name,
        header: () => <TitleHead title={t('tables.projectTableKey.name')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.name} className='text-left font-semibold' />,
        size: 240
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
        cell: ({ row }) => {
          const key = Object.entries(EDepartment).find(([, value]) => value === row.original.department)?.[0]
          return (
            <ContentBody
              content={key ? t(`enums.department.${commonHelper.toCamelCase(key)}`) : undefined}
              className='text-left'
            />
          )
        },
        size: 110
      },
      {
        accessorKey: EProjectTableKey.ProjectManager,
        header: () => <TitleHead title={t('tables.projectTableKey.projectManager')} className='text-left' />,
        cell: ({ row }) => <ContentBody content={row.original.projectManager} className='text-left' />,
        size: 170
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
          <ContentBody content={`${row.original.startMonth} – ${row.original.endMonth}`} className='pl-4 text-left' />
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
  }
}
