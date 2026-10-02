import axiosClient from '~/configs/axios.config'
import { API_PROJECT } from '~/shared/constants/api.constant'
import type { IApiPagination, IApiResponse } from '~/shared/models/common.model'
import type {
  IAllocationPreviewParams,
  IAllocationWarning,
  IProject,
  IProjectDetail,
  IProjectMemberPayload,
  IProjectParams
} from '~/shared/models/project.model'

export const ProjectService = {
  GetListProject: async (params?: IProjectParams): Promise<IApiResponse<IApiPagination<IProject>>> => {
    return await axiosClient.get(API_PROJECT.GET_LIST_URL, { params })
  },
  // The project with every member (not paginated) and the total allocation
  GetDetailProject: async (id?: number): Promise<IApiResponse<IProjectDetail>> => {
    return await axiosClient.get(API_PROJECT.GET_DETAIL_URL(id))
  },
  // Writes nothing: the person's total allocation if they took this share, with their other projects
  GetAllocationPreview: async (
    id?: number,
    params?: IAllocationPreviewParams
  ): Promise<IApiResponse<IAllocationWarning>> => {
    return await axiosClient.get(API_PROJECT.ALLOCATION_PREVIEW_URL(id), { params })
  },
  AddProjectMember: async ({
    projectId,
    ...payload
  }: IProjectMemberPayload & { projectId?: number }): Promise<IApiResponse<IProjectDetail>> => {
    return await axiosClient.post(API_PROJECT.MEMBER_URL(projectId), payload)
  }
}
