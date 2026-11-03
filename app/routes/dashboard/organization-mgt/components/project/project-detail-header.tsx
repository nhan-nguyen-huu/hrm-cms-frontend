import { Ellipsis, LayoutGrid, Pencil } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import ButtonAction from '~/components/actions/button-action'
import BreadcrumbCustom from '~/components/customs/breadcrumb-custom'
import CardInfo from '~/components/customs/card-info'
import ProjectStatus from '~/components/tags/project-status'
import { Button } from '~/components/ui/button'
import { dateHelper } from '~/helpers/date.helper'
import { BREADCRUMB_SEGMENT } from '~/shared/constants/data.constant'
import type { IProjectDetail } from '~/shared/models/project.model'

interface IProjectDetailHeaderProps {
  project?: IProjectDetail
}

// Breadcrumb + project title card of the project detail screen
const ProjectDetailHeader = ({ project }: IProjectDetailHeaderProps) => {
  const { t } = useTranslation()
  // Hierarchy is Department → Project → Employee, so the department leads the meta line
  const metaItems = [
    project?.departmentName && t('common.orgPositionDepartment', { departmentName: project.departmentName }),
    project?.projectCode,
    project?.managerFullName && t('common.pmName', { name: project.managerFullName }),
    dateHelper.formatMonthRange(project?.startDate, project?.endDate)
  ]

  return (
    <section className='flex flex-col gap-3'>
      <BreadcrumbCustom items={BREADCRUMB_SEGMENT.PROJECT_DETAIL(t, project?.projectName)} />

      <CardInfo
        icon={<LayoutGrid className='size-5' />}
        title={project?.projectName}
        badge={project && <ProjectStatus status={project.status} isEndingSoon={project.endingSoon} />}
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
