import type { ComponentProps } from 'react'

import clsx from 'clsx'
import type { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import type { IOption } from '~/shared/models/common.model'

interface IFormSelectFieldProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Select>,
  'value' | 'defaultValue' | 'onValueChange'
> {
  options: IOption[]
  placeHolder?: string
  field: ControllerRenderProps<T, FieldPath<T>>
  fieldState?: ControllerFieldState
  triggerClassName?: string
  onCloseValidate?: () => void
  onValueChangeValidate?: (value?: string) => void
}

const FormSelectField = <T extends FieldValues>({
  options = [],
  placeHolder = '',
  field,
  fieldState,
  triggerClassName,
  onCloseValidate,
  onValueChangeValidate,
  ...rest
}: IFormSelectFieldProps<T>) => {
  return (
    <Select
      items={options.map((option) => ({ value: String(option.value ?? ''), label: option.label ?? '' }))}
      value={field.value ?? ''}
      onValueChange={(value) => {
        field.onChange(value)
        onValueChangeValidate?.(value as string)
      }}
      onOpenChange={(open) => {
        if (!open && !field.value) {
          onCloseValidate?.()
        }
      }}
      {...rest}
    >
      <SelectTrigger className={clsx('w-full', triggerClassName)} aria-invalid={fieldState?.invalid}>
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} className='max-h-100'>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FormSelectField
