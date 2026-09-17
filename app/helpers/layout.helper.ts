import type { TFunction } from 'i18next'
import { EmployeeIcon } from '~/assets/svgs'
import { ROUTES } from '~/shared/constants/routes.constant'

export const layoutHelper = {
  getSidebarMenu: (t: TFunction) => {
    const BASE_PATH = `/${ROUTES.DASHBOARD.BASE}`
    const url = (section: string, sub?: string) => (sub ? `${BASE_PATH}/${section}/${sub}` : `${BASE_PATH}/${section}`)
    const { EMPLOYEE_MGT } = ROUTES.DASHBOARD
    return [
      {
        icon: EmployeeIcon,
        title: t('sidebarMenu.employeeMgt.base'),
        url: url(EMPLOYEE_MGT.BASE),
        items: [
          {
            title: t('sidebarMenu.employeeMgt.employeeProfile'),
            url: url(EMPLOYEE_MGT.BASE, EMPLOYEE_MGT.EMPLOYEE_PROFILE)
          }
        ]
      }
    ]
  }
}
