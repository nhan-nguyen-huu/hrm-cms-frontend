import { type PropsWithChildren } from 'react'

interface IHeaderPageProps extends PropsWithChildren {
  title?: string
  description?: string
}
const HeaderPage = ({ title, description, children }: IHeaderPageProps) => {
  return (
    <section className='flex items-center justify-between gap-4 flex-wrap'>
      <section className='flex flex-col'>
        <p className='text-[21px] font-bold text-app-secondary'>{title}</p>
        <p className='text-[13px]'>{description}</p>
      </section>
      {children}
    </section>
  )
}

export default HeaderPage
