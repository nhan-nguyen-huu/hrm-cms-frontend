import { useRef, useState } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { UploadIcon } from '~/assets/svgs'
import CropImage from '~/components/common/crop-image'
import ImageCustom from '~/components/customs/image-custom'
import type { TAspect } from '~/shared/types/common.type'

interface IUploadImageloadProps {
  value?: File
  onChange?: (file: File) => void
  isView?: boolean
  classNameWrapper?: string
  isInValid?: boolean
  title?: string
  description?: string
  isCrop?: boolean
  aspectType?: TAspect
  aspectClassName?: string
  maxFileSizeBytes?: number
  maxFileSizeExceeded?: string
  accept?: string
}

const UploadImage = ({
  value,
  onChange,
  isView = false,
  isInValid = false,
  title,
  description,
  isCrop,
  aspectType,
  aspectClassName = 'aspect-square',
  classNameWrapper,
  maxFileSizeBytes,
  maxFileSizeExceeded,
  accept
}: IUploadImageloadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSrc, setImageSrc] = useState('')
  const [openCrop, setOpenCrop] = useState(false)
  const { t } = useTranslation()
  const handleSelectedFile = (selectedFile: File) => {
    if (maxFileSizeBytes && selectedFile.size > maxFileSizeBytes) {
      toast.error(maxFileSizeExceeded)
      return
    }
    if (isCrop) {
      const imageUrl = URL.createObjectURL(selectedFile)
      setImageSrc(imageUrl)
      setOpenCrop(true)
      return
    }
    onChange?.(selectedFile)
  }

  return (
    <section className={clsx('flex flex-col items-center justify-start gap-4', classNameWrapper)}>
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        className='hidden'
        onChange={(e) => {
          const selectedFile = e.target.files?.[0]
          if (!selectedFile) return
          handleSelectedFile(selectedFile)
          e.target.value = ''
        }}
      />
      <section
        className={clsx(
          'w-full overflow-hidden rounded-[8px] border-2 border-dashed',
          isInValid && 'border-destructive',
          isView && 'pointer-events-none'
        )}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          const selectedFile = e.dataTransfer.files?.[0]
          if (!selectedFile) return
          handleSelectedFile(selectedFile)
        }}
        onClick={() => {
          if (!isView) {
            fileInputRef.current?.click()
          }
        }}
      >
        <article className={clsx('group relative w-full cursor-pointer overflow-hidden bg-[#FAFCFE]', aspectClassName)}>
          {!value ? (
            <section className='absolute inset-0 flex flex-col items-center justify-center gap-1'>
              <section className='flex items-center justify-center rounded-full bg-[#EAF1FA] size-8.5'>
                <UploadIcon className='size-4.25 text-primary' />
              </section>
              <p className='text-sm font-medium text-app-primay'>{title ?? t('action.uploadPhoto')}</p>
              <p className='text-xs text-[#93A2B6]'>{description}</p>
            </section>
          ) : (
            <>
              <ImageCustom
                src={URL.createObjectURL(value)}
                alt={value.name}
                className={clsx('h-full w-full object-cover aspect-square', aspectClassName)}
              />
              {!isView && (
                <section className='absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                  <section className='flex items-center justify-center rounded-full bg-[#EAF1FA] size-8.5'>
                    <UploadIcon className='size-4.25 text-primary' />
                  </section>
                  <p className='text-sm font-medium text-white'>{t('action.updateImage')}</p>
                </section>
              )}
            </>
          )}
        </article>
      </section>

      {/* Crop image */}
      {isCrop && aspectType && (
        <CropImage
          openCrop={openCrop}
          onOpenCropChange={setOpenCrop}
          imageSrc={imageSrc}
          onChange={onChange}
          aspectType={aspectType}
        />
      )}
    </section>
  )
}

export default UploadImage
