import { Fragment } from 'react'

import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '~/components/ui/breadcrumb'
import type { IBreadcrumbItem } from '~/shared/models/common.model'

interface IBreadcrumbCustomProps {
  items: IBreadcrumbItem[]
  // The "‹" back button goes to the nearest parent (last item with a route)
  hideBack?: boolean
}

// shadcn Breadcrumb driven by data: items with `to` are links, the item without `to` is the current page
const BreadcrumbCustom = ({ items, hideBack = false }: IBreadcrumbCustomProps) => {
  const { t } = useTranslation()
  const backTo = hideBack ? undefined : [...items].reverse().find((item) => item.to)?.to
  return (
    <Breadcrumb>
      <BreadcrumbList className='text-[13px]'>
        {backTo && (
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link to={backTo} />} aria-label={t('action.back')}>
              <ChevronLeft className='size-4' />
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {items.map((item, index) => (
          <Fragment key={item.key}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {item.to ? (
                <BreadcrumbLink render={<Link to={item.to} />}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage className='font-semibold'>{item.label || '-'}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbCustom
