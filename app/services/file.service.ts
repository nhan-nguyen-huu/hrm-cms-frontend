import axiosClient from '~/configs/axios.config'
import { API_FILE } from '~/shared/constants/api.constant'
import type { IApiResponse } from '~/shared/models/common.model'
import type { IFileAsset } from '~/shared/models/employee.model'

export const FileService = {
  // POST /file/upload — UploadFileForm (multipart). Returns { filePath, fileUrl } to send to the endpoint that keeps it
  UploadFile: async (file: File, keepOriginalFilename = false): Promise<IApiResponse<IFileAsset>> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('keepOriginalFilename', String(keepOriginalFilename))
    return await axiosClient.post(API_FILE.UPLOAD_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}
