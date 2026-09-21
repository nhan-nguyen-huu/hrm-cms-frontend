import { cn } from 'cn'
import { Check } from 'lucide-react'
import type { FieldPath, UseFormReturn } from 'react-hook-form'
import { useFormState, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { TPersonalEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import { ePersonalEmployeeFormKey } from '~/shared/enums/form.enum'

interface IImportProgressEmployeeProps {
  form: UseFormReturn<TPersonalEmployeeSchema>
}

const BASIC_INFO_FIELDS: FieldPath<TPersonalEmployeeSchema>[] = [
  ePersonalEmployeeFormKey.FullName,
  ePersonalEmployeeFormKey.BirthDate,
  ePersonalEmployeeFormKey.Gender,
  ePersonalEmployeeFormKey.CccdNumber,
  ePersonalEmployeeFormKey.DateOfIssue,
  ePersonalEmployeeFormKey.PlaceOfIssue
]

const CONTACT_FIELDS: FieldPath<TPersonalEmployeeSchema>[] = [
  ePersonalEmployeeFormKey.PhoneNumber,
  ePersonalEmployeeFormKey.Email,
  ePersonalEmployeeFormKey.PermanentAddress
]

const ImportProgressEmployee = ({ form }: IImportProgressEmployeeProps) => {
  const { t } = useTranslation()
  const { control } = form
  const { errors } = useFormState({ control })
  const values = useWatch({ control })

  const countCompletedFields = (fields: FieldPath<TPersonalEmployeeSchema>[]) =>
    fields.reduce((total, field) => {
      const value = values[field]
      const hasValue = value !== undefined && value !== null && value !== ''
      const hasError = Boolean(errors[field])
      return hasValue && !hasError ? total + 1 : total
    }, 0)

  const basicInfoCompletedCount = countCompletedFields(BASIC_INFO_FIELDS)
  const contactCompletedCount = countCompletedFields(CONTACT_FIELDS)

  const avatarValue = values[ePersonalEmployeeFormKey.Avatar]
  const isAvatarCompleted = Boolean(avatarValue) && !errors[ePersonalEmployeeFormKey.Avatar]

  const progressItems = [
    {
      key: ePersonalEmployeeFormKey.FullName,
      label: t('title.basicInfo'),
      isDone: basicInfoCompletedCount === BASIC_INFO_FIELDS.length,
      display: `${basicInfoCompletedCount}/${BASIC_INFO_FIELDS.length}`
    },
    {
      key: ePersonalEmployeeFormKey.PhoneNumber,
      label: t('title.contact'),
      isDone: contactCompletedCount === CONTACT_FIELDS.length,
      display: `${contactCompletedCount}/${CONTACT_FIELDS.length}`
    },
    {
      key: ePersonalEmployeeFormKey.Avatar,
      label: t('title.portraitPhoto'),
      isDone: isAvatarCompleted,
      display: t('msg.optional')
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-app-primay uppercase text-xs'>{t('title.importProgress')}</CardTitle>
      </CardHeader>
      <CardContent>
        <section className='flex flex-col gap-2'>
          {progressItems.map((item) => (
            <section key={item.key} className='flex items-center justify-between'>
              <section className='flex items-center gap-2'>
                <section
                  className={cn(
                    'size-[4.5] flex items-center justify-center rounded-full p-1',
                    item.isDone ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <Check className={cn('size-3', item.isDone ? 'text-white' : 'text-[#93A2B6]')} />
                </section>
                <p className={item.isDone ? 'text-app-primay' : 'text-[#93A2B6]'}>{item.label}</p>
              </section>
              <p className='text-[#93A2B6]'>{item.display}</p>
            </section>
          ))}
        </section>
      </CardContent>
    </Card>
  )
}

export default ImportProgressEmployee
