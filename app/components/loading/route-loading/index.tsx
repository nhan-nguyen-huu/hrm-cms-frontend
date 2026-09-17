import { useEffect } from 'react'

import clsx from 'clsx'
import { useLocation, useNavigation } from 'react-router'
import { useSidebar } from '~/components/ui/sidebar'

import styles from './styles.module.css'

const visitedPaths = new Set<string>()

const RouteLoading = () => {
  const navigation = useNavigation()
  const location = useLocation()
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'

  useEffect(() => {
    visitedPaths.add(location.pathname)
  }, [location.pathname])

  const targetPathname = navigation.location?.pathname
  const isNewRoute = !!targetPathname && !visitedPaths.has(targetPathname)
  const isLoading = navigation.state !== 'idle' && isNewRoute
  if (!isLoading) return null
  return (
    <section
      className={clsx(
        'pointer-events-none fixed bottom-0 top-height-mobile right-0 z-40 flex items-center justify-center',
        'bg-background/70 backdrop-blur-sm sm:top-height-header',
        styles['overlay'],
        !isMobile && (isCollapsed ? 'left-21.75' : 'left-75'),
        isMobile && 'left-0'
      )}
    >
      <section className='relative h-1.5 w-75 overflow-hidden rounded-full bg-primary/15'>
        <span className={clsx(`absolute top-0 h-full rounded-full bg-primary`, styles['bar'])} />
      </section>
    </section>
  )
}

export default RouteLoading
