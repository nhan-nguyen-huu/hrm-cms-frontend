import type { TFilterPanelEmployeeProfileFormSchema } from '~/helpers/schema.helper'
import { DEFAULT_PAGING } from '~/hooks/use-pagination'
import type { EEmployeeStatus } from '~/shared/enums/common.enum'
import { EFilterPanelFormKey } from '~/shared/enums/form.enum'

export const paramsHelper = {
  paginationToSearchParams: (searchParams: URLSearchParams) => {
    return {
      keyword: searchParams.get(EFilterPanelFormKey.Keyword) ?? '',
      page: searchParams.get('page') ?? DEFAULT_PAGING.PAGE.toString(),
      size: searchParams.get('size') ?? DEFAULT_PAGING.SIZE.toString()
    }
  },
  employeeToSearchParams: (searchParams: URLSearchParams, defaultValues?: TFilterPanelEmployeeProfileFormSchema) => {
    return {
      ...paramsHelper.paginationToSearchParams(searchParams),
      employmentStatus:
        searchParams.get('employmentStatus') ?? (defaultValues?.employmentStatus as EEmployeeStatus) ?? ''
    }
  }
}
