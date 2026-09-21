import { useState } from 'react'

import clsx from 'clsx'
import Cropper, { type Area } from 'react-easy-crop'
import { useTranslation } from 'react-i18next'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Slider } from '~/components/ui/slider'
import { getCroppedImg } from '~/lib/utils'
import { EAspectType } from '~/shared/enums/common.enum'

interface ICropImageProps {
  title?: string
  openCrop: boolean
  onOpenCropChange: (isOpen: boolean) => void
  onChange?: (file: File) => void
  imageSrc?: string
  aspectType: EAspectType
}
const CropImage = ({ title, openCrop, onOpenCropChange, imageSrc = '', aspectType, onChange }: ICropImageProps) => {
  const { t } = useTranslation()

  const variableMapping: Record<EAspectType, { class: string; value: number }> = {
    [EAspectType.Employee]: {
      class: 'aspect-4/3',
      value: 1
    }
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [rotation, setRotation] = useState(0)

  const handleCropSave = async () => {
    if (!croppedAreaPixels) return
    const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)
    if (croppedFile) {
      onChange?.(croppedFile)
    }
    handleOpenChange(false)
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleResetCrop = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleResetCrop()
    }
    onOpenCropChange(isOpen)
  }

  return (
    <Dialog open={openCrop} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-200 max-h-[90vh] gap-4 overflow-y-auto duration-0 data-[state=open]:animate-none data-[state=closed]:animate-none'>
        <DialogHeader>
          <DialogTitle className='font-semibold'>{title ?? t('title.editImage')}</DialogTitle>
        </DialogHeader>

        <section className={clsx('relative w-full overflow-hidden rounded-[8px]', variableMapping[aspectType]?.class)}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={variableMapping[aspectType]?.value}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            rotation={rotation}
            onRotationChange={setRotation}
            minZoom={1}
            maxZoom={5}
          />
        </section>

        <section className='flex flex-col gap-4'>
          <section className='flex flex-col gap-2'>
            <article className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{t('title.rotate')}</span>
              <span className='text-sm text-muted-foreground'>{rotation}°</span>
            </article>
            <Slider
              min={0}
              max={360}
              step={1}
              value={[rotation]}
              onValueChange={(value) => setRotation(Array.isArray(value) ? value[0] : value)}
            />
          </section>
          <section className='flex flex-col gap-2'>
            <article className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{t('title.zoom')}</span>
              <span className='text-sm text-muted-foreground'>{zoom.toFixed(1)}x</span>
            </article>
            <Slider
              min={1}
              max={5}
              step={0.1}
              value={[zoom]}
              onValueChange={(value) => setZoom(Array.isArray(value) ? value[0] : value)}
            />
          </section>
        </section>

        {/* Footer */}
        <DialogFooter className='flex items-center gap-3 flex-row flex-wrap bg-white'>
          <DialogClose render={<Button type='button' variant='outline' className='w-25' />}>
            {t('action.cancel')}
          </DialogClose>
          <Button type='button' className='w-25 bg-gray-700 hover:bg-gray-800' onClick={handleResetCrop}>
            {t('action.reset')}
          </Button>
          <Button type='button' className='w-25' onClick={handleCropSave}>
            {t('action.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CropImage
