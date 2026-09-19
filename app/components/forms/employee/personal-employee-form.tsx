import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormDateTimePickerField from '~/components/forms/form-date-time-picker-field'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import type { TPersonalEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import FormLayout from '~/layouts/form.layout'
import { DATA } from '~/shared/constants/data.constant'
import { ePersonalEmployeeFormKey } from '~/shared/enums/form.enum'

interface IPersonalEmployeeFormProps {
  form: UseFormReturn<TPersonalEmployeeSchema>
}
const PersonalEmployeeForm = ({ form }: IPersonalEmployeeFormProps) => {
  const { t } = useTranslation()
  const OPTIONS_GENDER = DATA.GET_OPTIONS_GENDER(t)
  const OPTIONS_MARITALSTATUS = DATA.GET_OPTIONS_MARITALSTATUS(t)
  const OPTIONS_NATIONLITY = DATA.GET_OPTIONS_NATIONLITY(t)

  return (
    <FormLayout>
      {/* Basic information */}
      <Card>
        <CardHeader>
          <CardTitle className='text-app-primay uppercase'>{t('title.basicInfo')}</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-12 gap-4'>
          {/* Full name */}
          <Field className='col-span-12 sm:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.FullName}
              label={t('inputLabel.fullName')}
              isRequired
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>

          {/* Birth date */}
          <Field className='col-span-12 md:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.BirthDate}
              label={t('inputLabel.birthDate')}
              isRequired
              render={(f, fs) => (
                <FormDateTimePickerField
                  field={f}
                  fieldState={fs}
                  placeHolder={t('inputPlaceholder.pleaseSelectDate')}
                />
              )}
            />
          </Field>

          {/* Gender */}
          <Field className='col-span-12 md:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.Gender}
              label={t('inputLabel.gender')}
              isRequired
              render={(field, fieldState) => (
                <FormSelectField field={field} fieldState={fieldState} options={OPTIONS_GENDER} />
              )}
            />
          </Field>

          {/* CCCD number */}
          <Field className='col-span-12 sm:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.CccdNumber}
              label={t('inputLabel.cccdNumber')}
              isRequired
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>

          {/* Date of issue  */}
          <Field className='col-span-12 md:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.DateOfIssue}
              label={t('inputLabel.dateOfIssue')}
              isRequired
              render={(f, fs) => (
                <FormDateTimePickerField
                  field={f}
                  fieldState={fs}
                  placeHolder={t('inputPlaceholder.pleaseSelectDate')}
                />
              )}
            />
          </Field>

          {/* Place of issue */}
          <Field className='col-span-12 sm:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.PlaceOfIssue}
              label={t('inputLabel.placeOfIssue')}
              isRequired
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card>
        <CardHeader>
          <CardTitle className='text-app-primay uppercase'>{t('title.contact')}</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-12 gap-4'>
          {/* Phone number */}
          <Field className='col-span-12 sm:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.PhoneNumber}
              label={t('inputLabel.phoneNumber')}
              isRequired
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>

          {/* Email*/}
          <Field className='col-span-12 sm:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.Email}
              label={t('inputLabel.personalEmail')}
              isRequired
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>

          {/* Emergency Contact */}
          <Field className='col-span-12 sm:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.EmergencyContact}
              label={t('inputLabel.emergencyContact')}
              isRequired
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>

          {/* Permanent address*/}
          <Field className='col-span-12 sm:col-span-6'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.PermanentAddress}
              label={t('inputLabel.permanentAddress')}
              isRequired
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>

          {/* Current residence*/}
          <Field className='col-span-12 sm:col-span-6'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.CurrentResidence}
              label={t('inputLabel.currentResidence')}
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.enterIfDifferentFromPermanentAddress')}
                  autoComplete='off'
                />
              )}
            />
          </Field>
        </CardContent>
      </Card>

      {/* Additional */}
      <Card>
        <CardHeader>
          <CardTitle className='text-app-primay uppercase'>{t('title.additionalInfo')}</CardTitle>
        </CardHeader>
        <CardContent className='grid grid-cols-12 gap-4'>
          {/* Marital status*/}
          <Field className='col-span-12 md:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.MaritalStatus}
              label={t('inputLabel.maritalStatus')}
              isRequired
              render={(field, fieldState) => (
                <FormSelectField field={field} fieldState={fieldState} options={OPTIONS_MARITALSTATUS} />
              )}
            />
          </Field>

          {/* Nationality*/}
          <Field className='col-span-12 md:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.Nationality}
              label={t('inputLabel.nationality')}
              isRequired
              render={(field, fieldState) => (
                <FormSelectField field={field} fieldState={fieldState} options={OPTIONS_NATIONLITY} />
              )}
            />
          </Field>

          {/* Full name */}
          <Field className='col-span-12 sm:col-span-4'>
            <FormField
              control={form.control}
              name={ePersonalEmployeeFormKey.NumberOfDependents}
              label={t('inputLabel.numberOfDependents')}
              render={(f, fs) => (
                <Input
                  {...f}
                  id={f.name}
                  aria-invalid={fs.invalid}
                  placeholder={t('inputPlaceholder.pleaseEnterInformation')}
                  autoComplete='off'
                />
              )}
            />
          </Field>
        </CardContent>
      </Card>
    </FormLayout>
  )
}

export default PersonalEmployeeForm
