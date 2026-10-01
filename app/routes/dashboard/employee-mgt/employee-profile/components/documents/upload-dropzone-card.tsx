import { useRef } from 'react'

import { Upload } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import { COMPACT_CARD_CLASS } from '~/components/customs/info-grid-card'
import { EMPLOYEE_DOCUMENT_ACCEPT } from '~/helpers/schemas/employee-schema.helper'

interface IUploadDropzoneCardProps {
  // A file was dropped / picked — the upload dialog opens with it
  onPick: (file: File) => void
}

// "Tải lên tài liệu mới" — drop zone under the document table
const UploadDropzoneCard = ({ onPick }: IUploadDropzoneCardProps) => {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const pick = (files?: FileList | null) => {
    const file = files?.[0]
    if (file) onPick(file)
    if (inputRef.current) inputRef.current.value = ''
  }
  return (
    <CardCustom title={t('title.uploadDocument')} classNameCard={COMPACT_CARD_CLASS}>
      <button
        type='button'
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault()
          pick(event.dataTransfer.files)
        }}
        className='flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-[#C7D2E0] px-4 py-6 text-center hover:border-primary'
      >
        <span className='flex size-9 items-center justify-center rounded-lg bg-[#EAF1FA] text-primary'>
          <Upload className='size-4' />
        </span>
        <span className='text-[13px] font-semibold text-app-secondary'>{t('msg.dropOrPickFile')}</span>
        <span className='text-[11.5px] text-[#93A2B6]'>
          {t('msg.documentFileRule')} · {t('msg.documentUploadRule').toLowerCase()}
        </span>
      </button>
      <input
        ref={inputRef}
        type='file'
        hidden
        accept={EMPLOYEE_DOCUMENT_ACCEPT.join(',')}
        onChange={(event) => pick(event.target.files)}
      />
    </CardCustom>
  )
}

export default UploadDropzoneCard
