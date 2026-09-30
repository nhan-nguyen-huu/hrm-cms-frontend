import type React from 'react'

import { clsx } from 'clsx'
import { Skeleton } from '~/components/ui/skeleton'

interface ISkelethonLoadingProps {
  loading?: boolean
  className?: string
  children?: React.ReactNode
}
const SkelethonLoading = ({ loading, children, className }: ISkelethonLoadingProps) => {
  return loading ? (
    <section className={clsx('flex flex-col gap-4', className)}>
      <Skeleton className='h-4! w-[50%] bg-gray-200!' />
      <Skeleton className='h-4! w-[80%] bg-gray-200!' />
      <Skeleton className='h-4! w-[70%] bg-gray-200!' />
      <Skeleton className='h-4! w-full bg-gray-200!' />
      <Skeleton className='h-4! w-full bg-gray-200!' />
    </section>
  ) : (
    children
  )
}

export default SkelethonLoading
