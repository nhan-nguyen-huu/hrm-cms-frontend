import type { ReactNode } from 'react'

import { clsx } from 'cn'
import { CornerDownRight, Network } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { commonHelper } from '~/helpers/common.helper'

type TOrgPositionPersonRole = 'manager' | 'employee'

interface IOrgPositionNode {
  label?: string
  icon?: ReactNode
  labelClassName?: string
  personRole?: TOrgPositionPersonRole
}

const PERSON_ROLE_AVATAR_CLASS: Record<TOrgPositionPersonRole, string> = {
  manager: 'bg-green-100 text-green-700',
  employee: 'bg-primary/10 text-primary'
}

interface IOrgPositionProps {
  departmentName?: string
  projectName?: string
  memberCount?: number
  managerName?: string
  employeeName?: string
}

const OrgPosition = ({ departmentName, projectName, memberCount, managerName, employeeName }: IOrgPositionProps) => {
  const { t } = useTranslation()
  const orgPositionNodes: IOrgPositionNode[] = [
    {
      label: t('common.orgPositionDepartment', { departmentName }),
      icon: <Network className='size-5 text-app-primay' />
    },
    {
      label: t('common.orgPositionProject', { projectName, memberCount }),
      labelClassName: 'text-app-primay'
    },
    { label: managerName, labelClassName: 'text-app-primay', personRole: 'manager' },
    { label: employeeName, labelClassName: 'text-primary', personRole: 'employee' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-app-primay uppercase text-xs'>{t('title.orgPosition')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2'>
          {orgPositionNodes.map((node, index) => (
            <li key={index} className='flex items-center gap-2' style={{ marginLeft: index * 20 }}>
              {node.icon ?? <CornerDownRight className='size-4 text-[#6E7F96]' />}
              {node.personRole && (
                <Avatar>
                  <AvatarFallback className={clsx('font-semibold', PERSON_ROLE_AVATAR_CLASS[node.personRole])}>
                    {commonHelper.getInitials(node.label)}
                  </AvatarFallback>
                </Avatar>
              )}
              <p className={clsx('font-semibold', node.labelClassName)}>{node.label}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default OrgPosition
