import { createDetailApiHook, createListApiHook } from '~/hooks/use-query-api'
import { ProjectService } from '~/services/project.service'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'

export const useGetListProjectApi = createListApiHook(QUERY_KEY.PROJECT.GET_LIST, ProjectService.GetListProject)
export const useGetDetailProjectApi = createDetailApiHook(QUERY_KEY.PROJECT.GET_DETAIL, ProjectService.GetDetailProject)
// Keyed by the project id; params = the person and the share being considered
export const useGetAllocationPreviewApi = createDetailApiHook(
  QUERY_KEY.PROJECT.GET_ALLOCATION_PREVIEW,
  ProjectService.GetAllocationPreview
)
