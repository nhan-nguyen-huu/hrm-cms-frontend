import { useState } from 'react'

const MIN_SCALE = 1
const MAX_SCALE = 5
const SCALE_STEP = 0.2

const DEFAULT_PREVIEW = {
  scale: 1,
  rotation: 0,
  flipX: false,
  flipY: false,
  x: 0,
  y: 0
}

const usePreviewImage = () => {
  const [preview, setPreview] = useState(DEFAULT_PREVIEW)

  const reset = () => {
    setPreview(DEFAULT_PREVIEW)
  }

  const zoom = (delta: number) => {
    setPreview((prev) => {
      const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev.scale + delta))
      return {
        ...prev,
        scale: nextScale,
        ...(nextScale === 1 && {
          x: 0,
          y: 0
        })
      }
    })
  }

  const rotate = (deg: number) => {
    setPreview((prev) => ({
      ...prev,
      rotation: prev.rotation + deg
    }))
  }

  const toggleFlipX = () => {
    setPreview((prev) => ({
      ...prev,
      flipX: !prev.flipX
    }))
  }

  const toggleFlipY = () => {
    setPreview((prev) => ({
      ...prev,
      flipY: !prev.flipY
    }))
  }

  const move = (x: number, y: number) => {
    setPreview((prev) => ({
      ...prev,
      x,
      y
    }))
  }

  return {
    preview,
    reset,
    zoom,
    rotate,
    toggleFlipX,
    toggleFlipY,
    move,
    canZoomIn: preview.scale < MAX_SCALE,
    canZoomOut: preview.scale > MIN_SCALE,
    scaleStep: SCALE_STEP
  }
}

export default usePreviewImage
