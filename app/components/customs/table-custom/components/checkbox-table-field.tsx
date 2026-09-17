import type { ComponentProps } from 'react'

import type { Row, Table } from '@tanstack/react-table'
import { Checkbox } from '~/components/ui/checkbox'
import type { CheckboxTableType } from '~/shared/types/common.type'

type CheckboxProps = ComponentProps<typeof Checkbox>

interface ICheckboxTableFieldProps<T> extends CheckboxProps {
  table?: Table<T>
  row?: Row<T>
  tableType: CheckboxTableType
}

const CheckboxTableField = <T,>({ table, row, tableType, ...props }: ICheckboxTableFieldProps<T>) => {
  const checkboxMapping: Record<CheckboxTableType, any> = {
    HEADER: {
      checked: table?.getIsAllPageRowsSelected(),
      indeterminate: !table?.getIsAllPageRowsSelected() && table?.getIsSomePageRowsSelected(),
      onCheckedChange: (value: boolean) => table?.toggleAllPageRowsSelected(!!value)
    },
    BODY: {
      checked: row?.getIsSelected(),
      indeterminate: false,
      onCheckedChange: (value: boolean) => row?.toggleSelected(!!value)
    }
  }
  return (
    <section onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checkboxMapping[tableType].checked}
        indeterminate={checkboxMapping[tableType].indeterminate}
        onCheckedChange={(value: boolean) => checkboxMapping[tableType].onCheckedChange(value)}
        className='size-5 mr-auto'
        {...props}
      />
    </section>
  )
}

export default CheckboxTableField
