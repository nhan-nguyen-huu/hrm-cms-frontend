import AssignedProject from '~/routes/dashboard/employee-mgt/employee-profile/components/assigned-project-overview'
import AttendanceLeaveOverview from '~/routes/dashboard/employee-mgt/employee-profile/components/attendance-leave-overview'
import EmploymentContractOverview from '~/routes/dashboard/employee-mgt/employee-profile/components/employment-contract-overview'
import JobInfoOverview from '~/routes/dashboard/employee-mgt/employee-profile/components/job-info-overview'
import PersonalInfoOverview from '~/routes/dashboard/employee-mgt/employee-profile/components/personal-info-overview'
import SalaryInsurance from '~/routes/dashboard/employee-mgt/employee-profile/components/salary-insurance'
import type { IEmployee } from '~/shared/models/employee.model'

interface IOverViewProfileProps {
  data?: IEmployee
}
const OverViewProfile = ({ data }: IOverViewProfileProps) => {
  return (
    <section className='grid grid-cols-12 gap-4'>
      <section className='col-span-8 flex flex-col gap-4'>
        <PersonalInfoOverview data={data} />
        <JobInfoOverview data={data} />
        <EmploymentContractOverview data={data} />
      </section>
      <section className='col-span-4 flex flex-col gap-4'>
        <SalaryInsurance />
        <AttendanceLeaveOverview data={data} />
        <AssignedProject data={data} />
      </section>
    </section>
  )
}

export default OverViewProfile
