import type { IEmployee } from '~/shared/models/employee.model'

interface ITimeAndAttendanceProfileProps {
  data?: IEmployee
}

const TimeAndAttendanceProfile = ({}: ITimeAndAttendanceProfileProps) => {
  return <div>time-and-attendance</div>
}

export default TimeAndAttendanceProfile
