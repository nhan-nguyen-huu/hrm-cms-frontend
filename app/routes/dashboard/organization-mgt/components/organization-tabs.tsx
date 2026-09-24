import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import { ROUTES } from '~/shared/constants/routes.constant'

const BASE_PATH = `/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.ORGANIZATION_MGT.BASE}`

const OrganizationTabs = () => {
  const { t } = useTranslation()
  const baseClassName = 'flex items-center h-9 -mb-px border-b-2 text-[13px] transition-colors'
  return (
    <nav className='flex items-center gap-6 border-b border-[#E4E9F0]'>
      {/* TODO: enable once the Department screen is implemented */}
      <span
        aria-disabled
        className={clsx(baseClassName, 'border-transparent text-[#6E7F96] cursor-not-allowed opacity-60')}
      >
        {t('sidebarMenu.organizationMgt.department')}
      </span>
      <NavLink
        to={`${BASE_PATH}/${ROUTES.DASHBOARD.ORGANIZATION_MGT.PROJECT}`}
        className={({ isActive }) =>
          clsx(
            baseClassName,
            isActive ? 'border-primary font-semibold text-primary' : 'border-transparent text-[#6E7F96]'
          )
        }
      >
        {t('sidebarMenu.organizationMgt.project')}
      </NavLink>
    </nav>
  )
}

export default OrganizationTabs
