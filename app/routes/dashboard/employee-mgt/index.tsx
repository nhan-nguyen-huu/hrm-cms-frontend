import { Navigate } from 'react-router'
import { ROUTES } from '~/shared/constants/routes.constant'

const EmployeeMgtPage = () => {
  return <Navigate to={ROUTES.DASHBOARD.EMPLOYEE_MGT.EMPLOYEE_PROFILE} replace />
}

export default EmployeeMgtPage
