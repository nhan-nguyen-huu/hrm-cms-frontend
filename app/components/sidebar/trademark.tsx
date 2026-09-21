import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { LogoSimpleImage } from '~/assets/images'
import ImageCustom from '~/components/customs/image-custom'
import { useSidebar } from '~/components/ui/sidebar'
import { ROUTES } from '~/shared/constants/routes.constant'

const Trademark = () => {
  const { state, setOpenMobile, isMobile } = useSidebar()
  const isCollapsed = state === 'collapsed'
  const { t } = useTranslation()
  return (
    <section className='flex flex-col'>
      <Link
        to={`/${ROUTES.DASHBOARD.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.BASE}/${ROUTES.DASHBOARD.EMPLOYEE_MGT.EMPLOYEE_PROFILE}`}
        className={clsx(!isCollapsed ? 'justify-start' : 'justify-center')}
        onClick={() => {
          if (isMobile) {
            setOpenMobile(false)
          }
        }}
      >
        <section className={clsx('flex items-center gap-3', isCollapsed && 'justify-center')}>
          <ImageCustom src={LogoSimpleImage} className='size-9' />
          {!isCollapsed && (
            <section className='flex flex-col'>
              <p className='font-semibold text-white text-sm uppercase'>{t('common.companyName')}</p>
              <p className='text-[10.5px] text-[#9DB3CE]'>{t('common.humanResourcesSystem')}</p>
            </section>
          )}
        </section>
      </Link>
    </section>
  )
}

export default Trademark
