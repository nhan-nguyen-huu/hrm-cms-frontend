import { useState } from 'react'

import clsx from 'clsx'
import { FallbackImage } from '~/assets/images'
import PreviewImageModal from '~/components/customs/image-custom/components/preview-image-modal'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
  previewImage?: boolean
}
const ImageCustom = ({
  src,
  className,
  fallbackSrc = FallbackImage,
  previewImage = false,
  onClick,
  ...props
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  const imageSrc = src || fallbackSrc

  return (
    <>
      <section className='relative overflow-hidden'>
        {!loaded && !error && (
          <section className={clsx('absolute inset-0 animate-pulse rounded bg-gray-200', className)} />
        )}

        <img
          {...props}
          src={imageSrc}
          alt='Img'
          className={clsx(
            className,
            'object-cover transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
            previewImage && 'cursor-pointer'
          )}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = fallbackSrc
            setError(true)
            setLoaded(true)
          }}
          onClick={(e) => {
            onClick?.(e)
            if (previewImage) {
              setOpen(true)
            }
          }}
        />
      </section>

      <PreviewImageModal open={open} src={imageSrc} onClose={() => setOpen(false)} />
    </>
  )
}

export default ImageCustom
