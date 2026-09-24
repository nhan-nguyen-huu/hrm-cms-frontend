import type { ReactNode } from 'react'

import { useTranslation } from 'react-i18next'
import HeaderPage from '~/components/common/header-page'

interface IOrganizationHeaderPageProps {
  // Summary line under the title — differs per tab (projects, departments)
  description?: string
  // Action buttons of the current tab
  children?: ReactNode
}

// Header shared by all Organization tabs: fixed title, per-tab description and actions
const OrganizationHeaderPage = ({ description, children }: IOrganizationHeaderPageProps) => {
  const { t } = useTranslation()
  return (
    <HeaderPage title={t('sidebarMenu.organizationMgt.base')} description={description}>
      {children && <section className='flex items-center justify-end gap-3 flex-wrap'>{children}</section>}
    </HeaderPage>
  )
}

export default OrganizationHeaderPage
