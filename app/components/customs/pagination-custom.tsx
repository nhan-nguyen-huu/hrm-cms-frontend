import { useMemo, useState } from 'react'

import clsx from 'clsx'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

interface PaginationCustomProps {
  page: number
  totalPage: number
  onPageChange: (page: number) => void
  pageSize: number
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
  siblingCount?: number
}

const DOTS = 'dots' as const
type PaginationItemType = number | typeof DOTS

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

const getPaginationRange = ({
  totalPage,
  currentPage,
  siblingCount = 1
}: {
  totalPage: number
  currentPage: number
  siblingCount?: number
}): PaginationItemType[] => {
  const totalPageNumbers = siblingCount + 5
  if (totalPageNumbers >= totalPage) {
    return range(1, totalPage)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, totalPage)

  const showLeftDots = leftSibling > 2
  const showRightDots = rightSibling < totalPage - 2

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + 2 * siblingCount)
    return [...leftRange, DOTS, totalPage]
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = range(totalPage - (3 + 2 * siblingCount) + 1, totalPage)
    return [1, DOTS, ...rightRange]
  }

  if (showLeftDots && showRightDots) {
    const middleRange = range(leftSibling, rightSibling)
    return [1, DOTS, ...middleRange, DOTS, totalPage]
  }

  return []
}

const useMobilePagination = (currentPage: number, totalPage: number) => {
  const maxVisible = 4
  const [start, setStart] = useState(1)
  const [prev, setPrev] = useState({ currentPage, totalPage })

  if (prev.currentPage !== currentPage || prev.totalPage !== totalPage) {
    setPrev({ currentPage, totalPage })

    if (totalPage <= maxVisible) {
      if (start !== 1) setStart(1)
    } else {
      const end = start + maxVisible - 1
      if (currentPage > end) {
        setStart(currentPage - maxVisible + 1)
      } else if (currentPage < start) {
        setStart(currentPage)
      }
    }
  }

  return range(start, Math.min(start + maxVisible - 1, totalPage))
}
const PaginationCustom = ({
  page,
  totalPage,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 40, 50],
  siblingCount = 1
}: PaginationCustomProps) => {
  const currentPage = page + 1
  const paginationRange = useMemo(() => {
    return getPaginationRange({
      totalPage,
      currentPage,
      siblingCount
    })
  }, [totalPage, currentPage, siblingCount])

  const mobileRange = useMobilePagination(currentPage, totalPage)

  if (totalPage < 1) return null

  const handleChange = (p: number) => {
    if (p < 0 || p >= totalPage) return
    onPageChange(p)
  }

  return (
    <section className='flex items-center justify-end gap-2 ml-auto rounded-[8px]'>
      <section className='hidden sm:flex items-center gap-2'>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            const newSize = Number(value)
            onPageSizeChange(newSize)
          }}
        >
          <SelectTrigger className='h-8! rounded-[8px] border border-border'>
            <SelectValue />
          </SelectTrigger>

          <SelectContent alignItemWithTrigger={false}>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* 🔢 Pagination */}
      <Pagination className='mx-0 w-auto'>
        <PaginationContent className='gap-2'>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              href='#'
              aria-disabled={page === 0}
              className={clsx(
                page === 0 ? 'pointer-events-none opacity-50' : '',
                'hover:border hover:border-primary hover:text-primary hover:bg-white'
              )}
              onClick={(e) => {
                e.preventDefault()
                handleChange(page - 1)
              }}
            />
          </PaginationItem>

          {/* Desktop */}
          <section className='hidden md:flex gap-2'>
            {paginationRange.map((item, index) => {
              if (item === DOTS) {
                return (
                  <PaginationItem key={`dots-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href='#'
                    isActive={item === currentPage}
                    onClick={(e) => {
                      e.preventDefault()
                      handleChange(item - 1)
                    }}
                    className={clsx(
                      'rounded-[8px] min-w-8! min-h-8! border border-border w-full! p-2!',
                      item === currentPage && 'bg-primary font-semibold text-white hover:bg-primary! hover:text-white!',
                      'hover:border hover:border-primary hover:bg-white hover:text-primary transition-all duration-200'
                    )}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
          </section>

          {/* Mobile */}
          <section className='flex md:hidden gap-1'>
            {mobileRange.map((item) => (
              <PaginationItem key={item}>
                <PaginationLink
                  href='#'
                  isActive={item === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    handleChange(item - 1)
                  }}
                  className={clsx(
                    'rounded-[8px] min-w-8! min-h-8! border border-border w-full! p-2!',
                    item === currentPage && 'bg-primary font-semibold text-white hover:bg-primary! hover:text-white!',
                    'hover:border hover:border-primary hover:bg-white hover:text-primary transition-all duration-200'
                  )}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ))}
          </section>

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href='#'
              aria-disabled={page === totalPage - 1}
              className={clsx(
                page === totalPage - 1 ? 'pointer-events-none opacity-50' : '',
                'hover:border hover:border-primary hover:text-primary hover:bg-white'
              )}
              onClick={(e) => {
                e.preventDefault()
                handleChange(page + 1)
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}

export default PaginationCustom
