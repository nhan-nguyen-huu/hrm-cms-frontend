import { useTranslation } from 'react-i18next'
import Tabs from '~/components/common/tabs'
import { DATA } from '~/shared/constants/data.constant'

const OrganizationTabs = () => {
  const { t } = useTranslation()
  return <Tabs items={DATA.GET_ORGANIZATION_TABS(t)} />
}

export default OrganizationTabs
