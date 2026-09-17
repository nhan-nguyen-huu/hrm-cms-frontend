import { useEffect, useMemo, useRef, useState } from 'react'

import { createPortal } from 'react-dom'

import { X } from 'lucide-react'
import PreviewImageToolbar from '~/components/customs/image-custom/components/preview-image-toolbar'
import usePreviewImage from '~/hooks/use-preview-image'

interface Props {
  open: boolean
  src: string
  onClose: () => void
}

const PreviewImageModal = ({ open, src, onClose }: Props) => {
  const { preview, reset, zoom, rotate, toggleFlipX, toggleFlipY, move, canZoomIn, canZoomOut, scaleStep } =
    usePreviewImage()

  const draggingRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const startRef = useRef({
    mouseX: 0,
    mouseY: 0,
    imageX: 0,
    imageY: 0
  })

  const imageStyle = useMemo(
    () => ({
      transform: `
            translate(${preview.x}px, ${preview.y}px)
            rotate(${preview.rotation}deg)
            scale(${preview.scale})
            scaleX(${preview.flipX ? -1 : 1})
            scaleY(${preview.flipY ? -1 : 1})
        `,
      transition: isDragging ? 'none' : 'transform .2s ease',
      cursor: preview.scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
    }),
    [preview, isDragging]
  )

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (preview.scale <= 1) return
    e.preventDefault()
    e.stopPropagation()
    draggingRef.current = true
    setIsDragging(true)
    startRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      imageX: preview.x,
      imageY: preview.y
    }
  }

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open)
    if (!open) {
      reset()
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [open, reset])

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const dx = e.clientX - startRef.current.mouseX
      const dy = e.clientY - startRef.current.mouseY
      move(startRef.current.imageX + dx, startRef.current.imageY + dy)
    }
    const stopDrag = () => {
      draggingRef.current = false
      setIsDragging(false)
    }
    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', stopDrag)
    window.addEventListener('pointercancel', stopDrag)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', stopDrag)
      window.removeEventListener('pointercancel', stopDrag)
    }
  }, [move])

  if (!open) return null

  return createPortal(
    <section className='fixed inset-0 z-50 bg-black/50' onClick={onClose}>
      <button
        type='button'
        onClick={onClose}
        className='absolute right-5 top-5 z-20 rounded-full p-2 text-white hover:bg-white/10'
      >
        <X size={24} />
      </button>

      <section
        className='flex h-full items-center justify-center overflow-hidden'
        onWheel={(e) => zoom(e.deltaY < 0 ? scaleStep : -scaleStep)}
      >
        <img
          src={src}
          alt='preview'
          onClick={(e) => e.stopPropagation()}
          className='max-h-[70vh] max-w-[70vw] select-none object-cover'
          style={imageStyle}
          onPointerDown={handlePointerDown}
        />
      </section>

      <PreviewImageToolbar
        scale={preview.scale}
        canZoomIn={canZoomIn}
        canZoomOut={canZoomOut}
        onZoomIn={() => zoom(scaleStep)}
        onZoomOut={() => zoom(-scaleStep)}
        onRotateLeft={() => rotate(-90)}
        onRotateRight={() => rotate(90)}
        onFlipX={toggleFlipX}
        onFlipY={toggleFlipY}
        onReset={reset}
      />
    </section>,
    document.body
  )
}

export default PreviewImageModal
