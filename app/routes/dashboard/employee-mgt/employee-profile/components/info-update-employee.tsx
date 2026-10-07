import { DATE_TIME_FORMAT_SLASH, dateHelper } from '~/helpers'

interface IInfoUpdateEmployeeProps {
  updatedAt?: string
  updatedByName?: string
}
const InfoUpdateEmployee = ({ updatedAt, updatedByName }: IInfoUpdateEmployeeProps) => {
  return (
    <section className='flex flex-col justify-start text-xs gap-1'>
      <p>{dateHelper.formatDate(updatedAt, DATE_TIME_FORMAT_SLASH)}</p>
      <p>{updatedByName}</p>
    </section>
  )
}

export default InfoUpdateEmployee
