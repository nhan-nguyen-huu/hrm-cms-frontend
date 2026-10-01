import { useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { clsx } from 'cn'
import { FileText, Upload } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import DialogCustom from '~/components/customs/dialog-custom'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Textarea } from '~/components/ui/textarea'
import { formHelper } from '~/helpers/form.helper'
import { fortmatHelper } from '~/helpers/format.helper'
import {
  EMPLOYEE_DOCUMENT_ACCEPT,
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const form = useForm<TUploadEmployeeDocumentSchema>({
    resolver: zodResolver(getUploadEmployeeDocumentSchema(t)),
    defaultValues: formHelper.getDefaultValuesUploadEmployeeDocument(),
    mode: 'all'
  })
  const file = useWatch({ control: form.control, name: EUploadEmployeeDocumentFormKey.File })

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

  const handlePickFile = (fileList?: FileList | null) => {
    const picked = fileList?.[0]
    if (picked) form.setValue(EUploadEmployeeDocumentFormKey.File, picked, { shouldValidate: true })
    if (fileInputRef.current) fileInputRef.current.value = ''
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
          render={(_, fieldState) => (
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault()
                handlePickFile(event.dataTransfer.files)
              }}
              className={clsx(
                'flex w-full flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-6 text-center hover:border-primary',
                fieldState.invalid ? 'border-destructive' : 'border-[#C7D2E0]'
              )}
            >
              {file ? (
                <span className='flex items-center gap-2 text-[13px] font-semibold text-app-secondary'>
                  <FileText className='size-4 text-primary' />
                  {file.name}
                  <span className='font-normal text-[#93A2B6]'>· {fortmatHelper.formatFileSize(file.size)}</span>
                </span>
              ) : (
                <>
                  <span className='flex size-9 items-center justify-center rounded-lg bg-[#EAF1FA] text-primary'>
                    <Upload className='size-4' />
                  </span>
                  <span className='text-[13px] font-semibold text-app-secondary'>{t('msg.dropOrPickFile')}</span>
                </>
              )}
              <span className='text-[11.5px] text-[#93A2B6]'>{t('msg.documentFileRule')}</span>
            </button>
          )}
        />
        <input
          ref={fileInputRef}
          type='file'
          hidden
          accept={EMPLOYEE_DOCUMENT_ACCEPT.join(',')}
          onChange={(event) => handlePickFile(event.target.files)}
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
