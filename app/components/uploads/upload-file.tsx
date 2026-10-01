import { useRef } from 'react'

import clsx from 'clsx'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { AttachmentsIcon, ExcelIcon, PdfIcon, UploadIcon } from '~/assets/svgs'
import ImageCustom from '~/components/customs/image-custom'
import { Button } from '~/components/ui/button'

interface IUploadImageloadProps {
  value: File[]
  onChange: (files: File[]) => void
  isView?: boolean
  classNameWrapper?: string
  isInValid?: boolean
  title?: string
  description?: string
  maxFileSizeBytes?: number
  maxFileSizeExceeded?: string
  accept?: string
  isMultiple?: boolean
}

const UploadFile = ({
  value,
  onChange,
  isView = false,
  isInValid = false,
  title,
  description,
  classNameWrapper,
  maxFileSizeBytes,
  maxFileSizeExceeded,
  accept,
  isMultiple
}: IUploadImageloadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { t } = useTranslation()

  const handleUploadFile = (newFiles: File[]) => {
    const existing = new Set(value.map((file) => `${file.name}-${file.size}-${file.lastModified}`))
    const uniqueFiles = newFiles.filter((file) => !existing.has(`${file.name}-${file.size}-${file.lastModified}`))
    onChange([...value, ...uniqueFiles])
  }

  const handleSelectedFile = (fileList: File[]) => {
    const validFiles = fileList.filter((file) => {
      if (maxFileSizeBytes && file.size > maxFileSizeBytes) {
        toast.error(maxFileSizeExceeded)
        return false
      }
      return true
    })
    if (validFiles.length > 0) {
      handleUploadFile(validFiles)
    }
  }

  const handleRemoveFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const convertIconByAttachmentsType = (file: File) => {
    switch (file.type) {
      case 'application/pdf':
        return <PdfIcon className='size-6' />
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel':
        return <ExcelIcon className='size-6' />
      case 'image/jpeg':
      case 'image/png':
      case 'image/svg+xml':
        return (
          <section className='shrink-0'>
            <ImageCustom
              src={URL.createObjectURL(file)}
              alt={file.name}
              className='size-8 rounded-[8px] object-cover border border-input shrink-0'
              previewImage
            />
          </section>
        )
      default:
        return <AttachmentsIcon className='size-5 text-primary' />
    }
  }
  return (
    <section className={clsx('flex flex-col items-start justify-start gap-4', classNameWrapper)}>
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        multiple={isMultiple}
        className='hidden'
        onChange={(e) => {
          const files = e.target.files
          if (!files) return
          const fileList = Array.from(files)
          handleSelectedFile(fileList)
          e.target.value = ''
        }}
      />
      <section
        className={clsx(
          'w-full overflow-hidden rounded-[8px] border-2 border-dashed',
          isInValid && 'border-destructive',
          (isView || (!isMultiple && value?.length === 1)) && 'pointer-events-none opacity-60'
        )}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          if (!e.dataTransfer.files.length) return
          handleSelectedFile(Array.from(e.dataTransfer.files))
        }}
        onClick={() => {
          if (!isView) {
            fileInputRef.current?.click()
          }
        }}
      >
        <article className={clsx('group relative w-full cursor-pointer overflow-hidden bg-[#FAFCFE]')}>
          <section className='flex items-center justify-between gap-2 p-4'>
            <section className='flex items-center gap-3'>
              <section className='flex items-center justify-center rounded-full bg-[#EAF1FA] size-8.5'>
                <UploadIcon className='size-8.5 text-primary' />
              </section>
              <section className='flex flex-col gap-1'>
                <p className='text-sm font-medium text-app-primay'>{title}</p>
                <p className='text-[11px] text-[#93A2B6]'>{description}</p>
              </section>
            </section>
            <Button variant={'outline'}>{t('action.selectFile')}</Button>
          </section>
        </article>
      </section>

      {/* Review */}
      {!!value?.length && (
        <article className='flex items-center flex-wrap gap-2'>
          {value.map((file, index) => (
            <section
              className='flex items-center justify-between rounded-[8px] p-2 gap-2 border border-primary min-h-12.5'
              key={`${file?.name}-${file?.size}-${file?.lastModified}`}
            >
              <section className='flex items-center gap-2'>
                {convertIconByAttachmentsType(file)}
                <article>
                  <p className='font-semibold break-all'>{file?.name}</p>
                </article>
              </section>
              <button
                type='button'
                className='bg-destructive text-white rounded-full p-0.75'
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile(index)
                }}
              >
                <X className='size-3' />
              </button>
            </section>
          ))}
        </article>
      )}
    </section>
  )
}

export default UploadFile
