import type { IMissingField } from '~/shared/models/employee.model'

interface INeedAdditionalProps {
  missingFields?: IMissingField[]
}

const NeedAdditional = ({ missingFields = [] }: INeedAdditionalProps) => {
  if (missingFields?.length < 1) return null
  return (
    <section className='flex flex-col gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-2'>
      <ul className='flex flex-col gap-1'>
        {missingFields.map((item, index) => (
          <li key={`${item.step}-${item.field}-${index}`} className='flex items-start gap-1 text-xs'>
            <span>•</span>
            <span>{item.message}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default NeedAdditional
