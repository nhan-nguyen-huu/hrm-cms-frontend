import type {
  TFilterPanelDraftEmployeeFormSchema,
  TFilterPanelEmployeeDocumentFormSchema,
  TFilterPanelEmployeeEventFormSchema,
  TFilterPanelEmployeeProfileFormSchema
} from '~/helpers/schema.helper'
import { DEFAULT_PAGING } from '~/hooks/use-pagination'
import type {
  EEmployeeProfileDetailTab,
  EEmployeeProfileTab,
  EEmployeeStatus,
  EOnboardingStep
} from '~/shared/enums/common.enum'
import { EFilterPanelFormKey } from '~/shared/enums/form.enum'

export const paramsHelper = {
  paginationToSearchParams: (searchParams: URLSearchParams) => {
    return {
      keyword: searchParams.get(EFilterPanelFormKey.Keyword) ?? '',
      page: searchParams.get('page') ?? DEFAULT_PAGING.PAGE.toString(),
      size: searchParams.get('size') ?? DEFAULT_PAGING.SIZE.toString()
    }
  },
  employeeToSearchParams: (
    searchParams: URLSearchParams,
    defaultValues?: TFilterPanelEmployeeProfileFormSchema,
    tab?: EEmployeeProfileTab
  ) => {
    return {
      ...paramsHelper.paginationToSearchParams(searchParams),
      employmentStatus:
        searchParams.get('employmentStatus') ?? (defaultValues?.employmentStatus as EEmployeeStatus) ?? '',
      tab: tab as string
    }
  },
  draftEmployeeToSearchParams: (
    searchParams: URLSearchParams,
    defaultValues?: TFilterPanelDraftEmployeeFormSchema,
    tab?: EEmployeeProfileTab
  ) => {
    return {
      ...paramsHelper.paginationToSearchParams(searchParams),
      currentStep: searchParams.get('currentStep') ?? (defaultValues?.currentStep as EOnboardingStep) ?? '',
      tab: tab as string
    }
  },
  employeeDocumentToSearchParams: (
    searchParams: URLSearchParams,
    defaultValues?: TFilterPanelEmployeeDocumentFormSchema,
    tab?: EEmployeeProfileDetailTab
  ) => {
    return {
      ...paramsHelper.paginationToSearchParams(searchParams),
      documentType: searchParams.get('documentType') ?? defaultValues?.documentType ?? '',
      documentStatus: searchParams.get('documentStatus') ?? defaultValues?.documentStatus ?? '',
      tab: tab as string
    }
  },
  employeeEventToSearchParams: (
    searchParams: URLSearchParams,
    defaultValues?: TFilterPanelEmployeeEventFormSchema,
    tab?: EEmployeeProfileDetailTab
  ) => {
    return {
      ...paramsHelper.paginationToSearchParams(searchParams),
      eventType: searchParams.get('eventType') ?? defaultValues?.eventType ?? '',
      actor: searchParams.get('actor') ?? defaultValues?.actor ?? '',
      tab: tab as string
    }
  }
}
