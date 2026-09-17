import { Outlet } from 'react-router'
import Header from '~/components/common/header'
import RouteLoading from '~/components/loading/route-loading'
import { AppSidebar } from '~/components/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar'
import i18n from '~/lib/i18n'

// export const clientLoader = () => authHelper.handleProtectedRoute('PRIVATE')

export function meta() {
  const t = i18n.t.bind(i18n)
  return [{ title: t('meta.title') }, { name: 'HRM application', content: 'Welcome to HRM' }]
}

const DashboardLayout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className='overflow-hidden'>
          <RouteLoading />
          <Header />
          <section className='mt-height-mobile sm:mt-height-header'>
            {/* <Title title={t(titlePageKey)} backToListPage={isBackToListPage} /> */}
            <section className='max-w-mw mx-auto w-full p-4'>
              <Outlet />
            </section>
          </section>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default DashboardLayout
