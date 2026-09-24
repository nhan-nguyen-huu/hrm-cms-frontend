import { useTransferEnum } from '~/hooks/user-transfer-enum'
import TagBadgeLayout from '~/layouts/tag-badge-layout'
import { EProjectStatus } from '~/shared/enums/common.enum'

interface IProjectStatusProps {
  status: EProjectStatus
}
const ProjectStatus = ({ status }: IProjectStatusProps) => {
  const { getTranslateEnum } = useTransferEnum()
  const classNameVariant: Record<EProjectStatus, string> = {
    [EProjectStatus.InProgress]: 'bg-green-100 text-green-700',
    [EProjectStatus.Kickoff]: 'bg-blue-100 text-blue-700',
    [EProjectStatus.EndingSoon]: 'bg-amber-100 text-amber-700',
    [EProjectStatus.Completed]: 'bg-gray-100 text-gray-700'
  }
  return (
    <TagBadgeLayout className={classNameVariant[status]}>
      {getTranslateEnum({
        enumPath: 'projectStatus',
        enumType: EProjectStatus,
        value: status
      })}
    </TagBadgeLayout>
  )
}

export default ProjectStatus
