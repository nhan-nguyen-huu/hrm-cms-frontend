import type { ReactNode } from 'react'

import { useTranslation } from 'react-i18next'
import ProjectStatus from '~/components/tags/project-status'
import { Card } from '~/components/ui/card'
import { DATE_FORMAT_SLASH, dateHelper } from '~/helpers/date.helper'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import { EDepartment } from '~/shared/enums/common.enum'
import type { IProjectDetail } from '~/shared/models/project.model'

interface IProjectInfoCardProps {
  project?: IProjectDetail
}

const InfoRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className='flex items-center justify-between gap-3 text-[13px]'>
    <span className='text-[#6E7F96]'>{label}</span>
    <span className='text-right font-semibold'>{children || '-'}</span>
  </section>
)

// "Project information" side card of the project detail screen
const ProjectInfoCard = ({ project }: IProjectInfoCardProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  return (
    <Card className='gap-3 px-4'>
      <section className='flex items-center justify-between'>
        <p className='text-[11.5px] font-semibold uppercase tracking-wide text-[#6E7F96]'>{t('title.projectInfo')}</p>
        {/* TODO: open the edit form once it exists */}
        <button type='button' className='text-[12px] font-semibold text-primary hover:underline'>
          {t('action.edit')}
        </button>
      </section>
      <InfoRow label={t('inputLabel.projectCode')}>{project?.code}</InfoRow>
      <InfoRow label={t('inputLabel.ownerDepartment')}>
        {project?.department &&
          getTranslateEnum({ enumPath: 'department', enumType: EDepartment, value: project.department })}
      </InfoRow>
      <InfoRow label={t('inputLabel.projectManager')}>{project?.projectManager?.name}</InfoRow>
      <InfoRow label={t('inputLabel.startDate')}>
        {dateHelper.formatDate(project?.startDate, DATE_FORMAT_SLASH)}
      </InfoRow>
      <InfoRow label={t('inputLabel.plannedEndDate')}>
        {dateHelper.formatDate(project?.endDate, DATE_FORMAT_SLASH)}
      </InfoRow>
      <InfoRow label={t('inputLabel.status')}>{project?.status && <ProjectStatus status={project.status} />}</InfoRow>
      <section className='flex flex-col gap-1 rounded-lg bg-[#F7F9FC] p-3'>
        <p className='text-[11.5px] text-[#6E7F96]'>{t('inputLabel.goal')}</p>
        <p className='text-[13px]'>{project?.goal || '-'}</p>
      </section>
    </Card>
  )
}

export default ProjectInfoCard
