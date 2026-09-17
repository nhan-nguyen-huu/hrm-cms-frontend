import type { VariantProps } from 'class-variance-authority'
import type { buttonVariants } from '~/components/ui/button'
import type { TFilterPanelEmployeeProfileFormSchema, TFilterPanelFormSchema } from '~/helpers/schema.helper'

export type CheckboxTableType = 'HEADER' | 'BODY'
export type TTimePart = 'hour' | 'minute' | 'second'
export type TProtected = 'ROOT' | 'AUTH_ONLY' | 'PRIVATE'
export type TButtonAction = 'DEFAULT' | 'UPLOAD' | 'DOWNLOAD' | 'CREATE'
export type TButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>
export type TFilterPanel = 'DEFAULT' | 'EMPLOYEE_PROFILE'
export type TEnumLike = Record<string, string>
export type TGetTranslateEnum<T extends TEnumLike> = {
  enumPath: string
  enumType: T
  value?: string | number
}
export type TFilterPanelForm = TFilterPanelFormSchema | TFilterPanelEmployeeProfileFormSchema
