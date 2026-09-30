import { useEffect } from 'react'

import clsx from 'clsx'
import { Badge } from '~/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import useQueryParams from '~/hooks/use-query-params'

export interface ITabOption<T extends string> {
  label?: string
  count?: number
  value: T
  disabled?: boolean
}

interface ITabsCustomProps<T extends string> {
  value?: T
  onChange?: (tab: T) => void
  options: ITabOption<T>[]
  classNameTabList?: string
  isNoSyncParams?: boolean
}

const TabsCustom = <T extends string>({
  value,
  onChange,
  options,
  classNameTabList,
  isNoSyncParams
}: ITabsCustomProps<T>) => {
  const { updateQuery } = useQueryParams()

  const handleChangeTab = (value: T) => {
    if (!isNoSyncParams) {
      updateQuery('tab', value)
    }
    onChange?.(value)
  }

  useEffect(() => {
    if (!isNoSyncParams) {
      updateQuery('tab', value)
    }
  }, [])

  return (
    <Tabs defaultValue={value} value={value} onValueChange={handleChangeTab}>
      <TabsList
        className={clsx('h-9.5! gap-4 w-full justify-start border-b border-[#E4E9F0]', classNameTabList)}
        variant='line'
      >
        {options.map((t) => (
          <TabsTrigger
            key={t.value}
            value={t.value}
            className={'p-0 after:bg-primary data-active:font-semibold data-active:text-primary flex-none'}
            disabled={t?.disabled}
          >
            <section className='flex items-center gap-3'>
              <p className='text-[13px]'>{t.label}</p>
              {t?.count && (
                <Badge
                  className={clsx(
                    'h-5 min-w-5 rounded-full px-1 flex items-center justify-center text-[10.5px]',
                    value === t.value ? 'bg-primary text-white' : 'bg-[#F0F3F8] text-[#93A2B6]'
                  )}
                >
                  {t?.count ?? 0}
                </Badge>
              )}
            </section>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default TabsCustom
