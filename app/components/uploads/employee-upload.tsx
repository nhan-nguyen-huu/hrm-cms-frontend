import { useRef, useState } from 'react'

import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { UploadIcon } from '~/assets/svgs'
import CropImage from '~/components/common/crop-image'
import ImageCustom from '~/components/customs/image-custom'
import { EAspectType } from '~/shared/enums/common.enum'

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024

interface IEmployeeUploadloadProps {
  file?: File
  onChange?: (file: File) => void
  isView?: boolean
  classNameWrapper?: string
  isInValid?: boolean
}

const EmployeeUpload = ({
  file,
  onChange,
  isView = false,
  isInValid = false,
  classNameWrapper
}: IEmployeeUploadloadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [imageSrc, setImageSrc] = useState('')
  const [openCrop, setOpenCrop] = useState(false)
  const { t } = useTranslation()

  const handleSelectedFile = (selectedFile: File) => {
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      toast.error(t('msg.maxFileSizeExceeded'))
      return
    }
    const imageUrl = URL.createObjectURL(selectedFile)
    setImageSrc(imageUrl)
    setOpenCrop(true)
  }

  return (
    <section className={clsx('flex flex-col items-center justify-start gap-4', classNameWrapper)}>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/png, image/jpeg'
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
          const droppedFile = e.dataTransfer.files?.[0]
          if (!droppedFile) return
          handleSelectedFile(droppedFile)
        }}
        onClick={() => {
          if (!isView) {
            fileInputRef.current?.click()
          }
        }}
      >
        <article className='group relative w-full aspect-square cursor-pointer overflow-hidden bg-[#FAFCFE]'>
          {!file ? (
            <section className='absolute inset-0 flex flex-col items-center justify-center gap-1'>
              <section className='flex items-center justify-center rounded-full bg-[#EAF1FA] size-8.5'>
                <UploadIcon className='size-4.25 text-primary' />
              </section>
              <p className='text-sm font-medium text-app-primay'>{t('action.uploadPhoto')}</p>
              <p className='text-xs text-[#93A2B6]'>{t('msg.uploadPhotoHint')}</p>
            </section>
          ) : (
            <>
              <ImageCustom
                src={URL.createObjectURL(file)}
                alt={file.name}
                className='h-full w-full object-cover aspect-square'
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

      <CropImage
        openCrop={openCrop}
        onOpenCropChange={setOpenCrop}
        imageSrc={imageSrc}
        onChange={onChange}
        aspectType={EAspectType.Employee}
      />
    </section>
  )
}

export default EmployeeUpload
