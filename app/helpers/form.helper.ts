import type {
  TFilterPanelDraftEmployeeFormSchema,
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
  EOnboardingStep,
  EOrgEventType,
  EProjectStatus
} from '~/shared/enums/common.enum'
import {
  EAccountEmployeeFormKey,
  EAddProjectMemberFormKey,
  EContractEmployeeFormKey,
  EFilterPanelDraftEmployeeProfileFormKey,
  EFilterPanelEmployeeDocumentFormKey,
  EFilterPanelEmployeeEventFormKey,
  EFilterPanelEmployeeProfileFormKey,
  EFilterPanelFormKey,
  EFilterPanelProjectFormKey,
  EJobEmployeeFormKey,
  ELoginFormKey,
  EPersonalEmployeeFormKey,
  EUploadEmployeeDocumentFormKey
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
  getDefaultValuesPersonalEmployee: () => {
    return {
      [EPersonalEmployeeFormKey.FullName]: '',
      [EPersonalEmployeeFormKey.DateOfBirth]: undefined,
      [EPersonalEmployeeFormKey.Gender]: EGender.Male,
      [EPersonalEmployeeFormKey.IdCardNumber]: '',
      [EPersonalEmployeeFormKey.IdCardIssuedDate]: undefined,
      [EPersonalEmployeeFormKey.IdCardIssuedPlace]: '',

      [EPersonalEmployeeFormKey.Phone]: '',
      [EPersonalEmployeeFormKey.PersonalEmail]: '',
      [EPersonalEmployeeFormKey.PermanentAddress]: '',
      [EPersonalEmployeeFormKey.CurrentAddress]: '',
      [EPersonalEmployeeFormKey.EmergencyContact]: '',

      [EPersonalEmployeeFormKey.MaritalStatus]: EMaritalStatus.Single,
      [EPersonalEmployeeFormKey.Nationality]: ENationality.Vi,
      [EPersonalEmployeeFormKey.DependentCount]: '0',

      [EPersonalEmployeeFormKey.Avatar]: undefined
    }
  },
  getDefaultValuesJobEmployee: () => {
    return {
      [EJobEmployeeFormKey.DepartmentId]: '',
      [EJobEmployeeFormKey.ProjectId]: '',
      [EJobEmployeeFormKey.JobTitleId]: '',
      [EJobEmployeeFormKey.JobGradeId]: '',
      [EJobEmployeeFormKey.LineManagerId]: '',
      [EJobEmployeeFormKey.StartDate]: undefined,
      [EJobEmployeeFormKey.EmploymentType]: undefined,
      [EJobEmployeeFormKey.OfficeId]: '',
      [EJobEmployeeFormKey.WorkShift]: undefined,
      [EJobEmployeeFormKey.AnnualLeaveDays]: '12'
    }
  },
  getDefaultValuesContractEmployee: () => ({
    [EContractEmployeeFormKey.ContractType]: undefined,
    [EContractEmployeeFormKey.ContractNumber]: '',
    [EContractEmployeeFormKey.SignedDate]: undefined,
    [EContractEmployeeFormKey.EffectiveDate]: undefined,
    [EContractEmployeeFormKey.ExpiryDate]: undefined,
    [EContractEmployeeFormKey.ProbationSalaryRate]: '',
    [EContractEmployeeFormKey.BaseSalary]: '',
    [EContractEmployeeFormKey.ProbationSalary]: '',
    [EContractEmployeeFormKey.InsuranceSalary]: '',
    [EContractEmployeeFormKey.Allowances]: [],
    [EContractEmployeeFormKey.TaxCode]: '',
    [EContractEmployeeFormKey.SocialInsuranceNumber]: '',
    [EContractEmployeeFormKey.BankName]: '',
    [EContractEmployeeFormKey.BankAccountNumber]: ''
  }),
  getDefaultValuesAccountEmployee: () => ({
    [EAccountEmployeeFormKey.Email]: '',
    [EAccountEmployeeFormKey.SendInviteEmail]: true,
    [EAccountEmployeeFormKey.RequirePasswordChange]: true
  }),
  getDefaultValuesEmployee: (searchParams: URLSearchParams, DEFAULT_VALUES: TFilterPanelEmployeeProfileFormSchema) => {
    return {
      ...formHelper.getDefaultValuesFilterPanel(searchParams, DEFAULT_VALUES),
      [EFilterPanelEmployeeProfileFormKey.EmploymentStatus]:
        (searchParams.get('employmentStatus') as EEmployeeStatus) ?? DEFAULT_VALUES?.employmentStatus
    }
  },
  getDefaultValuesDraftEmployee: (
    searchParams: URLSearchParams,
    DEFAULT_VALUES: TFilterPanelDraftEmployeeFormSchema
  ) => {
    return {
      ...formHelper.getDefaultValuesFilterPanel(searchParams, DEFAULT_VALUES),
      [EFilterPanelDraftEmployeeProfileFormKey.CurrentStep]:
        (searchParams.get('currentStep') as EOnboardingStep) ?? DEFAULT_VALUES?.currentStep
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
