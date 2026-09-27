import { useMemo } from 'react'

import { type UseInfiniteQueryOptions, type UseQueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { DEFAULT_PAGING } from '~/hooks/use-pagination'
import type { IApiPagination, IApiResponse, IBasePagination } from '~/shared/models/common.model'

type TListQueryOptions<TData> = Omit<UseQueryOptions<IApiPagination<TData>>, 'queryKey' | 'queryFn'>

interface UseListApiConfig<TParams, TData, TExtra extends readonly unknown[]> {
  params?: TParams
  extraKeys?: TExtra
  options?: TListQueryOptions<TData>
}

export function createListApiHook<TParams, TData, TExtra extends readonly unknown[] = readonly unknown[]>(
  baseKey: string,
  service: (params?: TParams) => Promise<IApiResponse<IApiPagination<TData>> | undefined>
) {
  return function useListApi(config: UseListApiConfig<TParams, TData, TExtra> = {}) {
    const { params, extraKeys, options } = config
    const query = useQuery({
      queryKey: [baseKey, params, ...(extraKeys ?? [])],
      queryFn: async () => {
        const res = await service(params)
        const data = res?.data
        if (!data) {
          throw new Error('Error')
        }
        return data
      },
      ...options
    })
    const totalPage = query?.data?.totalPages || 0
    const totalElement = query?.data?.totalElements
    const list = query?.data?.content || []
    return { ...query, list, totalPage, totalElement }
  }
}

type TDetailQueryOptions<TData> = Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
interface UseDetailApiConfig<TId, TParams, TData, TExtra extends readonly unknown[]> {
  id?: TId
  params?: TParams
  extraKeys?: TExtra
  options?: TDetailQueryOptions<TData>
}

export function createDetailApiHook<
  TId extends number | string = number,
  TParams = never,
  TData = unknown,
  TExtra extends readonly unknown[] = readonly unknown[]
>(baseKey: string, service: (id?: TId, params?: TParams) => Promise<IApiResponse<TData>>) {
  return function useDetailApi(config: UseDetailApiConfig<TId, TParams, TData, TExtra> = {}) {
    const { id, params, extraKeys, options } = config
    return useQuery({
      queryKey: [baseKey, id, params, ...(extraKeys ?? [])],
      queryFn: async () => {
        const res = await service(id, params)
        const data = res?.data
        if (!data) {
          throw new Error('Error')
        }
        return data
      },
      ...options
    })
  }
}

type TInfiniteListQueryOptions<TData> = Omit<
  UseInfiniteQueryOptions<IApiPagination<TData>>,
  'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam' | 'enabled' | 'select'
>

interface UseInfiniteListApiConfig<TParams, TData, TExtra extends readonly unknown[]> {
  params?: Omit<TParams, 'page' | 'size'>
  size?: number
  enabled?: boolean
  extraKeys?: TExtra
  options?: TInfiniteListQueryOptions<TData>
}

/**
 * Same list API shape as `createListApiHook`, but paginates via `useInfiniteQuery`
 * (page-by-page accumulation) instead of replacing the page on each request.
 * Works with any existing `(params) => Promise<IApiResponse<IApiPagination<T>>>` service.
 */
export function createInfiniteListApiHook<
  TParams extends IBasePagination,
  TData,
  TExtra extends readonly unknown[] = readonly unknown[]
>(baseKey: string, service: (params?: TParams) => Promise<IApiResponse<IApiPagination<TData>> | undefined>) {
  return function useInfiniteListApi(config: UseInfiniteListApiConfig<TParams, TData, TExtra> = {}) {
    const { params, size = DEFAULT_PAGING.SIZE, enabled = true, extraKeys, options } = config
    const query = useInfiniteQuery({
      queryKey: [baseKey, 'INFINITE', params, size, ...(extraKeys ?? [])],
      queryFn: async ({ pageParam }) => {
        const res = await service({ ...(params as TParams), page: pageParam, size })
        const data = res?.data
        if (!data) {
          throw new Error('Error')
        }
        return data
      },
      initialPageParam: DEFAULT_PAGING.PAGE,
      getNextPageParam: (lastPage) => {
        const nextPage = (lastPage.page ?? DEFAULT_PAGING.PAGE) + 1
        if (lastPage.last || (lastPage.totalPages !== undefined && nextPage >= lastPage.totalPages)) {
          return undefined
        }
        return nextPage
      },
      ...options,
      enabled
    })
    const items = useMemo(() => query.data?.pages.flatMap((page) => page.content ?? []) ?? [], [query.data])
    const total = query.data?.pages[0]?.totalElements ?? 0
    return { ...query, items, total }
  }
}
