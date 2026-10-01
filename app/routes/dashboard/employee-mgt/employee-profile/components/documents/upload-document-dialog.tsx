import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Textarea } from '~/components/ui/textarea'
import UploadFile from '~/components/uploads/upload-file'
import { formHelper } from '~/helpers/form.helper'
import {
  EMPLOYEE_DOCUMENT_ACCEPT,
  EMPLOYEE_DOCUMENT_MAX_SIZE,
  EMPLOYEE_DOCUMENT_NOTE_MAX_LENGTH,
  type TUploadEmployeeDocumentSchema,
  getUploadEmployeeDocumentSchema
} from '~/helpers/schemas/employee-schema.helper'
import useMutationApi from '~/hooks/use-mutation-api'
import { EmployeeService } from '~/services/employee.service'
import { DATA } from '~/shared/constants/data.constant'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'
import { EUploadEmployeeDocumentFormKey } from '~/shared/enums/form.enum'

interface IUploadDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId?: number
  // File dropped on the page drop zone — pre-filled when the dialog opens
  initialFile?: File
}

// "Tải lên tài liệu" — document type + file + note, sent as multipart to POST /employee/{userId}/document
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

  const { mutate: uploadDocument, isPending } = useMutationApi({
    mutationFn: EmployeeService.AddEmployeeDocument,
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
    uploadDocument({ userId, ...values })
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
      <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name={EUploadEmployeeDocumentFormKey.DocumentType}
          label={t('inputLabel.documentType')}
          isRequired
          render={(field, fieldState) => (
            <FormSelectField
              field={field}
              fieldState={fieldState}
              options={DATA.GET_OPTIONS_EMPLOYEE_DOCUMENT_TYPE_UPLOAD(t)}
              placeHolder={t('inputPlaceholder.selectDocumentType')}
            />
          )}
        />
        <FormField
          control={form.control}
          name={EUploadEmployeeDocumentFormKey.File}
          label={t('inputLabel.documentFile')}
          isRequired
          render={(field, fieldState) => (
            // The API takes one file per request
            <UploadFile
              value={field.value ? [field.value] : []}
              // null (not undefined) so react-hook-form clears the value when the file is removed
              onChange={(files) => field.onChange(files[0] ?? null)}
              isMultiple={false}
              isInValid={fieldState.invalid}
              title={t('msg.dropOrPickFile')}
              description={t('msg.documentFileRule')}
              accept={EMPLOYEE_DOCUMENT_ACCEPT.join(',')}
              maxFileSizeBytes={EMPLOYEE_DOCUMENT_MAX_SIZE}
              maxFileSizeExceeded={t('inputValidate.documentTooLarge')}
              classNameWrapper='w-full'
            />
          )}
        />
        <FormField
          control={form.control}
          name={EUploadEmployeeDocumentFormKey.Note}
          label={t('inputLabel.note')}
          render={(field, fieldState) => (
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              maxLength={EMPLOYEE_DOCUMENT_NOTE_MAX_LENGTH}
              placeholder={t('inputPlaceholder.enterDocumentNote')}
            />
          )}
        />
      </form>
    </DialogCustom>
  )
}

export default UploadDocumentDialog
