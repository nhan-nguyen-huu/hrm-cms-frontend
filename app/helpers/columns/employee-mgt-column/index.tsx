import type { ReactNode } from 'react'

import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { FileText } from 'lucide-react'
import CheckboxTableField from '~/components/customs/table-custom/components/checkbox-table-field'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import DocumentStatus from '~/components/tags/document-status'
import EmployeeInfo from '~/components/tags/employee-info'
import EmployeeStatus from '~/components/tags/employee-status'
import { Button } from '~/components/ui/button'
import { DATE_FORMAT_SLASH, DATE_TIME_FORMAT_SLASH, dateHelper } from '~/helpers/date.helper'
import { fortmatHelper } from '~/helpers/format.helper'
import type { TGetTranslateEnumFn } from '~/hooks/user-transfer-enum'
import InfoUpdateEmployee from '~/routes/dashboard/employee-mgt/employee-profile/components/info-update-employee'
import NeedAdditional from '~/routes/dashboard/employee-mgt/employee-profile/components/need-additional'
import StepCurrentlyPause from '~/routes/dashboard/employee-mgt/employee-profile/components/step-currently-pause'
import { EEmployeeDocumentType, type EEmployeeStatus, EOrgEventType } from '~/shared/enums/common.enum'
import {
  EBaseTableKey,
  EDraftEmployeeTableKey,
  EEmployeeDocumentTableKey,
  EEmployeeEventTableKey,
  EEmployeeProfileTableKey
} from '~/shared/enums/table.enum'
import type { IDraftEmployee, IEmployee, IEmployeeDocument, IOrgEvent } from '~/shared/models/employee.model'

interface IEmployeeDocumentColumnOptions {
  // Buttons of a row (open, delete)
  renderAction: (row: IEmployeeDocument) => ReactNode
}

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
  },
  getDraftEmployee: (t: TFunction) => {
    const columns: ColumnDef<IDraftEmployee>[] = [
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
        accessorKey: EDraftEmployeeTableKey.DraftProfile,
        header: () => {
          return <TitleHead title={t('tables.draftEmployeeTableKey.draftProfile')} className='text-left' />
        },
        cell: ({ row }) => {
          return (
            <EmployeeInfo
              name={row.original?.payload?.personal?.fullName}
              email={row.original?.payload?.personal?.personalEmail}
            />
          )
        },
        size: 160
      },
      {
        accessorKey: EDraftEmployeeTableKey.Department,
        header: () => {
          return <TitleHead title={t('tables.draftEmployeeTableKey.department')} className='text-left' />
        },
        cell: ({ row }) => {
          return <ContentBody content={row?.original?.payload?.job?.departmentName} className='text-left' />
        },
        size: 120
      },
      {
        accessorKey: EDraftEmployeeTableKey.StepCurrentlyPause,
        header: () => {
          return <TitleHead title={t('tables.draftEmployeeTableKey.stepCurrentlyPause')} className='text-left' />
        },
        cell: ({ row }) => {
          return <StepCurrentlyPause currentStep={row?.original?.currentStep} />
        },
        size: 200
      },
      {
        accessorKey: EDraftEmployeeTableKey.NeedAdditional,
        header: () => {
          return <TitleHead title={t('tables.draftEmployeeTableKey.needAdditional')} className='text-left' />
        },
        cell: ({ row }) => {
          return <NeedAdditional missingFields={row?.original?.missingFields} />
        },
        size: 160
      },
      {
        accessorKey: EDraftEmployeeTableKey.Update,
        header: () => {
          return <TitleHead title={t('tables.draftEmployeeTableKey.update')} className='text-left' />
        },
        cell: ({ row }) => {
          return (
            <InfoUpdateEmployee updatedAt={row?.original?.updatedAt} updatedByName={row?.original?.updatedByName} />
          )
        },
        size: 140
      },
      {
        accessorKey: EBaseTableKey.Action,
        header: () => {
          return <TitleHead title={t('tables.baseTableKey.action')} />
        },
        cell: () => {
          return (
            <section className='flex items-center justify-center'>
              <Button variant={'link'}>{t('action.continue')}</Button>
            </section>
          )
        },
        size: 120
      }
    ]
    return columns
  },
  getDocument: (
    t: TFunction,
    getTranslateEnum: TGetTranslateEnumFn,
    { renderAction }: IEmployeeDocumentColumnOptions
  ) => {
    const columns: ColumnDef<IEmployeeDocument>[] = [
      {
        accessorKey: EEmployeeDocumentTableKey.Name,
        header: () => <TitleHead title={t('tables.employeeDocumentTableKey.name')} className='text-left' />,
        cell: ({ row }) => (
          <section className='flex items-center gap-3 text-left'>
            <span className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF1FA] text-primary'>
              <FileText className='size-4' />
            </span>
            <section className='flex min-w-0 flex-col'>
              <p className='truncate text-[13px] font-semibold text-app-secondary'>
                {row.original.originalFileName || '-'}
              </p>
              {(row.original.uploadedBy || row.original.note) && (
                <p className='truncate text-[11.5px] text-[#93A2B6]'>
                  {row.original.uploadedBy
                    ? t('common.uploadedBy', { name: row.original.uploadedBy })
                    : row.original.note}
                </p>
              )}
            </section>
          </section>
        ),
        size: 230
      },
      {
        accessorKey: EEmployeeDocumentTableKey.DocumentType,
        header: () => <TitleHead title={t('tables.employeeDocumentTableKey.documentType')} className='text-left' />,
        cell: ({ row }) => (
          <ContentBody
            content={getTranslateEnum({
              enumPath: 'employeeDocumentType',
              enumType: EEmployeeDocumentType,
              value: row.original.documentType
            })}
            className='text-left'
          />
        ),
        size: 120
      },
      {
        accessorKey: EEmployeeDocumentTableKey.FileSize,
        header: () => <TitleHead title={t('tables.employeeDocumentTableKey.fileSize')} className='text-left' />,
        cell: ({ row }) => (
          <ContentBody content={fortmatHelper.formatFileSize(row.original.fileSize)} className='text-left' />
        ),
        size: 85
      },
      {
        accessorKey: EEmployeeDocumentTableKey.UploadedAt,
        header: () => <TitleHead title={t('tables.employeeDocumentTableKey.uploadedAt')} className='text-left' />,
        cell: ({ row }) => (
          <ContentBody
            content={dateHelper.formatDate(row.original.uploadedAt, DATE_FORMAT_SLASH, '-')}
            className='text-left'
          />
        ),
        size: 95
      },
      {
        accessorKey: EEmployeeDocumentTableKey.Status,
        header: () => <TitleHead title={t('tables.employeeDocumentTableKey.status')} className='text-left' />,
        cell: ({ row }) => <DocumentStatus status={row.original.status} />,
        size: 105
      },
      {
        id: EBaseTableKey.Action,
        header: () => null,
        cell: ({ row }) => renderAction(row.original),
        size: 40,
        meta: {
          disableNavigation: true
        }
      }
    ]
    return columns
  },
  getEvent: (t: TFunction, getTranslateEnum: TGetTranslateEnumFn) => {
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
