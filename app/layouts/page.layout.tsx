import React from 'react'

import { clsx } from 'cn'

interface IPageLayoutProps {
  className?: string
  children?: React.ReactNode
}
const PageLayout = ({ className, children }: IPageLayoutProps) => {
  return <section className={clsx('flex flex-col gap-4', className)}>{children}</section>
}

export default PageLayout
