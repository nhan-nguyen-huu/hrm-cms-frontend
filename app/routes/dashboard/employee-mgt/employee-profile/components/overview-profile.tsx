import type { IEmployee } from '~/shared/models/employee.model'

interface IOverViewProfileProps {
  data?: IEmployee
}
const OverViewProfile = ({}: IOverViewProfileProps) => {
  return <div>overview-profile</div>
}

export default OverViewProfile
