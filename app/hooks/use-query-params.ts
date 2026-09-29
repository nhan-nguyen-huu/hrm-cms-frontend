import { type URLSearchParamsInit, useSearchParams } from 'react-router'

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setQuery = (values: URLSearchParamsInit) => {
    setSearchParams(values, { replace: true })
  }

  const updateQuery = (key: string, value: string | undefined | null | number) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      nextParams.set(key, value as string)
      return nextParams
    })
  }

  const updateQueries = (values: Record<string, string | undefined | null | number>) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      Object.entries(values).forEach(([key, value]) => {
        nextParams.set(key, value as string)
      })
      return nextParams
    })
  }

  return {
    searchParams,
    setQuery,
    updateQuery,
    updateQueries
  }
}

export default useQueryParams
