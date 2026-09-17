import { useMemo, useState } from 'react'

import clsx from 'clsx'
import { Link, matchPath, useLocation } from 'react-router'
import { ArrowRightIcon, HookIcon } from '~/assets/svgs'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '~/components/ui/hover-card'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '~/components/ui/sidebar'
import type { ISidebarMenu } from '~/shared/models/common.model'

export interface ISidebarMenuProps {
  sidebarMenu: ISidebarMenu[]
}

const NavMain = ({ sidebarMenu }: ISidebarMenuProps) => {
  const { isMobile, state, setOpenMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'
  const location = useLocation()
  const baseClassName = 'ripple py-[10px] px-3 rounded-[8px] h-11! transition-all duration-150 hover:bg-gray-100'
  const currentParent = useMemo(() => {
    return sidebarMenu.find((item) =>
      item.items?.some((subItem) =>
        matchPath(
          {
            path: subItem.url,
            end: true
          },
          location.pathname
        )
      )
    )
  }, [location.pathname, sidebarMenu])

  const [openedParents, setOpenedParents] = useState<string[]>(() => (currentParent ? [currentParent.title] : []))

  // Route change (select sub menu) - "adjusting state when a prop changes" pattern,
  // set state during render instead of in an effect to avoid a cascading re-render
  const [lastPathname, setLastPathname] = useState(location.pathname)
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    if (currentParent) {
      setOpenedParents([currentParent.title])
    }
  }

  const handleParentToggle = (title: string) => {
    setOpenedParents((prev) => {
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title)
      }
      return [...prev, title]
    })
  }

  const handleCloseDrawerMobile = () => {
    if (isMobile) {
      setTimeout(() => {
        setOpenMobile(false)
      }, 300)
    }
  }
  return (
    <section className='flex flex-col gap-1'>
      {sidebarMenu.map((item) => {
        const isActive = !!matchPath({ path: item.url, end: false }, location.pathname)
        const baseSideBarMenuButton = (
          <SidebarMenuButton
            isActive={isActive}
            className={clsx(
              'flex items-center gap-3 w-full',
              'group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-full!',
              'data-active:bg-[#163A66]! data-active:text-white',
              baseClassName,
              isActive ? 'hover:bg-primary-lighter! hover:text-white!' : 'hover:bg-gray-100!',
              !isMobile && (isCollapsed ? 'flex-col' : 'flex-row')
            )}
          >
            {item.icon && <item.icon className={clsx('size-6!', isActive ? 'text-white!' : 'text-gray-600!')} />}
            <span className={clsx('font-bold text-xs', !isMobile && isCollapsed && 'hidden')}>{item.title}</span>
            <ArrowRightIcon
              className={clsx(
                'size-5! ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90',
                !isMobile && isCollapsed && 'hidden'
              )}
            />
          </SidebarMenuButton>
        )
        if (Number(item?.items?.length) > 0) {
          if (!isMobile && isCollapsed) {
            return (
              <HoverCard key={item?.title}>
                <HoverCardTrigger
                  render={baseSideBarMenuButton}
                  delay={0}
                  closeDelay={0}
                  className='data-popup-open:bg-gray-100'
                />
                <HoverCardContent side='right' className='p-1 min-w-38 ml-1'>
                  <section className='flex flex-col gap-1'>
                    {item?.items?.map((subItem) => {
                      const isHiddenSubMenu = subItem?.hiddenSubMenu
                      if (isHiddenSubMenu) return
                      const isSubActive = !!matchPath({ path: subItem.url, end: true }, location.pathname)
                      return (
                        <Link
                          key={subItem?.title}
                          to={subItem.url}
                          className={clsx(
                            'ripple rounded-[8px] p-2 hover:bg-gray-100',
                            isSubActive ? 'bg-gray-100 font-bold text-black' : 'bg-white font-semibold text-[#637381]'
                          )}
                          onClick={handleCloseDrawerMobile}
                        >
                          {subItem?.title}
                        </Link>
                      )
                    })}
                  </section>
                </HoverCardContent>
              </HoverCard>
            )
          }
          return (
            <Collapsible
              key={item.title}
              render={<SidebarMenuItem className='group/collapsible' />}
              open={openedParents.includes(item.title)}
              onOpenChange={() => handleParentToggle(item.title)}
            >
              <CollapsibleTrigger render={baseSideBarMenuButton} className='data-panel-open:bg-gray-100' />
              <CollapsibleContent>
                <SidebarMenuSub className='ml-6 pl-2.5 pt-1 pb-0 mr-0 pr-0 border-l-2 border-l-gray-100 border-none!'>
                  {item.items?.map((subItem, index) => {
                    const isHiddenSubMenu = subItem?.hiddenSubMenu
                    if (isHiddenSubMenu) return
                    const isSubActive = !!matchPath({ path: subItem.url, end: true }, location.pathname)
                    const isLast = index === item.items!.length - 1
                    return (
                      <SidebarMenuSubItem key={subItem.title} className='relative'>
                        {/* Line dọc */}
                        {!isLast && <div className='absolute -left-3 top-[30%] h-full w-0.5 bg-gray-200' />}

                        {/* Hook */}
                        <HookIcon className={clsx('absolute -left-3 top-[30%] -translate-y-1/2 text-gray-200')} />

                        <SidebarMenuSubButton
                          render={<Link to={subItem.url} onClick={handleCloseDrawerMobile} />}
                          isActive={isSubActive}
                          className={clsx(
                            'data-active:bg-[#163A66] data-active:text-white text-white ml-1',
                            baseClassName,
                            'h-9!'
                          )}
                        >
                          <span className='text-xs font-semibold'>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        }
        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              render={<Link to={item.url} />}
              isActive={isActive}
              className={clsx(
                'flex items-center gap-3 w-full',
                'group-data-[collapsible=icon]:w-full! group-data-[collapsible=icon]:h-full!',
                'data-active:bg-primary-lighter data-active:text-primary',
                baseClassName,
                !isMobile && (isCollapsed ? 'flex-col' : 'flex-row')
              )}
              onClick={() => {
                handleCloseDrawerMobile()
                setOpenedParents([])
              }}
            >
              {item.icon && <item.icon className={clsx('size-6!', isActive ? 'text-primary' : 'text-gray-600')} />}
              <span className={clsx('font-bold text-xs', !isMobile && isCollapsed && 'hidden')}>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </section>
  )
}
export default NavMain
