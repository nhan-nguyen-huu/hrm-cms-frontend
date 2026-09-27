import { clsx } from 'cn'
import { Search } from 'lucide-react'
import { type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormDateRangePickerField from '~/components/forms/form-date-range-picker-field'
import FormDateTimePickerField from '~/components/forms/form-date-time-picker-field'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Field } from '~/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import type { IOption } from '~/shared/models/common.model'
import type { TFieldFilterPanel, TFilterPanel, TFilterPanelForm } from '~/shared/types/common.type'

interface IFilterPanelProps<T extends FieldValues> {
  form: UseFormReturn<TFilterPanelForm>
  type?: TFilterPanel
  placeholderKeyword?: string
  fields: IBaseFilterField<T>[]
}

interface IBaseFilterField<T extends FieldValues> {
  type: TFieldFilterPanel
  name: FieldPath<T>
  placeholder?: string
  options?: IOption[]
  hasAllOption?: boolean
  className?: string
  showTime?: boolean
}

const FilterPanel = <T extends FieldValues>({ form, fields = [] }: IFilterPanelProps<T>) => {
  const { t } = useTranslation()
  return (
    <form
      className='flex items-start flex-wrap gap-3 base-shadow p-3 rounded-[14px] border border-border bg-white'
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      {fields.map((item, index) => (
        <Field className={clsx(item.className)} key={index}>
          <FormField
            control={form.control}
            name={item.name as any}
            render={(f, fs) => {
              switch (item.type) {
                case 'INPUT_GROUP':
                  return (
                    <InputGroup className='px-2 bg-white'>
                      <InputGroupInput {...f} id={f.name} placeholder={item.placeholder} autoComplete='off' />
                      <InputGroupAddon>
                        <Search className='size-5 text-[#99A1AF]' />
                      </InputGroupAddon>
                    </InputGroup>
                  )
                case 'SELECT':
                  return (
                    <FormSelectField
                      field={f}
                      fieldState={fs}
                      options={
                        item?.hasAllOption
                          ? [{ label: t('common.all'), value: COMMON_CONSTANT.FILTER_ALL }, ...(item?.options ?? [])]
                          : (item?.options ?? [])
                      }
                      placeHolder={item.placeholder}
                    />
                  )
                case 'DATE_RANGE':
                  return <FormDateRangePickerField placeHolder={item?.placeholder} field={f} fieldState={fs} />
                case 'DATE':
                  return (
                    <FormDateTimePickerField
                      placeHolder={item?.placeholder}
                      field={f}
                      fieldState={fs}
                      showTime={item?.showTime}
                    />
                  )
                default:
                  return null
              }
            }}
          />
        </Field>
      ))}
    </form>
  )
}

export default FilterPanel
