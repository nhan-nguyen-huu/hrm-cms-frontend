import { cn } from 'cn'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import CardCustom from '~/components/customs/card-custom'
import type { IProgressItem } from '~/shared/models/common.model'

interface IImportInprogressProps {
  progressItems?: IProgressItem[]
}

const ImportInprogress = ({ progressItems = [] }: IImportInprogressProps) => {
  const { t } = useTranslation()
  return (
    <CardCustom title={t('title.importProgress')}>
      <section className='flex flex-col gap-2'>
        {progressItems?.map((item, index) => (
          <section key={index} className='flex items-center justify-between'>
            <section className='flex items-center gap-2'>
              <section
                className={cn(
                  'size-[4.5] flex items-center justify-center rounded-full p-1',
                  item.isDone ? 'bg-primary' : 'bg-muted'
                )}
              >
                <Check className={cn('size-2.5', item.isDone ? 'text-white' : 'text-[#93A2B6]')} />
              </section>
              <p className={item.isDone ? 'text-app-primay' : 'text-[#93A2B6]'}>{item.label}</p>
            </section>
            <p className='text-[#93A2B6]'>{item.display}</p>
          </section>
        ))}
      </section>
    </CardCustom>
  )
}

export default ImportInprogress
