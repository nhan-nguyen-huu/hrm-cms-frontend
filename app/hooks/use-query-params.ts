import { type URLSearchParamsInit, useSearchParams } from 'react-router'

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const setQuery = (values: URLSearchParamsInit) => {
    setSearchParams(values, { replace: true })
  }

  const setQueryParam = (key: string, value: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams)
      nextParams.set(key, value)
      return nextParams
    })
  }

  return {
    searchParams,
    setQuery,
    setQueryParam
  }
}

export default useQueryParams
