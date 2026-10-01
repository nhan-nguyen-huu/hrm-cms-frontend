import type { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import FormField from '~/components/forms/form-field'
import FormSelectField from '~/components/forms/form-select-field'
import { Textarea } from '~/components/ui/textarea'
import UploadFile from '~/components/uploads/upload-file'
import {
  EMPLOYEE_DOCUMENT_ACCEPT,
  EMPLOYEE_DOCUMENT_MAX_SIZE,
  EMPLOYEE_DOCUMENT_NOTE_MAX_LENGTH,
  type TUploadEmployeeDocumentSchema
} from '~/helpers/schemas/employee-schema.helper'
import { DATA } from '~/shared/constants/data.constant'
import { EUploadEmployeeDocumentFormKey } from '~/shared/enums/form.enum'

interface IUploadDocumentFormProps {
  form: UseFormReturn<TUploadEmployeeDocumentSchema>
  onSubmit: (values: TUploadEmployeeDocumentSchema) => void
}

// Fields of the "Tải lên tài liệu" dialog: document type, file, note
const UploadDocumentForm = ({ form, onSubmit }: IUploadDocumentFormProps) => {
  const { t } = useTranslation()
  return (
    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
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
  )
}

export default UploadDocumentForm
