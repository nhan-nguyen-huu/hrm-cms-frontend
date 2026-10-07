import { z } from 'zod'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import {
  EEmployeeDocumentStatus,
  EEmployeeDocumentType,
  EEmployeeStatus,
  EOnboardingStep,
  EOrgEventType
} from '~/shared/enums/common.enum'
import {
  EFilterPanelDraftEmployeeProfileFormKey,
  EFilterPanelEmployeeDocumentFormKey,
  EFilterPanelEmployeeEventFormKey,
  EFilterPanelEmployeeProfileFormKey,
  EFilterPanelFormKey,
  EFilterPanelProjectFormKey,
  ELoginFormKey
} from '~/shared/enums/form.enum'

export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{8,10}$/

export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
export const PHONE_REGEX = /^(010|840)-[0-9]{4}-[0-9]{4}$/
export const PHONE_NUMBER_REGEX = /^[0-9]{10}$/
export const CCCD_NUMBER_REGEX = /^[0-9]{12}$/

export const getFilterPanelSchema = () =>
  z.object({
    [EFilterPanelFormKey.Keyword]: z.string().optional()
  })
export type TFilterPanelFormSchema = z.infer<ReturnType<typeof getFilterPanelSchema>>

export const getFilterPanelEmployeeProfileSchema = () =>
  z.object({
    ...getFilterPanelSchema().shape,
    [EFilterPanelEmployeeProfileFormKey.EmploymentStatus]: z.enum(EEmployeeStatus).nullish()
  })

export type TFilterPanelEmployeeProfileFormSchema = z.infer<ReturnType<typeof getFilterPanelEmployeeProfileSchema>>

export const getFilterPanelDraftEmployeeSchema = () =>
  z.object({
    ...getFilterPanelSchema().shape,
    [EFilterPanelDraftEmployeeProfileFormKey.CurrentStep]: z
      .union([z.enum(EOnboardingStep), z.literal(COMMON_CONSTANT.FILTER_ALL)])
      .nullish()
  })

export type TFilterPanelDraftEmployeeFormSchema = z.infer<ReturnType<typeof getFilterPanelDraftEmployeeSchema>>

export const getFilterPanelEmployeeDocumentSchema = () =>
  z.object({
    ...getFilterPanelSchema().shape,
    [EFilterPanelEmployeeDocumentFormKey.DocumentType]: z.enum(EEmployeeDocumentType).nullish(),
    [EFilterPanelEmployeeDocumentFormKey.Status]: z.enum(EEmployeeDocumentStatus).nullish()
  })

export type TFilterPanelEmployeeDocumentFormSchema = z.infer<ReturnType<typeof getFilterPanelEmployeeDocumentSchema>>

export const getFilterPanelEmployeeEventSchema = () =>
  z.object({
    ...getFilterPanelSchema().shape,
    [EFilterPanelEmployeeEventFormKey.EventType]: z.enum(EOrgEventType).nullish(),
    // Actor full name, or ALL
    [EFilterPanelEmployeeEventFormKey.Actor]: z.string().nullish()
  })

export type TFilterPanelEmployeeEventFormSchema = z.infer<ReturnType<typeof getFilterPanelEmployeeEventSchema>>

export const getFilterPanelProjectSchema = () =>
  z.object({
    ...getFilterPanelSchema().shape,
    [EFilterPanelProjectFormKey.Department]: z.string().nullish(),
    [EFilterPanelProjectFormKey.Status]: z.string().nullish(),
    [EFilterPanelProjectFormKey.Year]: z.string().nullish()
  })

export type TFilterPanelProjectFormSchema = z.infer<ReturnType<typeof getFilterPanelProjectSchema>>

export const getLoginSchema = () =>
  z.object({
    [ELoginFormKey.Username]: z.string().optional(),
    [ELoginFormKey.Password]: z.string().optional()
  })

export type LoginFormSchema = z.infer<ReturnType<typeof getLoginSchema>>
