import type { TFilterPanelEmployeeProfileFormSchema, TFilterPanelFormSchema } from '~/helpers/schema.helper'
import { EEmployeeStatus, EGender, EMaritalStatus, ENationality } from '~/shared/enums/common.enum'
import {
  EAddProjectMemberFormKey,
  EFilterPanelEmployeeProfileFormKey,
  EFilterPanelFormKey,
  ELoginFormKey,
  ePersonalEmployeeFormKey
} from '~/shared/enums/form.enum'

export const formHelper = {
  getDefaultValuesFilterPanel: (searchParams: URLSearchParams, DEFAULT_VALUES: TFilterPanelFormSchema) => {
    return {
      [EFilterPanelFormKey.Keyword]: searchParams.get('keyword') ?? DEFAULT_VALUES?.keyword
    }
  },
  getDefaultValuesAddProjectMember: () => {
    return {
      [EAddProjectMemberFormKey.Employee]: '',
      [EAddProjectMemberFormKey.Role]: '',
      [EAddProjectMemberFormKey.Allocation]: '',
      [EAddProjectMemberFormKey.JoinedDate]: undefined,
      [EAddProjectMemberFormKey.ConfirmOverAllocation]: false
    }
  },
  getDefaultValuesLogin: () => {
    return {
      [ELoginFormKey.Username]: '',
      [ELoginFormKey.Password]: ''
    }
  },
  getDefaultValuesLoginPersonalEmployee: () => {
    return {
      [ePersonalEmployeeFormKey.FullName]: '',
      [ePersonalEmployeeFormKey.BirthDate]: undefined,
      [ePersonalEmployeeFormKey.Gender]: EGender.Male,
      [ePersonalEmployeeFormKey.CccdNumber]: '',
      [ePersonalEmployeeFormKey.DateOfIssue]: undefined,
      [ePersonalEmployeeFormKey.PlaceOfIssue]: '',

      [ePersonalEmployeeFormKey.PhoneNumber]: '',
      [ePersonalEmployeeFormKey.Email]: '',
      [ePersonalEmployeeFormKey.EmergencyContact]: '',
      [ePersonalEmployeeFormKey.PermanentAddress]: '',
      [ePersonalEmployeeFormKey.CurrentResidence]: '',

      [ePersonalEmployeeFormKey.MaritalStatus]: EMaritalStatus.Single,
      [ePersonalEmployeeFormKey.Nationality]: ENationality.Vi,
      [ePersonalEmployeeFormKey.NumberOfDependents]: '0',

      [ePersonalEmployeeFormKey.Avatar]: undefined
    }
  },
  getDefaultValuesEmployee: (searchParams: URLSearchParams, DEFAULT_VALUES: TFilterPanelEmployeeProfileFormSchema) => {
    return {
      ...formHelper.getDefaultValuesFilterPanel(searchParams, DEFAULT_VALUES),
      [EFilterPanelEmployeeProfileFormKey.EmploymentStatus]:
        (searchParams.get('employmentStatus') as EEmployeeStatus) ?? DEFAULT_VALUES?.employmentStatus
    }
  }
}
