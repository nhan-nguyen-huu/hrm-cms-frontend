import { Loader2Icon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { DangerIcon, ErrorIcon, InfoCircleIcon, TickSquareIcon } from '~/assets/svgs'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group font-sans!'
      icons={{
        success: <TickSquareIcon className='size-6' />,
        info: <InfoCircleIcon className='size-6' />,
        warning: <DangerIcon className='size-6' />,
        error: <ErrorIcon className='size-6' />,
        loading: <Loader2Icon className='size-6 animate-spin' />
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)'
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
