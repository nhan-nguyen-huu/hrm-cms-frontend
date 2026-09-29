import { clsx } from 'cn'
import { Search } from 'lucide-react'
import { type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import FormDateRangePickerField from '~/components/forms/form-date-range-picker-field'
import FormDateTimePickerField from '~/components/forms/form-date-time-picker-field'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Field } from '~/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import { commonHelper } from '~/helpers'
import PageLayout from '~/layouts/page.layout'
import type { IOption } from '~/shared/models/common.model'
import type { TFieldFilterPanel, TFilterPanel, TFilterPanelForm } from '~/shared/types/common.type'

interface IFilterPanelProps<T extends FieldValues> {
  form: UseFormReturn<TFilterPanelForm>
  type?: TFilterPanel
  fields: IBaseFilterField<T>[]
  onReset: () => void
  onSearch: () => void
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

const FilterPanel = <T extends FieldValues>({ form, fields = [], onReset, onSearch }: IFilterPanelProps<T>) => {
  const { t } = useTranslation()
  return (
    <PageLayout className='base-shadow rounded-[14px] border border-border bg-white gap-0!'>
      <form
        className='grid grid-cols-12 gap-3 p-3 border-b border-b-border'
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        {fields.map((item, index) => (
          <Field className={clsx('col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3', item?.className)} key={index}>
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
                  case 'SELECT': {
                    return (
                      <FormSelectField
                        field={f}
                        fieldState={fs}
                        options={commonHelper.handleOptionFilter(item?.hasAllOption, item?.options)}
                        placeHolder={item.placeholder}
                      />
                    )
                  }
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
      <section className={clsx('flex items-center justify-end gap-2 p-3')}>
        <ButtonAction actionType='RESET' actionName={t('action.reset')} onClick={onReset} />
        <ButtonAction actionType='SEARCH' actionName={t('action.search')} onClick={onSearch} />
      </section>
    </PageLayout>
  )
}

export default FilterPanel
