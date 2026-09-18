import { useEffect } from 'react'

import clsx from 'clsx'
import useGlobalLoaderStore from '~/stores/global-loader'

import styles from './styles.module.css'

const GlobalLoader = () => {
  const { isLoading } = useGlobalLoaderStore()

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isLoading)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <section className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-gray-800/20 backdrop-blur-sm z-999'>
      <span
        className={clsx(
          'block relative w-2 h-10 bg-primary rounded mx-auto my-5',
          styles['loader'],
          styles['animate-bar-pulse']
        )}
      />
    </section>
  )
}

export default GlobalLoader
