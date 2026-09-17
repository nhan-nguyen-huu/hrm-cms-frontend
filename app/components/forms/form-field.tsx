import type { ReactNode } from 'react'

import {
  type Control,
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues
} from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '~/components/ui/field'

interface FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  isRequired?: boolean
  render: (field: ControllerRenderProps<TFieldValues, TName>, fieldState: ControllerFieldState) => ReactNode
}

const FormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  control,
  name,
  label,
  isRequired = false,
  render
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel required={isRequired} htmlFor={field.name}>
              {label}
            </FieldLabel>
          )}
          {render(field, fieldState)}
          {isRequired && fieldState.invalid && fieldState.error && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default FormField
