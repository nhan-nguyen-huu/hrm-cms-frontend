import type { IEmployee } from '~/shared/models/employee.model'

interface IPersonalInfoProfileProps {
  data?: IEmployee
}
const PersonalInfoProfile = ({}: IPersonalInfoProfileProps) => {
  return <div>personal-info</div>
}

export default PersonalInfoProfile
