import clsx from 'clsx'
import { LogoSimpleImage } from '~/assets/images'

import styles from './styles.module.css'

const AppLoading = () => {
  return (
    <section className='fixed inset-0 z-9999 flex items-center justify-center bg-background'>
      <section className='relative flex size-30 items-center justify-center'>
        <span className={clsx('absolute size-25 border-[3px] border-primary/30', styles['boxOne'])} />
        <span className={clsx('absolute size-30 border-8 border-primary/30', styles['boxTwo'])} />
        <img src={LogoSimpleImage} alt='logo' className={clsx('size-16', styles['logo'])} />
      </section>
    </section>
  )
}

export default AppLoading
