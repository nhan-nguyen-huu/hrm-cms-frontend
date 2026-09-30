import type { IEmployee } from '~/shared/models/employee.model'

interface IContractsAndSalaryProfileProps {
  data?: IEmployee
}

const ContractsAndSalaryProfile = ({}: IContractsAndSalaryProfileProps) => {
  return <div>contracts-and-salary</div>
}

export default ContractsAndSalaryProfile
