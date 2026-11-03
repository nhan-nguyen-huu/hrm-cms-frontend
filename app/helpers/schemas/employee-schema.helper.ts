import type { TFunction } from 'i18next'
import z from 'zod'
import { CCCD_NUMBER_REGEX, EMAIL_REGEX, PHONE_NUMBER_REGEX } from '~/helpers/schema.helper'
import {
  EEmployeeDocumentType,
  EEmploymentType,
  EGender,
  EMaritalStatus,
  ENationality,
  EWorkShift
} from '~/shared/enums/common.enum'
import { EJobEmployeeFormKey, EPersonalEmployeeFormKey, EUploadEmployeeDocumentFormKey } from '~/shared/enums/form.enum'

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
    [EPersonalEmployeeFormKey.FullName]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [EPersonalEmployeeFormKey.DateOfBirth]: z.date({ message: t('inputValidate.thisInformationIsRequired') }),
    [EPersonalEmployeeFormKey.Gender]: z.enum(EGender, { error: t('inputValidate.thisInformationIsRequired') }),
    [EPersonalEmployeeFormKey.IdCardNumber]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
      .regex(CCCD_NUMBER_REGEX, { message: t('inputValidate.invalidCccdFormat') }),
    [EPersonalEmployeeFormKey.IdCardIssuedDate]: z.date({ message: t('inputValidate.thisInformationIsRequired') }),
    [EPersonalEmployeeFormKey.IdCardIssuedPlace]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),

    // Contact
    [EPersonalEmployeeFormKey.Phone]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
      .regex(PHONE_NUMBER_REGEX, { message: t('inputValidate.invalidPhoneFormat') }),
    [EPersonalEmployeeFormKey.PersonalEmail]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
      .regex(EMAIL_REGEX, t('inputValidate.invalidEmailFormat')),
    [EPersonalEmployeeFormKey.PermanentAddress]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [EPersonalEmployeeFormKey.CurrentAddress]: z.string().optional(),
    [EPersonalEmployeeFormKey.EmergencyContact]: z.string().optional(),

    // Additional
    [EPersonalEmployeeFormKey.MaritalStatus]: z.enum(EMaritalStatus).optional(),
    [EPersonalEmployeeFormKey.Nationality]: z.enum(ENationality).optional(),
    [EPersonalEmployeeFormKey.DependentCount]: z.string().optional(),

    // Avatar
    [EPersonalEmployeeFormKey.Avatar]: z.instanceof(File).optional()
  })

export type TPersonalEmployeeSchema = z.infer<ReturnType<typeof getPersonalEmployeeSchema>>

export const getJobEmployeeSchema = (t: TFunction) =>
  z.object({
    [EJobEmployeeFormKey.DepartmentId]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [EJobEmployeeFormKey.ProjectId]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [EJobEmployeeFormKey.JobTitleId]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [EJobEmployeeFormKey.JobGradeId]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [EJobEmployeeFormKey.LineManagerId]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),

    [EJobEmployeeFormKey.StartDate]: z.date({ message: t('inputValidate.thisInformationIsRequired') }),
    [EJobEmployeeFormKey.EmploymentType]: z.enum(EEmploymentType, {
      error: t('inputValidate.thisInformationIsRequired')
    }),
    [EJobEmployeeFormKey.OfficeId]: z.string().nonempty({ message: t('inputValidate.thisInformationIsRequired') }),
    [EJobEmployeeFormKey.WorkShift]: z.enum(EWorkShift, {
      error: t('inputValidate.thisInformationIsRequired')
    }),

    [EJobEmployeeFormKey.AnnualLeaveDays]: z
      .string()
      .nonempty({ message: t('inputValidate.thisInformationIsRequired') })
  })

export type TJobEmployeeSchema = z.infer<ReturnType<typeof getJobEmployeeSchema>>
