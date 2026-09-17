import { useState } from 'react'

import type { RowSelectionState } from '@tanstack/react-table'

const useRowSelection = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  return {
    rowSelection,
    setRowSelection,
    totalRow: Object.keys(rowSelection).length,
    ids: Object.keys(rowSelection).map(Number)
  }
}

export default useRowSelection
