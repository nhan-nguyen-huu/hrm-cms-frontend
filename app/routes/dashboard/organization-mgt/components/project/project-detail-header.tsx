import { Ellipsis, LayoutGrid, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import BreadcrumbCustom from '~/components/customs/breadcrumb-custom'
import CardInfo from '~/components/customs/card-info'
import ProjectStatus from '~/components/tags/project-status'
import { Button } from '~/components/ui/button'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { BREADCRUMB_SEGMENT } from '~/shared/constants/data.constant'
import { EDepartment } from '~/shared/enums/common.enum'
import type { IProjectDetail } from '~/shared/models/project.model'

interface IProjectDetailHeaderProps {
  project?: IProjectDetail
}

// Breadcrumb + project title card of the project detail screen
const ProjectDetailHeader = ({ project }: IProjectDetailHeaderProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const period = [project?.startMonth, project?.endMonth].filter(Boolean).join(' – ')
  // Hierarchy is Department → Project → Employee, so the department leads the meta line
  const departmentName =
    project?.department &&
    getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: project.department })
  const metaItems = [
    departmentName && t('common.orgPositionDepartment', { departmentName }),
    project?.code,
    project?.projectManager?.name && t('common.pmName', { name: project.projectManager.name }),
    period
  ]

  return (
    <section className='flex flex-col gap-3'>
      <BreadcrumbCustom items={BREADCRUMB_SEGMENT.PROJECT_DETAIL(t, project?.name)} />

      <CardInfo
        icon={<LayoutGrid className='size-5' />}
        title={project?.name}
        badge={<ProjectStatus status={project?.status} />}
        subtitleItems={metaItems}
      >
        <ButtonAction actionName={t('action.exportList')} actionType='DOWNLOAD' />
        <Button>
          <Pencil className='size-4' />
          <span>{t('action.editProject')}</span>
        </Button>
        <Button variant='outline' size='icon' aria-label={t('tables.baseTableKey.action')}>
          <Ellipsis className='size-4' />
        </Button>
      </CardInfo>
    </section>
  )
}

export default ProjectDetailHeader
