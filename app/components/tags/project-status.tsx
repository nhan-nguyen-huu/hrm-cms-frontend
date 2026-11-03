import { useTranslation } from 'react-i18next'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { EProjectStatus } from '~/shared/enums/common.enum'

interface IProjectStatusProps {
  status?: EProjectStatus
  // BE `endingSoon`: a running project ending within sixty days is shown as "Sắp kết thúc"
  isEndingSoon?: boolean
}
const ProjectStatus = ({ status, isEndingSoon }: IProjectStatusProps) => {
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const classNameVariant: Record<EProjectStatus, string> = {
    [EProjectStatus.All]: 'bg-gray-100 text-gray-700',
    [EProjectStatus.Planning]: 'bg-blue-100 text-blue-700',
    [EProjectStatus.Running]: 'bg-green-100 text-green-700',
    [EProjectStatus.Completed]: 'bg-gray-100 text-gray-700',
    [EProjectStatus.Cancelled]: 'bg-red-100 text-red-700'
  }
  if (isEndingSoon && status === EProjectStatus.Running) {
    return <TagBadgeLayout className='bg-amber-100 text-amber-700'>{t('common.projectEndingSoon')}</TagBadgeLayout>
  }
  return (
    <TagBadgeLayout className={status ? classNameVariant[status] : 'bg-gray-100 text-gray-700'}>
      {getTranslateEnum({
        enumPath: 'projectStatus',
        enumType: EProjectStatus,
        value: status
      })}
    </TagBadgeLayout>
  )
}

export default ProjectStatus
