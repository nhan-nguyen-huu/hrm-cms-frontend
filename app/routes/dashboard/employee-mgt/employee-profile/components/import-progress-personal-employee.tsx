import type { FieldPath, UseFormReturn } from 'react-hook-form'
import { useFormState, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ImportInprogress from '~/components/common/import-inprogress'
import { commonHelper } from '~/helpers'
import type { TPersonalEmployeeSchema } from '~/helpers/schemas/employee-schema.helper'
import { EPersonalEmployeeFormKey } from '~/shared/enums/form.enum'

interface IImportProgressPersonalEmployeeProps {
  form: UseFormReturn<TPersonalEmployeeSchema>
}

const BASIC_INFO_FIELDS: FieldPath<TPersonalEmployeeSchema>[] = [
  EPersonalEmployeeFormKey.FullName,
  EPersonalEmployeeFormKey.DateOfBirth,
  EPersonalEmployeeFormKey.Gender,
  EPersonalEmployeeFormKey.IdCardNumber,
  EPersonalEmployeeFormKey.IdCardIssuedDate,
  EPersonalEmployeeFormKey.IdCardIssuedPlace
]

const CONTACT_FIELDS: FieldPath<TPersonalEmployeeSchema>[] = [
  EPersonalEmployeeFormKey.Phone,
  EPersonalEmployeeFormKey.PersonalEmail,
  EPersonalEmployeeFormKey.PermanentAddress
]

const ImportProgressPersonalEmployee = ({ form }: IImportProgressPersonalEmployeeProps) => {
  const { t } = useTranslation()
  const { control } = form
  const { errors } = useFormState({ control })
  const values = useWatch({ control })

  const basicInfoCompletedCount = commonHelper.countCompletedFields(BASIC_INFO_FIELDS, values, errors)
  const contactCompletedCount = commonHelper.countCompletedFields(CONTACT_FIELDS, values, errors)

  const avatarValue = values[EPersonalEmployeeFormKey.Avatar]
  const isAvatarCompleted = Boolean(avatarValue) && !errors[EPersonalEmployeeFormKey.Avatar]

  const progressItems = [
    {
      label: t('title.basicInfo'),
      isDone: basicInfoCompletedCount === BASIC_INFO_FIELDS.length,
      display: `${basicInfoCompletedCount}/${BASIC_INFO_FIELDS.length}`
    },
    {
      label: t('title.contact'),
      isDone: contactCompletedCount === CONTACT_FIELDS.length,
      display: `${contactCompletedCount}/${CONTACT_FIELDS.length}`
    },
    {
      label: t('title.portraitPhoto'),
      isDone: isAvatarCompleted,
      display: t('msg.optional')
    }
  ]

  return <ImportInprogress progressItems={progressItems} />
}

export default ImportProgressPersonalEmployee
