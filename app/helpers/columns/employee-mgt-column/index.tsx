import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import CheckboxTableField from '~/components/customs/table-custom/components/checkbox-table-field'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import EmployeeInfo from '~/components/tags/employee-info'
import EmployeeStatus from '~/components/tags/employee-status'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers/date.helper'
import type { EEmployeeStatus } from '~/shared/enums/common.enum'
import { EBaseTableKey, EEmployeeProfileTableKey } from '~/shared/enums/table.enum'
import type { IEmployee } from '~/shared/models/employee.model'

export const employeeMgtColumn = {
  getEmployee: (t: TFunction) => {
    const columns: ColumnDef<IEmployee>[] = [
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
          return <ContentBody content={row?.original?.employeeCode} className='text-left' />
        },
        size: 100
      },
      {
        accessorKey: EEmployeeProfileTableKey.Name,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.name')} className='text-left' />
        },
        cell: ({ row }) => {
          return <EmployeeInfo name={row.original?.fullName} email={row.original?.email} />
        },
        size: 200
      },
      {
        accessorKey: EEmployeeProfileTableKey.Department,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.department')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row?.original?.primaryDepartmentName} />
        },
        size: 120
      },
      {
        accessorKey: EEmployeeProfileTableKey.JobTitle,
        header: () => {
          return <TitleHead title={t('tables.employeeProfileTableKey.jobTitle')} />
        },
        cell: ({ row }) => {
          return <ContentBody content={row?.original?.primaryJobTitleName} />
        },
        size: 140
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
          return <ContentBody content={dateHelper.formatDate(row?.original?.createdDate, DATE_FORMAT_SLASH)} />
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
              <EmployeeStatus status={row?.original?.employmentStatus as EEmployeeStatus} />
            </section>
          )
        },
        size: 160
      }
    ]
    return columns
  }
}
