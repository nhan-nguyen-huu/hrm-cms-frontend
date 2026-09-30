import type { IEmployee } from '~/shared/models/employee.model'

interface IChangeHistoryProfileProps {
  data?: IEmployee
}

const ChangeHistoryProfile = ({}: IChangeHistoryProfileProps) => {
  return <div>change-history</div>
}

export default ChangeHistoryProfile
