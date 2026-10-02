import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormDateTimePickerField from '~/components/forms/form-date-time-picker-field'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Checkbox } from '~/components/ui/checkbox'
import { Field } from '~/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '~/components/ui/input-group'
import type { TAddProjectMemberSchema } from '~/helpers/schemas/project-schema.helper'
import ProjectAllocationCheck from '~/routes/dashboard/organization-mgt/components/project/project-allocation-check'
import { DATA } from '~/shared/constants/data.constant'
import { EAddProjectMemberFormKey } from '~/shared/enums/form.enum'
import type { IOption } from '~/shared/models/common.model'
import type { IAllocationCheckRow } from '~/shared/models/project.model'

interface IAddProjectMemberFormProps {
  form: UseFormReturn<TAddProjectMemberSchema>
  // Lets a button outside the form (dialog footer) submit it
  formId: string
  candidateOptions: IOption[]
  // Allocation check of the selected employee; hidden while no employee is selected
  checkRows?: IAllocationCheckRow[]
  // Shows the "confirm over 100%" checkbox
  isOverAllocated: boolean
  onSubmit: (values: TAddProjectMemberSchema) => void
}

// Fields of the "add member" dialog: employee · role · allocation · joined from · allocation check · confirm
const AddProjectMemberForm = ({
  form,
  formId,
  candidateOptions,
  checkRows,
  isOverAllocated,
  onSubmit
}: IAddProjectMemberFormProps) => {
  const { t } = useTranslation()
  return (
    // Fixed height = tallest state (allocation check + confirm checkbox) so the dialog does not jump when they appear; scrolls if validation errors add more
    <form
      id={formId}
      className='-mx-1 flex h-96 flex-col gap-4 overflow-y-auto px-1'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormField
        control={form.control}
        name={EAddProjectMemberFormKey.Employee}
        label={t('inputLabel.employee')}
        isRequired
        render={(field, fieldState) => (
          <FormSelectField
            field={field}
            fieldState={fieldState}
            options={candidateOptions}
            placeHolder={t('inputPlaceholder.selectEmployee')}
          />
        )}
      />
      <section className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <FormField
          control={form.control}
          name={EAddProjectMemberFormKey.Role}
          label={t('inputLabel.projectRole')}
          isRequired
          render={(field, fieldState) => (
            <FormSelectField
              field={field}
              fieldState={fieldState}
              options={DATA.GET_OPTIONS_PROJECT_ROLE()}
              placeHolder={t('inputPlaceholder.select')}
            />
          )}
        />
        <FormField
          control={form.control}
          name={EAddProjectMemberFormKey.Allocation}
          label={t('inputLabel.allocationRate')}
          isRequired
          render={(f, fs) => (
            <InputGroup>
              <InputGroupInput
                {...f}
                id={f.name}
                inputMode='numeric'
                aria-invalid={fs.invalid}
                placeholder='0'
                autoComplete='off'
              />
              <InputGroupAddon align='inline-end'>%</InputGroupAddon>
            </InputGroup>
          )}
        />
        <FormField
          control={form.control}
          name={EAddProjectMemberFormKey.JoinedDate}
          label={t('inputLabel.joinedFrom')}
          isRequired
          render={(field, fieldState) => (
            <FormDateTimePickerField
              field={field}
              fieldState={fieldState}
              placeHolder={t('inputPlaceholder.pleaseSelectDate')}
            />
          )}
        />
      </section>

      {checkRows && <ProjectAllocationCheck rows={checkRows} />}

      {isOverAllocated && (
        <FormField
          control={form.control}
          name={EAddProjectMemberFormKey.ConfirmOverAllocation}
          render={(field) => (
            <Field orientation='horizontal' className='items-center gap-2.5'>
              <Checkbox
                id={field.name}
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(!!checked)}
              />
              <label htmlFor={field.name} className='cursor-pointer text-[13px]'>
                {t('inputLabel.confirmOverAllocation')}
              </label>
            </Field>
          )}
        />
      )}
    </form>
  )
}

export default AddProjectMemberForm
