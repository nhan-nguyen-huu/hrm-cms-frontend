import * as React from 'react'

import { useTranslation } from 'react-i18next'
import NavMain from '~/components/sidebar/nav-main'
import Trademark from '~/components/sidebar/trademark'
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarRail } from '~/components/ui/sidebar'
import { layoutHelper } from '~/helpers'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='p-4 bg-secondary border-b border-b-input'>
        <Trademark />
      </SidebarHeader>
      <SidebarContent className='scrollbar-hide bg-secondary'>
        <SidebarGroup className='p-4'>
          <SidebarMenu>
            <NavMain sidebarMenu={layoutHelper.getSidebarMenu(t)} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
