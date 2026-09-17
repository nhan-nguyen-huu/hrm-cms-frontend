import * as React from 'react'

export function useRippleEffect() {
  React.useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>('.ripple')
      if (!target) return

      if (getComputedStyle(target).position === 'static') {
        target.style.position = 'relative'
      }

      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      const span = document.createElement('span')
      span.className = 'ripple-effect'
      span.style.width = `${size}px`
      span.style.height = `${size}px`
      span.style.left = `${x}px`
      span.style.top = `${y}px`

      span.addEventListener('animationend', () => span.remove())
      target.prepend(span)
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])
}
