import type { TFunction } from 'i18next'
import z from 'zod'
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
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.DateOfIssue]: z.date({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.PlaceOfIssue]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),

    // Contact
    [ePersonalEmployeeFormKey.PhoneNumber]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),

    [ePersonalEmployeeFormKey.Email]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.EmergencyContact]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.PermanentAddress]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [ePersonalEmployeeFormKey.CurrentResidence]: z.string().optional(),

    // Additional
    [ePersonalEmployeeFormKey.MaritalStatus]: z.enum(EMaritalStatus).optional(),
    [ePersonalEmployeeFormKey.Nationality]: z.enum(ENationality).optional(),
    [ePersonalEmployeeFormKey.NumberOfDependents]: z.string().optional()
  })

export type TPersonalEmployeeSchema = z.infer<ReturnType<typeof getPersonalEmployeeSchema>>
