import type { ReactNode } from 'react'

import type { ColumnDef } from '@tanstack/react-table'
import type { TFunction } from 'i18next'
import { FileText } from 'lucide-react'
import ContentBody from '~/components/customs/table-custom/components/content-body'
import TitleHead from '~/components/customs/table-custom/components/title-head'
import DocumentStatus from '~/components/tags/document-status'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers/date.helper'
import { fortmatHelper } from '~/helpers/format.helper'
import type { TGetTranslateEnumFn } from '~/hooks/user-transfer-enum'
import { EEmployeeDocumentType } from '~/shared/enums/common.enum'
import { EBaseTableKey, EEmployeeDocumentTableKey } from '~/shared/enums/table.enum'
import type { IEmployeeDocument } from '~/shared/models/employee.model'

interface IEmployeeDocumentColumnOptions {
  // Buttons of a row (open, delete)
  renderAction: (row: IEmployeeDocument) => ReactNode
}

export const employeeDocumentColumn = {
  getList: (t: TFunction, getTranslateEnum: TGetTranslateEnumFn, { renderAction }: IEmployeeDocumentColumnOptions) => {
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
  }
}
