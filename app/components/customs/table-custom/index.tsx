import { useState } from 'react'

import {
  type ColumnDef,
  type ExpandedState,
  type OnChangeFn,
  type RowSelectionState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'
import { useNavigate } from 'react-router'
import { EmptyIcon } from '~/assets/svgs'
import RenderIf from '~/components/common/render-if'
import PaginationCustom from '~/components/customs/pagination-custom'
import { Skeleton } from '~/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  classNameTable?: string
  loading?: boolean
  skeletonLength?: number
  maxHeightClass?: string
  emptyText?: string
  classNameWrapperTable?: string
  headerDescription?: string
  footerDescription?: string
  disableNavigationAll?: boolean
  onRowFunction?: (id: number) => void
  columnVisibility?: VisibilityState
  getSubRows?: (row: TData) => TData[] | undefined
  getRowId?: (row: TData) => string
  onDelete?: (ids: number[]) => void
  rowSelection?: RowSelectionState
  onRowSelectionChange?: OnChangeFn<RowSelectionState>
  // Pagination
  page: number
  totalPage: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

const TableCustom = <TData, TValue>({
  columns,
  data,
  classNameTable,
  loading,
  skeletonLength = 9,
  emptyText = 'No data',
  classNameWrapperTable,
  getSubRows,
  getRowId,
  rowSelection = {},
  columnVisibility,
  disableNavigationAll = false,
  onRowFunction,
  onRowSelectionChange,
  page,
  pageSize,
  totalPage,
  onPageChange,
  onPageSizeChange

  // onDelete
}: DataTableProps<TData, TValue>) => {
  const navi = useNavigate()
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows,
    onExpandedChange: setExpanded,
    onRowSelectionChange,
    getRowId: getRowId ?? ((row) => String((row as any)?.id)),
    state: {
      rowSelection,
      columnVisibility,
      expanded
    }
    // onColumnVisibilityChange: setColumnVisibility
  })

  const skeletonRows = Array.from({ length: skeletonLength })
  const visibleColumnsCount = table.getVisibleLeafColumns().length
  const totalRow = Object.keys(rowSelection).length
  return (
    <section className='flex flex-col gap-4'>
      <section
        className={clsx('rounded-[14px] overflow-hidden w-full relative border border-border', classNameWrapperTable)}
      >
        <Table className={clsx('table-fixed bg-white', classNameTable)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='bg-white sticky top-0 z-10'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.column.getSize() }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <RenderIf
              condition={!!loading}
              whenTrue={
                <>
                  {skeletonRows.map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      {Array.from({ length: visibleColumnsCount }).map((_, j) => (
                        <TableCell key={`skeleton-cell-${j}`}>
                          <Skeleton className='h-3' />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </>
              }
              whenFalse={
                <>
                  <RenderIf
                    condition={!!table.getRowModel().rows?.length}
                    whenTrue={
                      <>
                        {table.getRowModel().rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && 'selected'}
                            className={clsx('cursor-pointer', row.depth > 0 && 'bg-[#fafafa]')}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell
                                key={cell.id}
                                onClick={() => {
                                  if (onRowFunction && row?.id) {
                                    onRowFunction?.(Number(row?.id))
                                    return
                                  }
                                  if (disableNavigationAll) return
                                  const disableNavigation = cell.column.columnDef.meta?.disableNavigation
                                  if (disableNavigation) return
                                  navi(String((row.original as any)?.id))
                                }}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                        <TableRow className='hover:bg-transparent'>
                          <TableCell colSpan={visibleColumnsCount}>
                            <section className='flex items-center justify-between gap-2 w-full h-6'>
                              {totalRow > 0 && (
                                <p className='text-[#6E7F96] text-[12.5px]'>Đã chọn {totalRow} nhân viên</p>
                              )}
                              <PaginationCustom
                                page={page}
                                totalPage={totalPage}
                                onPageChange={onPageChange}
                                pageSize={pageSize}
                                onPageSizeChange={onPageSizeChange}
                              />
                            </section>
                          </TableCell>
                        </TableRow>
                      </>
                    }
                    whenFalse={
                      <TableRow>
                        <TableCell colSpan={visibleColumnsCount} className='h-85 text-center'>
                          <EmptyIcon className='size-40 mx-auto text-gray-700' />
                          <span className='font-semibold text-gray-700'>{emptyText}</span>
                        </TableCell>
                      </TableRow>
                    }
                  />
                </>
              }
            />
          </TableBody>
        </Table>
      </section>
    </section>
  )
}

export default TableCustom
