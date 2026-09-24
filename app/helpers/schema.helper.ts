import { z } from 'zod'
import { EEmployeeAccountStatus } from '~/shared/enums/common.enum'
import {
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
    [EFilterPanelEmployeeProfileFormKey.EmployeeAccountStatus]: z.enum(EEmployeeAccountStatus).nullish()
  })

export type TFilterPanelEmployeeProfileFormSchema = z.infer<ReturnType<typeof getFilterPanelEmployeeProfileSchema>>

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
