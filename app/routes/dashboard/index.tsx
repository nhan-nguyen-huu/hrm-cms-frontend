import { Navigate } from 'react-router'
import { ROUTES } from '~/shared/constants/routes.constant'

// The HR overview is the landing page of the CMS (design screen CmsTongQuan, first sidebar item)
const DashboardPage = () => {
  return <Navigate to={ROUTES.DASHBOARD.OVERVIEW} replace />
}

export default DashboardPage
