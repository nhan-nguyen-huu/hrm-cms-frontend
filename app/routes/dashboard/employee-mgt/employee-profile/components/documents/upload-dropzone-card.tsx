import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { COMPACT_CARD_CLASS } from '~/components/customs/info-grid-card'
import UploadFile from '~/components/uploads/upload-file'
import { EMPLOYEE_DOCUMENT_ACCEPT, EMPLOYEE_DOCUMENT_MAX_SIZE } from '~/helpers/schemas/employee-schema.helper'

interface IUploadDropzoneCardProps {
  // A file was dropped / picked — the upload dialog opens with it
  onPick: (file: File) => void
}

// "Tải lên tài liệu mới" — drop zone under the document table (team UploadFile component)
const UploadDropzoneCard = ({ onPick }: IUploadDropzoneCardProps) => {
  const { t } = useTranslation()
  return (
    <CardCustom title={t('title.uploadDocument')} classNameCard={COMPACT_CARD_CLASS}>
      {/* Stays empty: the picked file is handed to the upload dialog */}
      <UploadFile
        value={[]}
        onChange={(files) => files[0] && onPick(files[0])}
        isMultiple={false}
        title={t('msg.dropOrPickFile')}
        description={`${t('msg.documentFileRule')} · ${t('msg.documentUploadRule').toLowerCase()}`}
        accept={EMPLOYEE_DOCUMENT_ACCEPT.join(',')}
        maxFileSizeBytes={EMPLOYEE_DOCUMENT_MAX_SIZE}
        maxFileSizeExceeded={t('inputValidate.documentTooLarge')}
        classNameWrapper='w-full'
      />
    </CardCustom>
  )
}

export default UploadDropzoneCard
