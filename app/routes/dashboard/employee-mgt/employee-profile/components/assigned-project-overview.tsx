import CardCustom from '~/components/customs/card-custom'
import type { IEmployee } from '~/shared/models/employee.model'

interface IAssignedProjectProps {
  data?: IEmployee
}
const AssignedProject = ({ data }: IAssignedProjectProps) => {
  return (
    <>
      <CardCustom title={'Dự án đang tham gia'} action={<p className='text-[#93A2B6] text-xs'>Tổng 100%</p>}>
        <section className='flex flex-col gap-2'>
          {data?.assignments?.map((d, i) => {
            return (
              <section key={i} className='flex items-center justify-between gap-4'>
                <section className='flex flex-col'>
                  <p>{'SP Core Platform'}</p>
                  <p className='text-[#93A2B6] text-xs'>Backend · từ 04/2025</p>
                </section>
                <p className='text-sm font-semibold'>60%</p>
              </section>
            )
          })}
        </section>
      </CardCustom>
    </>
  )
}

export default AssignedProject
