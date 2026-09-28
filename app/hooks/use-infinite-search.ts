import { useState } from 'react'

import useDebouncedValue from '~/hooks/use-debounce-value'

const useInfiniteSearch = <T>() => {
  const [keyword, setKeyword] = useState('')
  const [dataInfinite, setDataInfinite] = useState<T | null>(null)
  const [dataListInfinite, setDataListInfinite] = useState<T[]>([])
  const debouncedKeyword = useDebouncedValue(keyword, 400)

  return {
    keyword,
    setKeyword,
    dataInfinite,
    setDataInfinite,
    debouncedKeyword,
    dataListInfinite,
    setDataListInfinite
  }
}

export default useInfiniteSearch
