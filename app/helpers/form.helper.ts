import type {
  TFilterPanelEmployeeDocumentFormSchema,
  TFilterPanelEmployeeEventFormSchema,
  TFilterPanelEmployeeProfileFormSchema,
  TFilterPanelFormSchema,
  TFilterPanelProjectFormSchema
} from '~/helpers/schema.helper'
import {
  EEmployeeDocumentStatus,
  EEmployeeDocumentType,
  EEmployeeStatus,
  EGender,
  EMaritalStatus,
  ENationality,
  EOrgEventType,
  EProjectStatus
} from '~/shared/enums/common.enum'
import {
  EAddProjectMemberFormKey,
  EFilterPanelEmployeeDocumentFormKey,
  EFilterPanelEmployeeEventFormKey,
  EFilterPanelEmployeeProfileFormKey,
  EFilterPanelFormKey,
  EFilterPanelProjectFormKey,
  ELoginFormKey,
  EUploadEmployeeDocumentFormKey,
  ePersonalEmployeeFormKey
} from '~/shared/enums/form.enum'

export const formHelper = {
  getDefaultValuesFilterPanel: (searchParams: URLSearchParams, DEFAULT_VALUES: TFilterPanelFormSchema) => {
    return {
      [EFilterPanelFormKey.Keyword]: searchParams.get('keyword') ?? DEFAULT_VALUES?.keyword
    }
  },
  getDefaultValuesProject: (searchParams: URLSearchParams, DEFAULT_VALUES: TFilterPanelProjectFormSchema) => {
    return {
      ...formHelper.getDefaultValuesFilterPanel(searchParams, DEFAULT_VALUES),
      [EFilterPanelProjectFormKey.Department]:
        searchParams.get(EFilterPanelProjectFormKey.Department) ?? DEFAULT_VALUES?.departmentId,
      [EFilterPanelProjectFormKey.Status]:
        (searchParams.get(EFilterPanelProjectFormKey.Status) as EProjectStatus) ?? DEFAULT_VALUES?.status
    }
  },
  getDefaultValuesAddProjectMember: () => {
    return {
      [EAddProjectMemberFormKey.Employee]: '',
      [EAddProjectMemberFormKey.Role]: '',
      [EAddProjectMemberFormKey.Allocation]: '',
      [EAddProjectMemberFormKey.JoinedDate]: undefined,
      [EAddProjectMemberFormKey.ConfirmOverAllocation]: false,
      [EAddProjectMemberFormKey.OtherAllocation]: 0
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
  },
  getDefaultValuesEmployeeDocument: (
    searchParams: URLSearchParams,
    DEFAULT_VALUES: TFilterPanelEmployeeDocumentFormSchema
  ) => {
    return {
      ...formHelper.getDefaultValuesFilterPanel(searchParams, DEFAULT_VALUES),
      [EFilterPanelEmployeeDocumentFormKey.DocumentType]:
        (searchParams.get(EFilterPanelEmployeeDocumentFormKey.DocumentType) as EEmployeeDocumentType) ??
        DEFAULT_VALUES?.documentType,
      [EFilterPanelEmployeeDocumentFormKey.Status]:
        (searchParams.get(EFilterPanelEmployeeDocumentFormKey.Status) as EEmployeeDocumentStatus) ??
        DEFAULT_VALUES?.documentStatus
    }
  },
  getDefaultValuesEmployeeEvent: (
    searchParams: URLSearchParams,
    DEFAULT_VALUES: TFilterPanelEmployeeEventFormSchema
  ) => {
    return {
      ...formHelper.getDefaultValuesFilterPanel(searchParams, DEFAULT_VALUES),
      [EFilterPanelEmployeeEventFormKey.EventType]:
        (searchParams.get(EFilterPanelEmployeeEventFormKey.EventType) as EOrgEventType) ?? DEFAULT_VALUES?.eventType,
      [EFilterPanelEmployeeEventFormKey.Actor]:
        searchParams.get(EFilterPanelEmployeeEventFormKey.Actor) ?? DEFAULT_VALUES?.actor
    }
  },
  getDefaultValuesUploadEmployeeDocument: () => {
    return {
      [EUploadEmployeeDocumentFormKey.DocumentType]: undefined,
      [EUploadEmployeeDocumentFormKey.File]: undefined,
      [EUploadEmployeeDocumentFormKey.Note]: ''
    }
  }
}
