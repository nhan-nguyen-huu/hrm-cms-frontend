import type { TFunction } from 'i18next'
import z from 'zod'
import { CCCD_NUMBER_REGEX, EMAIL_REGEX, PHONE_NUMBER_REGEX } from '~/helpers/schema.helper'
import { EGender, EMaritalStatus, ENationality } from '~/shared/enums/common.enum'
import { ePersonalEmployeeFormKey } from '~/shared/enums/form.enum'

export const getPersonalEmployeeSchema = (t: TFunction) =>
  z.object({
    // Basic information
    [ePersonalEmployeeFormKey.FullName]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.BirthDate]: z.date({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.Gender]: z.enum(EGender, { error: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.CccdNumber]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
      .regex(CCCD_NUMBER_REGEX, { message: t('inputValidate.invalidCccdFormat') }),
    [ePersonalEmployeeFormKey.DateOfIssue]: z.date({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.PlaceOfIssue]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),

    // Contact
    [ePersonalEmployeeFormKey.PhoneNumber]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
      .regex(PHONE_NUMBER_REGEX, { message: t('inputValidate.invalidPhoneFormat') }),
    [ePersonalEmployeeFormKey.Email]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
      .regex(EMAIL_REGEX, t('inputValidate.invalidEmailFormat')),
    [ePersonalEmployeeFormKey.EmergencyContact]: z.string().optional(),
    [ePersonalEmployeeFormKey.PermanentAddress]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.CurrentResidence]: z.string().optional(),

    // Additional
    [ePersonalEmployeeFormKey.MaritalStatus]: z.enum(EMaritalStatus).optional(),
    [ePersonalEmployeeFormKey.Nationality]: z.enum(ENationality).optional(),
    [ePersonalEmployeeFormKey.NumberOfDependents]: z.string().optional(),

    // Avatar
    [ePersonalEmployeeFormKey.Avatar]: z
      .instanceof(File)
      .optional()
      .refine((file) => file instanceof File, {
        message: t('inputValidate.thisInformationIsRequired')
      })
  })

export type TPersonalEmployeeSchema = z.infer<ReturnType<typeof getPersonalEmployeeSchema>>
