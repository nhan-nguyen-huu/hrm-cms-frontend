import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import { formHelper } from '~/helpers/form.helper'
import {
  type TUploadEmployeeDocumentSchema,
  getUploadEmployeeDocumentSchema
} from '~/helpers/schemas/employee-schema.helper'
import useMutationApi from '~/hooks/use-mutation-api'
import UploadDocumentForm from '~/routes/dashboard/employee-mgt/employee-profile/components/documents/upload-document-form'
import { EmployeeService } from '~/services/employee.service'
import { FileService } from '~/services/file.service'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'
import { EUploadEmployeeDocumentFormKey } from '~/shared/enums/form.enum'

interface IUploadDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId?: number
  // File dropped on the page drop zone — pre-filled when the dialog opens
  initialFile?: File
}

// "Tải lên tài liệu" — document type + file + note: POST /file/upload, then POST /employee/{userId}/document with the fileUrl
const UploadDocumentDialog = ({ open, onOpenChange, userId, initialFile }: IUploadDocumentDialogProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const form = useForm<TUploadEmployeeDocumentSchema>({
    resolver: zodResolver(getUploadEmployeeDocumentSchema(t)),
    defaultValues: formHelper.getDefaultValuesUploadEmployeeDocument(),
    mode: 'all'
  })

  useEffect(() => {
    if (open && initialFile) {
      form.setValue(EUploadEmployeeDocumentFormKey.File, initialFile, { shouldValidate: true })
    }
  }, [open, initialFile])

  // Two calls: store the file, then attach the returned fileUrl to the employee
  const { mutate: uploadDocument, isPending } = useMutationApi({
    mutationFn: async ({ file, documentType, note }: TUploadEmployeeDocumentSchema) => {
      // Original name kept: the API shows the stored file name as the document name
      const uploaded = await FileService.UploadFile(file, true)
      // The upload API answers result=true with no data (and a raw server message) when writing the file fails
      if (!uploaded?.data?.fileUrl) {
        toast.error(t('msg.uploadFileFailed'))
        throw new Error(uploaded?.message)
      }
      return await EmployeeService.AddEmployeeDocument({ userId, fileUrl: uploaded.data.fileUrl, documentType, note })
    },
    onSuccess: () => {
      toast.success(t('msg.uploadDocumentSuccess'))
      // The upload also adds an EMPLOYEE_DOCUMENT_ADDED event to the change history
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEE.GET_DOCUMENTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEE.GET_EVENTS] })
      handleOpenChange(false)
    }
  })

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) form.reset(formHelper.getDefaultValuesUploadEmployeeDocument())
    onOpenChange(nextOpen)
  }

  const handleSubmit = (values: TUploadEmployeeDocumentSchema) => {
    if (!userId) return
    uploadDocument(values)
  }

  return (
    <DialogCustom
      open={open}
      onOpenChange={handleOpenChange}
      title={t('title.uploadDocument')}
      footerDescription={t('msg.documentUploadRule')}
      cancelText={t('action.cancel')}
      okText={t('action.upload')}
      isDisabledOkBtn={isPending}
      onOkAction={form.handleSubmit(handleSubmit)}
    >
      <UploadDocumentForm form={form} onSubmit={handleSubmit} />
    </DialogCustom>
  )
}

export default UploadDocumentDialog
