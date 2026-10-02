import type { TFunction } from 'i18next'
import z from 'zod'
import { CCCD_NUMBER_REGEX, EMAIL_REGEX, PHONE_NUMBER_REGEX } from '~/helpers/schema.helper'
import { EEmployeeDocumentType, EGender, EMaritalStatus, ENationality } from '~/shared/enums/common.enum'
import { EUploadEmployeeDocumentFormKey, ePersonalEmployeeFormKey } from '~/shared/enums/form.enum'

// Upload rules shown in the design (CmsHoSoTaiLieu) — TODO(assumption): BE limits not in the API docs, confirm with BE
export const EMPLOYEE_DOCUMENT_MAX_SIZE = 10 * 1024 * 1024
export const EMPLOYEE_DOCUMENT_ACCEPT = ['application/pdf', 'image/jpeg', 'image/png']
// EmployeeDocumentUploadForm.note maxLength (API docs)
export const EMPLOYEE_DOCUMENT_NOTE_MAX_LENGTH = 500

export const getUploadEmployeeDocumentSchema = (t: TFunction) =>
  z.object({
    [EUploadEmployeeDocumentFormKey.DocumentType]: z
      .enum(EEmployeeDocumentType, { error: t('inputValidate.thisInformationIsRequired') })
      // "All" is a filter value only
      .exclude(['All'], { error: t('inputValidate.thisInformationIsRequired') }),
    [EUploadEmployeeDocumentFormKey.File]: z
      .instanceof(File, { message: t('inputValidate.thisInformationIsRequired') })
      .refine((file) => EMPLOYEE_DOCUMENT_ACCEPT.includes(file.type), {
        message: t('inputValidate.invalidDocumentType')
      })
      .refine((file) => file.size <= EMPLOYEE_DOCUMENT_MAX_SIZE, { message: t('inputValidate.documentTooLarge') }),
    [EUploadEmployeeDocumentFormKey.Note]: z
      .string()
      .max(EMPLOYEE_DOCUMENT_NOTE_MAX_LENGTH, {
        message: t('inputValidate.maxLength', { max: EMPLOYEE_DOCUMENT_NOTE_MAX_LENGTH })
      })
      .optional()
  })

export type TUploadEmployeeDocumentSchema = z.infer<ReturnType<typeof getUploadEmployeeDocumentSchema>>

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
    [ePersonalEmployeeFormKey.Avatar]: z.instanceof(File).optional()
  })

export type TPersonalEmployeeSchema = z.infer<ReturnType<typeof getPersonalEmployeeSchema>>
