import { type PropsWithChildren } from 'react'

const FormLayout = ({ children }: PropsWithChildren) => {
  return <section className='flex flex-col gap-4'>{children}</section>
}

export default FormLayout
