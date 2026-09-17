import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import CheckboxTableField from '~/components/customs/table-custom/components/checkbox-table-field'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import EmployeeAccountStatus from '~/components/tags/employee-account-status'
import EmployeeInfo from '~/components/tags/employee-info'
import { EBaseTableKey, EEmployeeProfileTableKey } from '~/shared/enums/table.enum'

export const employeeMgtColumn = {
  getMembership: (t: TFunction) => {
    const columns: ColumnDef<any>[] = [
      {
        id: EBaseTableKey.Select,
        header: ({ table }) => <CheckboxTableField table={table} tableType='HEADER' />,
        cell: ({ row }) => <CheckboxTableField row={row} tableType='BODY' />,
        size: 40,
        enableSorting: false,
        enableHiding: false,
        meta: {
          disableNavigation: true
        }
      },
      {
        accessorKey: EEmployeeProfileTableKey.Code,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.code')} className='text-left' />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(EEmployeeProfileTableKey.Code)} className='text-left' />
        },
        size: 100
      },
      {
        accessorKey: EEmployeeProfileTableKey.Name,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.name')} className='text-left' />
        },
        cell: ({ row }) => {
          return <EmployeeInfo name={row.original.name} email={row.original.email} />
        },
        size: 200
      },
      {
        accessorKey: EEmployeeProfileTableKey.Department,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.department')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(EEmployeeProfileTableKey.Department)} />
        },
        size: 120
      },
      {
        accessorKey: EEmployeeProfileTableKey.JobTitle,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.jobTitle')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(EEmployeeProfileTableKey.JobTitle)} />
        },
        size: 120
      },
      {
        accessorKey: EEmployeeProfileTableKey.ContractType,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.contractType')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(EEmployeeProfileTableKey.ContractType)} />
        },
        size: 160
      },
      {
        accessorKey: EEmployeeProfileTableKey.JoinDate,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.joinDate')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row.getValue(EEmployeeProfileTableKey.JoinDate)} />
        },
        size: 120
      },
      {
        accessorKey: EEmployeeProfileTableKey.Status,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.status')} />
        },
        cell: ({ row }) => {
          return (
            <section className='flex items-center justify-center'>
              <EmployeeAccountStatus status={row.getValue(EEmployeeProfileTableKey.Status)} />
            </section>
          )
        },
        size: 120
      }
    ]
    return columns
  }
}
