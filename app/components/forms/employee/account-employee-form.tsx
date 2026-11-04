import { useEffect } from 'react'

import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import FormField from '~/components/forms/form-field'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { commonHelper } from '~/helpers'
import type { TAccountEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import ReadyToCreate from '~/routes/dashboard/employee-mgt/employee-profile/components/ready-to-create'
import ReviewBeforeCreating from '~/routes/dashboard/employee-mgt/employee-profile/components/review-before-creating'
import type { EOnboardingStep } from '~/shared/enums/common.enum'
import { EAccountEmployeeFormKey } from '~/shared/enums/form.enum'
import type { IEmployee } from '~/shared/models/employee.model'

interface IAccountEmployeeFormProps {
  form: UseFormReturn<TAccountEmployeeSchema>
  data?: IEmployee
  fullName?: string
  personalEmail?: string
  effectiveDate?: string
  onChangeActiveStep: (step: EOnboardingStep) => void
}

const AccountEmployeeForm = ({
  form,
  data,
  fullName,
  personalEmail,
  effectiveDate,
  onChangeActiveStep
}: IAccountEmployeeFormProps) => {
  const { t } = useTranslation()
  const companyEmail = commonHelper.getCompanyEmail(fullName)

  useEffect(() => {
    form.setValue(EAccountEmployeeFormKey.Email, companyEmail, { shouldValidate: true })
  }, [companyEmail, form])

  return (
    <form className='grid grid-cols-12 gap-4'>
      <section className='col-span-12 flex flex-col gap-4 sm:col-span-8 md:col-span-9'>
        <CardCustom title={t('stepper.upsertEmployee.accountConfirmation.title')}>
          <section className='grid grid-cols-12 gap-4'>
            <Field className='col-span-4'>
              <FormField
                control={form.control}
                name={EAccountEmployeeFormKey.Email}
                label={t('inputLabel.companyEmail')}
                isRequired
                render={(field, fieldState) => (
                  <Input
                    disabled
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  />
                )}
              />
            </Field>
            <Field className='col-span-12'>
              <FormField
                control={form.control}
                name={EAccountEmployeeFormKey.SendInviteEmail}
                render={(field) => (
                  <section className='flex items-center gap-2'>
                    <Switch
                      id={EAccountEmployeeFormKey.SendInviteEmail}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor={EAccountEmployeeFormKey.SendInviteEmail}>
                      <section className='flex flex-col gap-1'>
                        <p className='text-[12.5px]'>{t('inputLabel.sendInviteEmail')}</p>
                        <p className='text-xs text-[#6E7F96]'>
                          {t('msg.inviteEmailDescription', {
                            email: personalEmail || '-',
                            date: effectiveDate
                          })}
                        </p>
                      </section>
                    </Label>
                  </section>
                )}
              />
            </Field>
            <Field className='col-span-12'>
              <FormField
                control={form.control}
                name={EAccountEmployeeFormKey.RequirePasswordChange}
                render={(field) => (
                  <section className='flex items-center gap-2'>
                    <Switch
                      id={EAccountEmployeeFormKey.RequirePasswordChange}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor={EAccountEmployeeFormKey.RequirePasswordChange}>
                      <section className='flex flex-col gap-1'>
                        <p className='text-[12.5px]'>{t('inputLabel.requirePasswordChange')}</p>
                        <p className='text-xs text-[#6E7F96]'>{t('msg.requirePasswordChangeDescription')}</p>
                      </section>
                    </Label>
                  </section>
                )}
              />
            </Field>
          </section>
        </CardCustom>
        <ReviewBeforeCreating data={data} onChangeActiveStep={onChangeActiveStep} />
      </section>
      <aside className='col-span-12 sm:col-span-4 md:col-span-3 flex flex-col gap-4'>
        <ReadyToCreate />
      </aside>
    </form>
  )
}

export default AccountEmployeeForm
