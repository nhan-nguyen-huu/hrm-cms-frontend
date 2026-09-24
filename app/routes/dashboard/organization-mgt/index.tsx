import { Navigate } from 'react-router'
import { ROUTES } from '~/shared/constants/routes.constant'

// TODO: redirect to the Department tab once that screen is implemented
const OrganizationMgtPage = () => {
  return <Navigate to={ROUTES.DASHBOARD.ORGANIZATION_MGT.PROJECT} replace />
}

export default OrganizationMgtPage
