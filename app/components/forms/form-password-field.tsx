import { useState } from 'react'

import clsx from 'clsx'
import type { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { EyeHideIcon, EyeShowIcon, LockIcon } from '~/assets/svgs'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'

interface IFormPasswordFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  placeholder?: string
  field: ControllerRenderProps<TFieldValues, TName>
  fieldState: ControllerFieldState
  disabled?: boolean
  hiddenEye?: boolean
}
const FormPasswordField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  placeholder,
  field,
  fieldState,
  disabled,
  hiddenEye
}: IFormPasswordFieldProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(hiddenEye)
  return (
    <InputGroup className={clsx(disabled && 'bg-gray-100')}>
      <InputGroupAddon>
        <LockIcon className='size-6 text-gray-500' />
      </InputGroupAddon>
      <InputGroupInput
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        autoComplete='off'
        type={showPassword ? 'text' : 'password'}
        disabled={disabled}
        className={clsx(disabled && 'border border-input border-l-transparent border-r-transparent')}
      />
      <InputGroupAddon align='inline-end' className='mr-1!'>
        <button
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          type='button'
          onClick={() => setShowPassword(!showPassword)}
        >
          {!hiddenEye && (
            <>
              {showPassword ? (
                <EyeHideIcon className='size-5 text-[#99A1AF]' />
              ) : (
                <EyeShowIcon className='size-5 text-[#99A1AF]' />
              )}
            </>
          )}
        </button>
      </InputGroupAddon>
    </InputGroup>
  )
}

export default FormPasswordField
