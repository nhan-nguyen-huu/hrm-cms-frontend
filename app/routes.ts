import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

import { BASE_ROUTES, ROUTES } from './shared/constants/routes.constant'

export default [
  // Main
  route(ROUTES.HOME, 'layouts/main.layout.tsx', [index('routes/main/index.tsx')]),

  // Auth
  layout('layouts/auth.layout.tsx', [
    // Login
    route(ROUTES.AUTH.LOGIN, 'routes/auth/login/index.tsx')
  ]),
  // Dashboard
  route(ROUTES.DASHBOARD.BASE, 'layouts/dashboard.layout.tsx', [
    index('routes/dashboard/index.tsx'),
    route(ROUTES.DASHBOARD.EMPLOYEE_MGT.BASE, 'layouts/employee-mgt.layout.tsx', [
      index('routes/dashboard/employee-mgt/index.tsx'),
      route(ROUTES.DASHBOARD.EMPLOYEE_MGT.EMPLOYEE_PROFILE, 'layouts/employee-profile.layout.tsx', [
        index('routes/dashboard/employee-mgt/employee-profile/index.tsx'),
        route(BASE_ROUTES.CREATE, 'routes/dashboard/employee-mgt/employee-profile/create-employee-profile/index.tsx')
      ])
    ]),
    route(ROUTES.DASHBOARD.ORGANIZATION_MGT.BASE, 'layouts/organization-mgt.layout.tsx', [
      index('routes/dashboard/organization-mgt/index.tsx'),
      route(ROUTES.DASHBOARD.ORGANIZATION_MGT.PROJECT, 'layouts/project.layout.tsx', [
        index('routes/dashboard/organization-mgt/project/index.tsx'),
        route(BASE_ROUTES.DETAIL, 'routes/dashboard/organization-mgt/project/project-detail/index.tsx')
      ])
    ])
  ])
] satisfies RouteConfig
