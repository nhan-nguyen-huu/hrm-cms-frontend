import { useCallback, useMemo, useState } from 'react'

import { useSearchParams } from 'react-router'

export const DEFAULT_PAGING = {
  PAGE: 0,
  SIZE: 10
}
interface IUsePaginationProps {
  isNoSyncParams?: boolean
}

export const usePagination = (props?: IUsePaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(Number(searchParams.get('page')) || DEFAULT_PAGING.PAGE)
  const [size, setSize] = useState(Number(searchParams.get('size')) || DEFAULT_PAGING.SIZE)

  const handlePageChange = useCallback(
    (p: number) => {
      setPage(p)
      if (!props?.isNoSyncParams) {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev)
          params.set('page', String(p))
          return params
        })
      }
    },
    [setSearchParams]
  )

  const handleSizeChange = useCallback(
    (s: number) => {
      setPage(DEFAULT_PAGING.PAGE)
      setSize(s)
      if (!props?.isNoSyncParams) {
        setSearchParams((prev) => {
          const params = new URLSearchParams(prev)
          params.set('page', DEFAULT_PAGING.PAGE.toString())
          params.set('size', s.toString())
          return params
        })
      }
    },
    [setSearchParams]
  )

  const handleResetPage = useCallback(() => {
    setPage(DEFAULT_PAGING.PAGE)
  }, [])

  const handleReset = useCallback(() => {
    setPage(DEFAULT_PAGING.PAGE)
    setSize(DEFAULT_PAGING.SIZE)
  }, [])

  const paging = useMemo(() => {
    return { page, size }
  }, [page, size])

  const getSearchPaging = () => {
    return { page: DEFAULT_PAGING.PAGE, size }
  }

  const getResetPaging = () => {
    return { page: DEFAULT_PAGING.PAGE, size: DEFAULT_PAGING.SIZE }
  }

  return {
    page,
    size,
    setPage: handlePageChange,
    setSize: handleSizeChange,
    resetPage: handleResetPage,
    resetPaging: handleReset,
    getSearchPaging,
    getResetPaging,
    paging
  }
}
