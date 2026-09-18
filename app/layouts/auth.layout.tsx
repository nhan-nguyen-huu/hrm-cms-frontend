import { Outlet } from 'react-router'
import { authHelper } from '~/helpers'
import i18n from '~/lib/i18n'

export const clientLoader = () => authHelper.handleProtectedRoute('AUTH_ONLY')

export function meta() {
  const t = i18n.t.bind(i18n)
  return [{ title: t('meta.title') }, { name: 'HRM application', content: 'Welcome to HRM' }]
}

// export function HydrateFallback() {
//   return <></>
// }

const AuthLayout = () => {
  return <Outlet />
}

export default AuthLayout
