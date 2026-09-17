import clsx from 'clsx'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { commonHelper } from '~/helpers'

interface IEmployeeInfoProps {
  name?: string
  email?: string
  avatarUrl?: string
}

const EmployeeInfo = ({ name, email, avatarUrl }: IEmployeeInfoProps) => {
  return (
    <section className='flex items-center gap-2 text-left'>
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className={clsx('font-semibold', commonHelper.getAvatarColor(name))}>
          {commonHelper.getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <section className='flex flex-col min-w-0'>
        <p className='text-xs font-semibold truncate'>{name || '-'}</p>
        <p className='text-xs text-muted-foreground truncate'>{email || '-'}</p>
      </section>
    </section>
  )
}

export default EmployeeInfo
