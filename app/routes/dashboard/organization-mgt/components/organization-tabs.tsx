import { useTranslation } from 'react-i18next'
import Tabs, { type ITabItem } from '~/components/common/tabs'
import { ROUTES } from '~/shared/constants/routes.constant'

const BASE_PATH = `/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.ORGANIZATION_MGT.BASE}`

const OrganizationTabs = () => {
  const { t } = useTranslation()
  const { DEPARTMENT, PROJECT } = ROUTES.DASHBOARD.ORGANIZATION_MGT
  const items: ITabItem[] = [
    {
      key: DEPARTMENT,
      label: t('sidebarMenu.organizationMgt.department'),
      to: `${BASE_PATH}/${DEPARTMENT}`,
      // TODO: enable once the Department screen is implemented
      disabled: true
    },
    {
      key: PROJECT,
      label: t('sidebarMenu.organizationMgt.project'),
      to: `${BASE_PATH}/${PROJECT}`
    }
  ]
  return <Tabs items={items} />
}

export default OrganizationTabs
