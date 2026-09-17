import { Navigate } from 'react-router'
import { ROUTES } from '~/shared/constants/routes.constant'

// export const clientLoader = () => authHelper.handleProtectedRoute('ROOT')

const MainLayout = () => {
  return (
    <Navigate
      to={`/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.EMPLOYEE_PROFILE}`}
      replace
    />
  )
}

export default MainLayout
