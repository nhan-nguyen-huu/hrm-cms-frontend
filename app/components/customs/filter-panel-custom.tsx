import type { ReactNode } from 'react'

import clsx from 'clsx'
import type { TFunction } from 'i18next'
import { Search } from 'lucide-react'
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Field } from '~/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import type { IOption } from '~/shared/models/common.model'

interface IBaseFilterField<T extends FieldValues> {
  name: FieldPath<T>
  placeholder?: string
  className?: string
}

// Discriminated by `type` — add new field kinds (dateRange, multiSelect, ...) here without touching pages
export type TFilterPanelCustomField<T extends FieldValues> =
  | (IBaseFilterField<T> & { type: 'keyword' })
  | (IBaseFilterField<T> & {
      type: 'select'
      options: IOption[]
      // Prepend an "All" option (value COMMON_CONSTANT.FILTER_ALL) so the user can clear the filter
      hasAllOption?: boolean
    })

interface IFilterPanelCustomProps<T extends FieldValues> {
  form: UseFormReturn<T>
  fields: TFilterPanelCustomField<T>[]
  // Called on Enter in a keyword box — for pages that search via API instead of filtering live
  onSearch?: (values: T) => void
  // Rendered at the right end, e.g. "Showing 12 / 12"
  extra?: ReactNode
  className?: string
}

const DEFAULT_WIDTH: Record<TFilterPanelCustomField<FieldValues>['type'], string> = {
  keyword: 'w-70',
  select: 'w-40'
}

/** A filter value counts as active when it is set and is not the "All" option. */
export const isActiveFilterValue = (value?: string | null) => !!value && value !== COMMON_CONSTANT.FILTER_ALL

const renderField = <T extends FieldValues>(
  form: UseFormReturn<T>,
  field: TFilterPanelCustomField<T>,
  t: TFunction
) => {
  switch (field.type) {
    case 'keyword':
      return (
        <FormField
          control={form.control}
          name={field.name}
          render={(f) => (
            <InputGroup className='px-2'>
              <InputGroupInput
                {...f}
                id={f.name}
                value={String(f.value ?? '')}
                placeholder={field.placeholder}
                autoComplete='off'
              />
              <InputGroupAddon>
                <Search className='size-5 text-[#99A1AF]' />
              </InputGroupAddon>
            </InputGroup>
          )}
        />
      )
    case 'select':
      return (
        <FormField
          control={form.control}
          name={field.name}
          render={(f, fs) => (
            <FormSelectField
              field={f}
              fieldState={fs}
              placeHolder={field.placeholder}
              options={
                field.hasAllOption
                  ? [{ label: t('common.all'), value: COMMON_CONSTANT.FILTER_ALL }, ...field.options]
                  : field.options
              }
            />
          )}
        />
      )
  }
}

const FilterPanelCustom = <T extends FieldValues>({
  form,
  fields,
  onSearch,
  extra,
  className
}: IFilterPanelCustomProps<T>) => {
  const { t } = useTranslation()

  return (
    <form
      className={clsx(
        'flex items-center flex-wrap gap-3 base-shadow p-3 rounded-[14px] border border-border',
        className
      )}
      onSubmit={form.handleSubmit((values) => onSearch?.(values))}
    >
      {fields.map((field) => (
        <Field key={field.name} className={field.className ?? DEFAULT_WIDTH[field.type]}>
          {renderField(form, field, t)}
        </Field>
      ))}
      {extra && <section className='ml-auto'>{extra}</section>}
    </form>
  )
}

export default FilterPanelCustom
