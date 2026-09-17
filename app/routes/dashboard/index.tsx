import { Navigate } from 'react-router'
import { ROUTES } from '~/shared/constants/routes.constant'

const DashboardPage = () => {
  return <Navigate to={ROUTES.DASHBOARD.EMPLOYEE_MGT.BASE} replace />
}

export default DashboardPage
