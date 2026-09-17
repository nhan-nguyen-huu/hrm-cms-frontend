import { useLayoutEffect, useRef } from 'react'

import { Button } from '~/components/ui/button'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'

interface TimeColumnProps {
  max: number
  value?: number
  open: boolean
  onChange: (value: number) => void
  isDisabled?: (value: number) => boolean
}

export default function TimeColumn({ max, value, open, onChange, isDisabled }: TimeColumnProps) {
  const selectedRef = useRef<HTMLButtonElement>(null)
  useLayoutEffect(() => {
    if (!open || !selectedRef.current) return
    requestAnimationFrame(() => {
      selectedRef.current?.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'auto'
      })
    })
  }, [open])

  return (
    <ScrollArea className='w-64 sm:w-auto'>
      <section className='flex sm:flex-col p-2'>
        {Array.from({ length: max }, (_, i) => (
          <Button
            key={i}
            ref={value === i ? selectedRef : undefined}
            type='button'
            size='icon'
            variant={value === i ? 'default' : 'ghost'}
            disabled={isDisabled?.(i)}
            className='aspect-square shrink-0 sm:w-full disabled:pointer-events-none disabled:opacity-40'
            onClick={() => onChange(i)}
          >
            {String(i).padStart(2, '0')}
          </Button>
        ))}
      </section>

      <ScrollBar orientation='horizontal' className='sm:hidden' />
    </ScrollArea>
  )
}
