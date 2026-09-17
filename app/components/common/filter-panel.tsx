import { Search } from 'lucide-react'
import { type UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Field } from '~/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import { DATA } from '~/shared/constants/data.constant'
import { EFilterPanelEmployeeProfileFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'
import type { TFilterPanel, TFilterPanelForm } from '~/shared/types/common.type'

interface IFilterPanelProps {
  form: UseFormReturn<TFilterPanelForm>
  type?: TFilterPanel
  placeholderKeyword?: string
}
const FilterPanel = ({ form, type = 'DEFAULT', placeholderKeyword }: IFilterPanelProps) => {
  console.log('type: ', type)
  const { t } = useTranslation()

  const OPTIONS_EMPLOYEE_ACCOUNT_STATUS = DATA.GET_OPTIONS_EMPLOYEE_ACCOUNT_STATUS(t)

  return (
    <form
      className='flex items-start flex-wrap gap-3 base-shadow p-3 rounded-[14px]'
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Field className='w-70'>
        <FormField
          control={form.control}
          name={EFilterPanelFormKey.Keyword}
          isRequired
          render={(f) => (
            <InputGroup className='px-2'>
              <InputGroupInput
                {...f}
                id={f.name}
                placeholder={placeholderKeyword}
                autoComplete='off'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    // handleSearch()
                  }
                }}
              />
              <InputGroupAddon>
                <Search className='size-5 text-[#99A1AF]' />
              </InputGroupAddon>
            </InputGroup>
          )}
        />
      </Field>
      <Field className='w-40'>
        <FormField
          control={form.control}
          name={EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus}
          isRequired
          render={(field, fieldState) => (
            <FormSelectField
              field={field}
              fieldState={fieldState}
              options={OPTIONS_EMPLOYEE_ACCOUNT_STATUS ?? []}
              placeHolder={'Trạng thái'}
            />
          )}
        />
      </Field>
      <Field className='w-40'>
        <FormField
          control={form.control}
          name={EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus}
          isRequired
          render={(field, fieldState) => (
            <FormSelectField
              field={field}
              fieldState={fieldState}
              options={OPTIONS_EMPLOYEE_ACCOUNT_STATUS ?? []}
              placeHolder={'Loại hợp đồng'}
            />
          )}
        />
      </Field>
    </form>
  )
}

export default FilterPanel
