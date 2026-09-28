import { EGender, EMaritalStatus, ENationality } from '~/shared/enums/common.enum'
import { EAddProjectMemberFormKey, ELoginFormKey, ePersonalEmployeeFormKey } from '~/shared/enums/form.enum'

export const formHelper = {
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
  }
}
