import type { TFunction } from 'i18next'
import { EmployeeIcon, OrganizationIcon } from '~/assets/svgs'
import { ROUTES } from '~/shared/constants/routes.constant'

export const layoutHelper = {
  getSidebarMenu: (t: TFunction) => {
    const BASE_PATH = `/${ROUTES.DASHBOARD.BASE}`
    const url = (section: string, sub?: string) => (sub ? `${BASE_PATH}/${section}/${sub}` : `${BASE_PATH}/${section}`)
    const { EMPLOYEE_MGT, ORGANIZATION_MGT } = ROUTES.DASHBOARD
    return [
      {
        icon: EmployeeIcon,
        title: t('sidebarMenu.employeeMgt.employeeProfile'),
        url: url(EMPLOYEE_MGT.BASE, EMPLOYEE_MGT.EMPLOYEE_PROFILE)
      },
      {
        icon: OrganizationIcon,
        title: t('sidebarMenu.organizationMgt.base'),
        url: url(ORGANIZATION_MGT.BASE)
      }
    ]
  }
}
