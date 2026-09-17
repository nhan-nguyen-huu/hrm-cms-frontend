import clsx from 'clsx'
import SelectLanguage from '~/components/common/select-language'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { SidebarTrigger, useSidebar } from '~/components/ui/sidebar'

const Header = () => {
  const { state, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'
  return (
    <section
      className={clsx(
        'p-4 flex items-center justify-between shadow gap-4 fixed top-0 right-0 z-20 bg-white',
        'bg-[#fafafa]/20! backdrop-blur-sm',
        !isMobile && (isCollapsed ? 'left-21.75' : ' left-75'),
        isMobile && 'left-0'
      )}
    >
      <section className='flex items-center gap-4'>
        <SidebarTrigger className='cursor-pointer' />
      </section>
      <section className='flex items-center gap-3 sm:gap-4'>
        {/* <Notification /> */}
        <section
          className='flex items-center gap-2 cursor-pointer'
          // onClick={() =>
          //   navi(`/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.SYSTEM_MGT.BASE}/${ROUTES.DASHBOARD.SYSTEM_MGT.MY_PAGE}`)
          // }
        >
          <p className='font-bold text-sm text-primary'>Admin</p>
          <Avatar>
            <AvatarImage />
            <AvatarFallback className='text-primary font-semibold'>CO</AvatarFallback>
          </Avatar>
        </section>
        <SelectLanguage />

        {/* <Logout /> */}
      </section>
    </section>
  )
}

export default Header
