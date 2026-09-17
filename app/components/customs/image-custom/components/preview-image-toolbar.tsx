import { FlipHorizontal, FlipVertical, RefreshCcw, RotateCcw, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import PreviewImageAction from '~/components/customs/image-custom/components/preview-image-action'
import { Separator } from '~/components/ui/separator'

interface Props {
  scale: number
  canZoomIn: boolean
  canZoomOut: boolean
  onZoomIn: () => void
  onZoomOut: () => void
  onRotateLeft: () => void
  onRotateRight: () => void
  onFlipX: () => void
  onFlipY: () => void
  onReset: () => void
}

export default function PreviewToolbar({
  scale,
  canZoomIn,
  canZoomOut,
  onZoomIn,
  onZoomOut,
  onRotateLeft,
  onRotateRight,
  onFlipX,
  onFlipY,
  onReset
}: Props) {
  return (
    <section
      className='absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/70 px-3 py-2 backdrop-blur'
      onClick={(e) => e.stopPropagation()}
    >
      <PreviewImageAction disabled={!canZoomOut} onClick={onZoomOut} className='hidden sm:block'>
        <ZoomOut size={18} />
      </PreviewImageAction>

      <span className='w-14 text-center text-sm text-white hidden sm:block'>{Math.round(scale * 100)}%</span>

      <PreviewImageAction disabled={!canZoomIn} onClick={onZoomIn} className='hidden! sm:block!'>
        <ZoomIn size={18} />
      </PreviewImageAction>

      <Separator orientation='vertical' className='my-2.5 mx-1 bg-white/20 hidden! sm:block!' />

      <PreviewImageAction onClick={onRotateLeft}>
        <RotateCcw size={18} />
      </PreviewImageAction>

      <PreviewImageAction onClick={onRotateRight}>
        <RotateCw size={18} />
      </PreviewImageAction>

      <Separator orientation='vertical' className='my-2.5 mx-1 bg-white/20' />

      <PreviewImageAction onClick={onFlipX}>
        <FlipHorizontal size={18} />
      </PreviewImageAction>

      <PreviewImageAction onClick={onFlipY}>
        <FlipVertical size={18} />
      </PreviewImageAction>

      <Separator orientation='vertical' className='my-2.5 mx-1 bg-white/20' />

      <PreviewImageAction onClick={onReset}>
        <RefreshCcw size={18} />
      </PreviewImageAction>
    </section>
  )
}
