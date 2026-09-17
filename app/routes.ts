import { type RouteConfig, index, route } from '@react-router/dev/routes'

import { ROUTES } from './shared/constants/routes.constant'

export default [
  route(ROUTES.HOME, 'layouts/main.layout.tsx', [index('routes/main/index.tsx')]),
  route(ROUTES.DASHBOARD.BASE, 'layouts/dashboard.layout.tsx', [
    index('routes/dashboard/index.tsx'),
    route(ROUTES.DASHBOARD.EMPLOYEE_MGT.BASE, 'layouts/employee-mgt.layout.tsx', [
      index('routes/dashboard/employee-mgt/index.tsx'),
      route(ROUTES.DASHBOARD.EMPLOYEE_MGT.EMPLOYEE_PROFILE, 'routes/dashboard/employee-mgt/employee-profile/index.tsx')
    ])
  ])
] satisfies RouteConfig
